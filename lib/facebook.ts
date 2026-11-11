declare global {
  interface Window {
    FB?: any;
    fbAsyncInit?: () => void;
  }
}

export interface WhatsAppLoginResult {
  authResponse: {
    code?: string;
    error?: string;
    error_message?: string;
    error_subcode?: string;
    error_type?: string;
  };
  // <-- AGORA O RESULTADO TRAZ O WABA JUNTO
  waba_id?: string | null;
  phone_number_id?: string | null;
}

export function loadFacebookSDK(appId: string): Promise<typeof window.FB> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Window not available"));
      return;
    }

    if (window.FB) {
      console.log("[FB] SDK already loaded");
      resolve(window.FB);
      return;
    }

    // Evita carregar o script 2x se já estiver no DOM
    const existing = document.querySelector(
      'script[src="https://connect.facebook.net/en_US/sdk.js"]',
    );
    if (existing) {
      console.log("[FB] SDK script already in DOM, waiting for init");
      window.fbAsyncInit = () => {
        window.FB!.init({
          appId,
          cookie: true,
          xfbml: false,
          version: "v21.0", // <-- IGUAL AO BACKEND
          autoLogEvents: true,
        });
        resolve(window.FB);
      };
      return;
    }

    console.log("[FB] Loading SDK for appId:", appId);

    window.fbAsyncInit = () => {
      console.log("[FB] fbAsyncInit called");
      window.FB!.init({
        appId,
        cookie: true,
        xfbml: false,
        version: "v21.0", // <-- IGUAL AO BACKEND
        autoLogEvents: true,
      });
      console.log("[FB] SDK initialized successfully");
      resolve(window.FB);
    };

    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.onerror = () => {
      console.error("[FB] Failed to load SDK script");
      reject(
        new Error(
          "Failed to load 【entity-Facebook¦canonical_name=Facebook】 SDK",
        ),
      );
    };
    document.head.appendChild(script);
  });
}

export function loginWithWhatsApp(
  configId: string,
): Promise<WhatsAppLoginResult> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || typeof window.FB === "undefined") {
      reject(
        new Error(
          "【entity-Facebook¦canonical_name=Facebook】 SDK is not loaded",
        ),
      );
      return;
    }

    let capturedWabaId: string | null = null;
    let capturedPhoneId: string | null = null;
    let capturedBusinessId: string | null = null;
    let loginResponse: WhatsAppLoginResult | null = null;
    let settled = false;

    const cleanup = () => {
      window.removeEventListener("message", onMessage);
      if (timeoutId) clearTimeout(timeoutId);
    };

    const tryFinish = () => {
      // Só resolve quando tem os 2: code + waba_id
      if (settled || !loginResponse || !capturedWabaId) return;
      settled = true;
      cleanup();
      resolve({
        ...loginResponse,
        waba_id: capturedWabaId,
        phone_number_id: capturedPhoneId,
        business_id: capturedBusinessId,
      } as any);
    };

    // Se o evento demorar, não trava a tela pra sempre:
    // resolve com o que tem depois de 10s, mas loga o problema
    const timeoutId = setTimeout(() => {
      if (settled) return;
      settled = true;
      cleanup();
      console.warn("[FB] Timeout esperando WA_EMBEDDED_SIGNUP", {
        capturedWabaId,
        capturedPhoneId,
      });
      // Aqui você vai ver que o problema é o evento, não o code
      if (loginResponse)
        resolve({
          ...loginResponse,
          waba_id: capturedWabaId,
          phone_number_id: capturedPhoneId,
        } as any);
      else reject(new Error("Timeout no Embedded Signup"));
    }, 10000);

    const onMessage = (event: MessageEvent) => {
      if (!event.origin.includes("facebook.com")) return;

      let data: any = event.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }
      if (!data || data.type !== "WA_EMBEDDED_SIGNUP") return;

      console.log("[FB] Embedded Signup event:", data);
      const payload = data.data || data;

      capturedWabaId =
        payload.waba_id || payload.wabaId || payload.asset_id || capturedWabaId;
      capturedPhoneId =
        payload.phone_number_id || payload.phoneNumberId || capturedPhoneId;
      capturedBusinessId =
        payload.business_id || payload.businessId || capturedBusinessId;

      if (payload.sessionInfo) {
        capturedWabaId = payload.sessionInfo.waba_id || capturedWabaId;
        capturedPhoneId =
          payload.sessionInfo.phone_number_id || capturedPhoneId;
        capturedBusinessId =
          payload.sessionInfo.business_id || capturedBusinessId;
      }

      tryFinish();
    };

    window.addEventListener("message", onMessage);

    window.FB.login(
      (response: WhatsAppLoginResult) => {
        console.log("[FB] FB.login response:", response);
        if ((response as any).authResponse?.error) {
          if (!settled) {
            settled = true;
            cleanup();
            reject(new Error("Erro no login"));
          }
          return;
        }
        if (!(response as any).authResponse?.code) {
          if (!settled) {
            settled = true;
            cleanup();
            reject(new Error("Código não recebido"));
          }
          return;
        }
        // NÃO resolve aqui. Guarda e espera o evento.
        loginResponse = response;
        tryFinish();
      },
      {
        config_id: configId,
        response_type: "code",
        override_default_response_type: true,
        extras: { setup: {} },
      },
    );
  });
}
