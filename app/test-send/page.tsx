"use client";

import { useEffect, useState } from "react";
import { sendMessage, SendMessageResponse } from "@/lib/api";

type MessageType = "template" | "text";

export default function TestSendPage() {
  const [phoneNumberId, setPhoneNumberId] = useState("");
  const [to, setTo] = useState("");
  const [messageType, setMessageType] = useState<MessageType>("text");
  const [templateName, setTemplateName] = useState("");
  const [language, setLanguage] = useState("pt_BR");
  const [messageBody, setMessageBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<SendMessageResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("phone_number_id");
      if (stored) setPhoneNumberId(stored);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    setError(null);

    const payload: {
      to: string;
      message_type: MessageType;
      template_name?: string;
      language?: string;
      message_body?: string;
    } = {
      to,
      message_type: messageType,
    };

    if (messageType === "template") {
      payload.template_name = templateName;
      payload.language = language;
    } else {
      payload.message_body = messageBody;
    }

    try {
      const res = await sendMessage(phoneNumberId, payload as any);
      setResponse(res);
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao enviar mensagem");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">Test Send</h1>
      <p className="text-gray-600 mb-6">
        Envie mensagens de teste para um número de telefone.
      </p>

      {toast && (
        <div className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-700">
          Mensagem enviada - verifique o WhatsApp
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number ID
          </label>
          <input
            type="text"
            required
            value={phoneNumberId}
            onChange={(e) => setPhoneNumberId(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            To (phone number)
          </label>
          <input
            type="text"
            required
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="5511999999999"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Message Type
          </label>
          <select
            value={messageType}
            onChange={(e) => setMessageType(e.target.value as MessageType)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="text">text</option>
            <option value="template">template</option>
          </select>
        </div>

        {messageType === "template" ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Template Name
              </label>
              <input
                type="text"
                required
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <input
                type="text"
                required
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="pt_BR"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message Body
            </label>
            <textarea
              required
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {response && (
        <div className="mt-6">
          <h2 className="text-sm font-medium text-gray-700 mb-2">Response</h2>
          <pre className="overflow-x-auto rounded-md bg-gray-900 p-4 text-sm text-gray-50">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}