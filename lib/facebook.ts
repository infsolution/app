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
      console.log("[FB] SDK already loaded");
      resolve(window.FB);
      return;
    }

    console.log("[FB] Loading SDK for appId:", appId);
    
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      console.error("[FB] Failed to load SDK script");
      reject(new Error("Failed to load Facebook SDK"));
    };
    script.onload = () => {
      console.log("[FB] SDK script loaded, initializing...");
      if (typeof window.FB === "undefined") {
        console.error("[FB] window.FB undefined after load");
        reject(new Error("Facebook SDK failed to initialize"));
        return;
      }
      window.FB.init({
        appId,
        version: "v19.0",
        autoLogEvents: true,
      });
      console.log("[FB] SDK initialized successfully");
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
      console.error("[FB] SDK not loaded");
      reject(new Error("Facebook SDK is not loaded"));
      return;
    }

    // Check for HTTPS requirement
    if (typeof window !== "undefined" && window.location.protocol === "http:" && window.location.hostname !== "localhost") {
      const errorMsg = "Facebook Login requires HTTPS. Please use a secure connection (ngrok, Vercel, etc.)";
      console.error("[FB]", errorMsg);
      reject(new Error(errorMsg));
      return;
    }

    console.log("[FB] Calling FB.login with config_id:", configId);
    
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
        console.log("[FB] FB.login response:", response);
        callback(response);
        if (response.authResponse?.error) {
          console.error("[FB] Login error:", response.authResponse);
          reject(
            new Error(
              response.authResponse.error_message || response.authResponse.error
            )
          );
        } else {
          console.log("[FB] Login resolved successfully");
          resolve();
        }
      }
    );
  });
}