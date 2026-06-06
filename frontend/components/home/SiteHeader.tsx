"use client";

import { MapPin, Search, ShoppingBag, UserRound } from "lucide-react";
import type { AuthUser } from "@/backend/auth/service";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/CartContext";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Produk", href: "/#produk-unggulan" },
  { label: "Tentang Kami", href: "/#tentang" },
];

type SiteHeaderProps = {
  currentUser?: AuthUser | null;
};

export function SiteHeader({ currentUser }: SiteHeaderProps) {
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white">
      <div className="mx-auto grid h-24 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 sm:px-8 lg:px-10">
        <Link href="/" className="inline-flex shrink-0 items-center">
          <Image
            src="/brand/natura-fresh-logo.png"
            alt="Natura Fresh International"
            width={174}
            height={120}
            priority
            className="h-12 w-auto"
          />
        </Link>

        <nav className="hidden items-center justify-center gap-12 text-[15px] font-medium text-[#007a20] lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition hover:text-[#d97706]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-5 text-[#007a20]">
          <Link
            href="/#produk-unggulan"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md transition hover:bg-emerald-50"
            aria-label="Cari produk"
          >
            <Search className="h-6 w-6" aria-hidden="true" />
          </Link>
          <Link
            href="/#harga"
            className="hidden items-center gap-2 text-sm font-semibold transition hover:text-[#d97706] sm:inline-flex"
          >
            <MapPin className="h-5 w-5" aria-hidden="true" />
            Atur lokasi
          </Link>
          <Link
            href={currentUser ? "/profile" : "/login"}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md px-2 text-sm font-semibold transition hover:bg-emerald-50 hover:text-[#d97706]"
            aria-label={currentUser ? "Profil saya" : "Masuk"}
          >
            <UserRound className="h-6 w-6" aria-hidden="true" />
            <span className="hidden xl:inline">
              {currentUser ? "Profil Saya" : "Masuk"}
            </span>
          </Link>
          <Link
            href="/cart"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md transition hover:bg-emerald-50"
            aria-label="Keranjang"
          >
        <div className="relative">
          <ShoppingBag className="h-6 w-6" aria-hidden="true" />
          {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
