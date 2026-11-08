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

    if (
      window.location.protocol === "http:" &&
      window.location.hostname !== "localhost"
    ) {
      reject(new Error("Facebook Login requires HTTPS"));
      return;
    }

    console.log("[FB] Calling FB.login with config_id:", configId);

    let capturedWabaId: string | null = null;
    let capturedPhoneId: string | null = null;
    let settled = false;

    const cleanup = () => {
      window.removeEventListener("message", onMessage);
    };

    const finishSuccess = (response: WhatsAppLoginResult) => {
      if (settled) return;
      settled = true;
      cleanup();
      console.log(
        "[FB] Captured WABA:",
        capturedWabaId,
        "Phone:",
        capturedPhoneId,
      );
      resolve({
        ...response,
        waba_id: capturedWabaId,
        phone_number_id: capturedPhoneId,
      });
    };

    const finishError = (err: Error) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(err);
    };

    const onMessage = (event: MessageEvent) => {
      // A Meta manda de facebook.com OU de business.facebook.com
      if (!event.origin.includes("facebook.com")) {
        return;
      }

      // event.data pode vir como string OU como objeto. Trata os 2.
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

      // A Meta manda em 2 formatos diferentes dependendo da versão:
      // { data: { waba_id, phone_number_id } } OU { waba_id, phone_number_id }
      const payload = data.data || data;
      capturedWabaId = payload.waba_id || payload.wabaId || capturedWabaId;
      capturedPhoneId =
        payload.phone_number_id || payload.phoneNumberId || capturedPhoneId;

      // Fallback: as vezes vem dentro de sessionInfo
      if (payload.sessionInfo) {
        capturedWabaId = payload.sessionInfo.waba_id || capturedWabaId;
        capturedPhoneId =
          payload.sessionInfo.phone_number_id || capturedPhoneId;
      }
    };

    window.addEventListener("message", onMessage);

    window.FB.login(
      (response: WhatsAppLoginResult) => {
        console.log("[FB] FB.login response:", response);
        if (response.authResponse?.error) {
          finishError(
            new Error(
              response.authResponse.error_message ||
                response.authResponse.error ||
                "Erro no login",
            ),
          );
        } else if (!response.authResponse?.code) {
          finishError(new Error("Código não recebido"));
        } else {
          // Dá 500ms pro evento WA_EMBEDDED_SIGNUP chegar antes de resolver
          // Senão o waba_id chega depois do resolve e se perde
          setTimeout(() => finishSuccess(response), 500);
        }
      },
      {
        config_id: configId,
        response_type: "code",
        override_default_response_type: true,
        extras: {
          setup: {},
        },
      },
    );
  });
}
