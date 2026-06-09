import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-[#fbfaf7]">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:px-8 md:grid-cols-[1fr_auto_1fr] lg:px-10">
        <div className="flex items-start">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/brand/natura-fresh-logo.png"
              alt="Natura Fresh International"
              width={180}
              height={120}
              className="h-16 w-auto"
            />
          </Link>
        </div>

        <nav aria-label="Informasi footer" className="md:min-w-56">
          <h2 className="text-lg font-bold text-[#0d7a32]">Information</h2>
          <div className="mt-3 grid gap-2 text-sm font-medium text-zinc-700">
            <Link href="/#tentang" className="transition hover:text-[#d97706]">
              About Us
            </Link>
            <Link
              href="/return-exchange"
              className="transition hover:text-[#d97706]"
            >
              Return & Exchange
            </Link>
          </div>
        </nav>

        <div className="flex items-start md:justify-end">
          <a
            href="https://wa.me/62895703184816"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#25d366] px-5 text-sm font-bold text-white shadow-lg shadow-emerald-950/10 transition hover:bg-[#1ebe5d]"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
      <div className="border-t border-zinc-200 px-6 py-3 text-center text-xs text-zinc-500">
        © 2026 Natura Fresh International
      </div>
    </footer>
  );
}
