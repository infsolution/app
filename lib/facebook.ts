declare global {
  interface Window {
    FB?: any;
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
}

export function loadFacebookSDK(appId: string): Promise<typeof window.FB> {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && window.FB) {
      resolve(window.FB);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error("Failed to load Facebook SDK"));
    script.onload = () => {
      if (typeof window.FB === "undefined") {
        reject(new Error("Facebook SDK failed to initialize"));
        return;
      }
      window.FB.init({
        appId,
        version: "v19.0",
        autoLogEvents: true,
      });
      resolve(window.FB);
    };
    document.head.appendChild(script);
  });
}

export function loginWithWhatsApp(
  configId: string,
  callback: (result: WhatsAppLoginResult) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || typeof window.FB === "undefined") {
      reject(new Error("Facebook SDK is not loaded"));
      return;
    }

    window.FB.login(
      {
        config_id: configId,
        response_type: "code",
        override_default_response_type: true,
        extras: {
          setup: {},
        },
      },
      (response: WhatsAppLoginResult) => {
        callback(response);
        if (response.authResponse?.error) {
          reject(
            new Error(
              response.authResponse.error_message || response.authResponse.error
            )
          );
        } else {
          resolve();
        }
      }
    );
  });
}