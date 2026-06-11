import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Justiceiros do X1 Academy",
  description: "Plataforma interativa para dominar o mercado de X1.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-navy text-foreground min-h-screen flex antialiased`}>
        {children}
      </body>
    </html>
  );
}
