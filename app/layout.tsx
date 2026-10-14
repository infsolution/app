/** @type {import('next').Metadata} */
const metadata = {
  title: "WhatsApp Tech Provider",
  description: "Connect and manage WhatsApp Business via Meta's API",
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <Navbar />
        <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}