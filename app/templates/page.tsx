"use client";

import { useEffect, useState } from "react";
import { getTemplates, createTemplate } from "@/lib/api";
import { useRouter } from "next/navigation";

type TemplateType = "MARKETING" | "UTILITY" | "AUTHENTICATION";

interface Template {
  id: string;
  name: string;
  category: TemplateType;
  language: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  components?: unknown[];
}

const wabaId = typeof window !== "undefined" ? localStorage.getItem("waba_id") : null;

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    category: "MARKETING",
    language: "",
    components: "[]",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const router = useRouter();

  // Load templates if wabaId exists
  useEffect(() => {
    if (wabaId) {
      loadTemplates();
    }
  }, [wabaId]);

  const loadTemplates = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTemplates(wabaId!);
      setTemplates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao carregar templates");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTemplate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = {
        name: newTemplate.name,
        category: newTemplate.category as TemplateType,
        language: newTemplate.language,
        components: JSON.parse(newTemplate.components),
      };
      const created = await createTemplate(wabaId!, data);
      setTemplates((prev) => [...prev, created]);
      setNewTemplate({
        name: "",
        category: "MARKETING",
        language: "",
        components: "[]",
      });
      setShowCreateForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao criar template");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewTemplate((prev) => ({ ...prev, category: e.target.value as TemplateType }));
  };

  const handleCategoryBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    // Ensure category is properly set when losing focus
    setNewTemplate((prev) => ({
      ...prev,
      category: e.target.value as TemplateType,
    }));
  };

  const handleComponentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTemplate((prev) => ({
      ...prev,
      components: e.target.value,
    }));
  };

  if (!wabaId) {
    return (
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold mb-2">Templates</h1>
        <p className="text-gray-600 mb-6">
          Para gerenciar templates, você precisa estar conectado ao WhatsApp Business API.
        </p>
        <p className="text-sm text-gray-500">
          Acesse a página <a href="/connect" className="text-blue-600 hover:underline">/connect</a> para conectar sua conta.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">Templates</h1>
      
      {showCreateForm ? (
        <div className="bg-white p-6 rounded-md shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Criar Novo Template</h2>
          <form onSubmit={handleCreateTemplate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                required
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Categoria
              </label>
              <select
                value={newTemplate.category}
                onChange={handleCategoryChange}
                onBlur={handleCategoryBlur}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="MARKETING">Marketing</option>
                <option value="UTILITY">Utility</option>
                <option value="AUTHENTICATION">Authentication</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Idioma
              </label>
              <input
                type="text"
                required
                value={newTemplate.language}
                onChange={(e) => setNewTemplate({ ...newTemplate, language: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Componentes JSON
              </label>
              <textarea
                rows={4}
                value={newTemplate.components}
                onChange={handleComponentChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Criando..." : "Criar Template"}
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Novo Template
        </button>
      )}

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Lista de Templates</h2>
        {templates.length === 0 ? (
          <p className="text-gray-500">Nenhum template encontrado.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200 rounded-md shadow">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nome</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Categoria</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Idioma</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {templates.map((template) => (
                <tr key={template.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm">{template.name}</td>
                  <td className="px-4 py-2 text-sm">{template.category}</td>
                  <td className="px-4 py-2 text-sm">{template.language}</td>
                  <td className="px-4 py-2 text-sm">
                    <span className={`px-2 py-1 rounded ${
                      template.status === "APPROVED"
                        ? "bg-green-100 text-green-800"
                        : template.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {template.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm space-x-2">
                    <button
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          localStorage.setItem("selected_template", template.id);
                        }
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}
    </div>
  );
}