"use client";

import { useEffect, useState } from "react";
import { exchangeCode } from "@/lib/api";
import { loadFacebookSDK, loginWithWhatsApp } from "@/lib/facebook";

const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID ?? "";
const FB_CONFIG_ID = process.env.NEXT_PUBLIC_FB_CONFIG_ID ?? "";

type Status = "idle" | "loading" | "connecting" | "success" | "error";

interface ConnectResult {
  waba_id: string;
  phone_number_id: string;
}

export default function ConnectPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ConnectResult | null>(null);

  useEffect(() => {
    if (!FB_APP_ID || !FB_CONFIG_ID) {
      setError(
        "Configuração incompleta: defina NEXT_PUBLIC_FB_APP_ID e NEXT_PUBLIC_FB_CONFIG_ID no .env.local"
      );
      setStatus("error");
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        setStatus("loading");
        await loadFacebookSDK(FB_APP_ID);
        if (cancelled) return;
        setStatus("idle");
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Falha ao carregar Facebook SDK");
        setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleConnect() {
    setError(null);
    setStatus("connecting");

    try {
      await loginWithWhatsApp(FB_CONFIG_ID, async (response) => {
        const code = response.authResponse?.code;
        if (!code) {
          const msg =
            response.authResponse?.error_message ||
            response.authResponse?.error ||
            "Código não recebido";
          setError(msg);
          setStatus("error");
          return;
        }

        const data = await exchangeCode(code);
        setResult({
          waba_id: data.waba_id,
          phone_number_id: data.phone_number_id,
        });
        if (typeof window !== "undefined") {
          localStorage.setItem("waba_id", data.waba_id);
          localStorage.setItem("phone_number_id", data.phone_number_id);
        }
        setStatus("success");
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao conectar");
      setStatus("error");
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-2">Conectar WhatsApp</h1>
      <p className="text-gray-600 mb-6">
        Conecte sua conta de negócios do WhatsApp por meio do Facebook Login.
      </p>

      {status === "error" && (
        <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {status === "success" && result && (
        <div className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-700">
          <p className="font-medium">Conectado com sucesso!</p>
          <p className="mt-1">
            <span className="font-medium">WABA ID:</span> {result.waba_id}
          </p>
          <p className="mt-1">
            <span className="font-medium">Phone Number ID:</span>{" "}
            {result.phone_number_id}
          </p>
        </div>
      )}

      <button
        onClick={handleConnect}
        disabled={
          status === "loading" ||
          status === "connecting" ||
          status === "success"
        }
        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading" && "Carregando SDK..."
        }
        {status === "connecting" && "Conectando..."
        }
        {status === "success" && "Conectado"}
        {status === "idle" && "Conectar WhatsApp"}
      </button>
    </div>
  );
}