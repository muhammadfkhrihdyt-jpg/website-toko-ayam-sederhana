import { getCurrentUser } from "@/backend/auth/session";
import { SiteHeader, WhatsAppButton } from "@/frontend/components/home";

const returnSections = [
  {
    title: "Batas Waktu Retur & Refund",
    items: ["Pengajuan maksimal 1x24 jam setelah produk diterima."],
  },
  {
    title: "Syarat Retur & Refund",
    items: [
      "Sertakan foto/video kondisi produk, label pengiriman, dan nomor pesanan.",
      "Diwajibkan menyertakan video unboxing.",
    ],
  },
  {
    title: "Alasan Retur & Refund yang Diterima",
    items: [
      "Produk rusak seperti kemasan sobek atau bocor.",
      "Produk mencair saat diterima.",
      "Salah kirim produk.",
      "Kekurangan kirim produk.",
      "Kedaluwarsa saat diterima.",
    ],
  },
  {
    title: "Syarat Pengembalian",
    items: [
      "Produk harus dalam kondisi yang sama saat diterima.",
      "Produk harus dalam kondisi tersegel.",
      "Produk yang sudah dibuka atau dimasak tidak dapat diretur.",
    ],
  },
  {
    title: "Proses Retur",
    items: [
      "Pengajuan akan kami tinjau dan konfirmasi terlebih dahulu.",
      "Jika barang akan diretur atau ditukar, kami akan melakukan penjemputan barang secara langsung.",
      "Jika tidak ada retur dan hanya refund, tim kami akan meminta detail untuk proses pengembalian dana.",
    ],
  },
  {
    title: "Kompensasi",
    items: [
      "Barang pengganti atau refund diberikan sesuai kondisi produk.",
      "Refund dikembalikan kepada customer sesuai harga produk saja, di luar biaya ongkos kirim.",
      "Terdapat kemungkinan pemotongan biaya transfer antar bank untuk pengembalian dana.",
      "Proses refund dan retur membutuhkan 7 hari kerja setelah barang retur diterima.",
    ],
  },
];

export default async function ReturnExchangePage() {
  const currentUser = await getCurrentUser();

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-zinc-950">
      <SiteHeader currentUser={currentUser} />
      <section className="mx-auto max-w-4xl px-6 py-12 sm:px-8 lg:px-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#d97706]">
          Return and Exchange
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Kebijakan Retur & Refund Produk
        </h1>
        <p className="mt-4 text-base leading-7 text-zinc-700">
          Kami menerima retur dan refund dengan ketentuan sebagai berikut.
        </p>

        <div className="mt-8 grid gap-5">
          {returnSections.map((section) => (
            <section
              key={section.title}
              className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-zinc-200"
            >
              <h2 className="text-lg font-bold text-[#0d7a32]">
                {section.title}
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-700">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-[8px] bg-[#0d7a32] p-5 text-white">
          <h2 className="text-lg font-bold">Hubungi CS</h2>
          <p className="mt-2 text-sm leading-6">
            Hubungi CS kami via WhatsApp untuk proses retur.
          </p>
          <a
            href="https://wa.me/62895703184816"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex h-11 items-center justify-center rounded-md bg-white px-5 text-sm font-bold text-[#0d7a32] transition hover:bg-emerald-50"
          >
            WA: +62 895-7031-84816
          </a>
        </div>
      </section>
      <WhatsAppButton />
    </main>
  );
}
