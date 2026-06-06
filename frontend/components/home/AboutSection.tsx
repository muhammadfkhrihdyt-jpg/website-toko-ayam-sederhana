import Image from "next/image";

export function AboutSection() {
  return (
    <section id="tentang" className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
      <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="relative aspect-[6/5] overflow-hidden rounded-[8px] bg-white shadow-sm ring-1 ring-zinc-200">
          <Image
            src="/brand/about-eggs.jpg"
            alt="Telur pilihan Natura Fresh International"
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#d97706]">
            Tentang Kami
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Kualitas terbaik, harga kompetitif, pilihan produk lebih lengkap.
          </h2>
          <p className="mt-5 text-base leading-8 text-zinc-700">
            Natura Fresh International menyediakan ayam dan telur untuk
            kebutuhan rumah tangga maupun usaha kuliner. Produk tersedia dalam
            banyak variasi, mulai dari ayam utuh, potongan khusus, boneless,
            hingga pilihan telur bernutrisi.
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Ayam",
                description: "Ayam utuh, potongan tertentu, dan boneless.",
              },
              {
                title: "Telur",
                description: "Telur negeri segar, Low Cholesterol Omega, Ultra Omega.",
              },
              {
                title: "Layanan",
                description: "Pengiriman, konsultasi, dan fleksibilitas pembayaran.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[8px] bg-white p-5 ring-1 ring-zinc-200">
                <p className="text-2xl font-bold text-[#0d7a32]">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
