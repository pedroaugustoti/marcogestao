import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner"; // IMPORTANTE: Importar o Toaster
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marco Gestão",
  description: "Inteligência que gera lucro.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#1E2B50",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${jakarta.className} bg-[#F4F5F7] min-h-screen flex flex-col antialiased subpixel-antialiased`}>
        {children}
        {/* O Toaster fica aqui, escutando toda a aplicação */}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}