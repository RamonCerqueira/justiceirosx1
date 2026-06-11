import type { Metadata } from "next";
import { Inter, Outfit, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

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
    <html lang="pt-BR" className={cn("font-sans dark", geist.variable)}>
      <body className={`${inter.variable} ${outfit.variable} font-sans min-h-screen antialiased selection:bg-[#D4AF37] selection:text-[#050914]`}>
        {children}
      </body>
    </html>
  );
}
