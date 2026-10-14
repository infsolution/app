import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6 text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} WhatsApp Tech Provider</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-gray-900">
            Privacidade
          </Link>
          <Link href="/terms" className="hover:text-gray-900">
            Termos
          </Link>
        </div>
      </div>
    </footer>
  );
}