const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3000/v1";

interface ApiError {
  error?: string;
  message?: string;
  [key: string]: unknown;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${BACKEND_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers as Record<string, string>),
    },
    ...init,
  });

  const text = await response.text();
  let data: unknown = text ? JSON.parse(text) : {};

  if (!response.ok) {
    const err = (data as ApiError) ?? {};
    const message =
      err.message ||
      err.error ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data as T;
}

export interface AuthExchangeResponse {
  waba_id: string;
  phone_number_id: string;
  access_token?: string;
}

export function exchangeCode(code: string): Promise<AuthExchangeResponse> {
  return request<AuthExchangeResponse>("/auth/exchange-code", {
    method: "POST",
    body: JSON.stringify({ code }),
  });
}

export interface SendMessagePayload {
  to: string;
  message_type: "template" | "text";
  template_name?: string;
  language?: string;
  message_body?: string;
}

export interface SendMessageResponse {
  messaging_product: string;
  contacts: Array<{ input: string; wa_id: string }>;
  messages: Array<{ id: string }>;
}

export function sendMessage(
  phoneNumberId: string,
  payload: SendMessagePayload,
): Promise<SendMessageResponse> {
  return request<SendMessageResponse>(`/whatsapp/${phoneNumberId}/messages`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export interface Template {
  id: string;
  name: string;
  category: "MARKETING" | "UTILITY" | "AUTHENTICATION";
  language: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  components?: unknown[];
}

export function getTemplates(wabaId: string): Promise<Template[]> {
  return request<Template[]>(`/waba/${wabaId}/templates`);
}

export interface CreateTemplateData {
  name: string;
  category: "MARKETING" | "UTILITY" | "AUTHENTICATION";
  language: string;
  components: unknown[];
}

export function createTemplate(
  wabaId: string,
  data: CreateTemplateData,
): Promise<Template> {
  return request<Template>(`/waba/${wabaId}/templates`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
