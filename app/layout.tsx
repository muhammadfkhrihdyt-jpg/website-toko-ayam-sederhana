import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/CartContext";
import { SiteFooter } from "@/frontend/components/home/SiteFooter";

export const metadata: Metadata = {
  title: "Natura Fresh International",
  description:
    "Toko ayam dan telur online Natura Fresh International untuk kebutuhan rumah tangga dan usaha kuliner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <CartProvider>
          {children}
        </CartProvider>
        <SiteFooter />
      </body>
    </html>
  );
}
