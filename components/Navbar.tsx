import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-gray-900">
          WhatsApp Tech Provider
        </Link>
        <div className="flex gap-6 text-sm">
          <Link
            href="/connect"
            className="text-gray-600 hover:text-gray-900"
          >
            Conectar
          </Link>
          <Link
            href="/test-send"
            className="text-gray-600 hover:text-gray-900"
          >
            Test Send
          </Link>
          <Link
            href="/templates"
            className="text-gray-600 hover:text-gray-900"
          >
            Templates
          </Link>
        </div>
      </div>
    </nav>
  );
}