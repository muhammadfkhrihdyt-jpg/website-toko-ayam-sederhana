"use client";

import { List, Search, ShoppingBag, UserRound } from "lucide-react";
import type { AuthUser } from "@/backend/auth/service";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();
    const target = trimmedQuery
      ? `/?q=${encodeURIComponent(trimmedQuery)}#produk-unggulan`
      : "/#produk-unggulan";

    router.push(target);
    setShowSearch(false);
  }

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
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSearch((current) => !current)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md transition hover:bg-emerald-50"
              aria-label="Cari produk"
            >
              <Search className="h-6 w-6" aria-hidden="true" />
            </button>
            {showSearch ? (
              <form
                onSubmit={submitSearch}
                className="absolute right-0 top-12 z-50 flex w-[min(78vw,320px)] items-center gap-2 rounded-[8px] bg-white p-2 shadow-xl ring-1 ring-zinc-200"
              >
                <label htmlFor="header-search-produk" className="sr-only">
                  Cari produk
                </label>
                <input
                  id="header-search-produk"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Cari ayam, telur, omega..."
                  autoFocus
                  className="h-10 min-w-0 flex-1 rounded-md border border-zinc-200 px-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-500 focus:border-[#00a51f] focus:ring-4 focus:ring-emerald-100"
                />
                <button
                  type="submit"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#00b80f] text-white transition hover:bg-[#009d0d]"
                  aria-label="Jalankan pencarian"
                >
                  <Search className="h-5 w-5" aria-hidden="true" />
                </button>
              </form>
            ) : null}
          </div>
          <Link
            href="/#harga"
            className="hidden items-center gap-2 text-sm font-semibold transition hover:text-[#d97706] sm:inline-flex"
          >
            <List className="h-5 w-5" aria-hidden="true" />
            Price List
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
