import type { PriceListItem } from "@/types/home";

type PriceListSectionProps = {
  priceList: PriceListItem[];
};

export function PriceListSection({ priceList }: PriceListSectionProps) {
  return (
    <section id="harga" className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-[#d97706]">
          Pricelist
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Harga produk ayam dan telur
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
          Gratis pengiriman untuk minimal belanja Rp250.000 sesuai pricelist.
        </p>

        <div className="mt-8 overflow-hidden rounded-[8px] bg-white shadow-sm ring-1 ring-zinc-200">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead className="bg-[#176b2c] text-white">
                <tr>
                  <th className="px-5 py-4 text-base font-bold">Produk</th>
                  <th className="px-5 py-4 text-base font-bold">Pemesanan</th>
                  <th className="px-5 py-4 text-base font-bold">Harga</th>
                </tr>
              </thead>
              <tbody>
                {priceList.flatMap((item) =>
                  item.tiers.map((tier, index) => (
                    <tr
                      key={`${item.product}-${tier.label}`}
                      className="border-t border-zinc-200"
                    >
                      {index === 0 ? (
                        <td
                          rowSpan={item.tiers.length}
                          className="px-5 py-4 align-top font-bold uppercase tracking-wide text-zinc-900"
                        >
                          {item.product}
                        </td>
                      ) : null}
                      <td className="px-5 py-4 text-zinc-700">{tier.label}</td>
                      <td className="bg-[#ffc25f] px-5 py-4 font-bold text-zinc-950">
                        {tier.price}
                      </td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
