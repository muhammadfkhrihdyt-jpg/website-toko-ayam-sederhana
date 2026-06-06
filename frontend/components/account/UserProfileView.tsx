import { LogOut, MapPin, PackageCheck, UserRound } from "lucide-react";
import { logoutAccount } from "@/backend/auth/actions";
import type { ProfileOverview } from "@/backend/users/queries";
import { ProfileEditForm } from "@/frontend/components/account/ProfileEditForm";

type UserProfileViewProps = {
  profileOverview: ProfileOverview;
};

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function UserProfileView({ profileOverview }: UserProfileViewProps) {
  return (
    <section className="bg-[#fbfaf7] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#d97706]">
              Akun Saya
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
              Profil pengguna
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
              Kelola data akun, alamat pengiriman, dan pantau status pesanan.
            </p>
          </div>

          <form action={logoutAccount}>
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-red-600 px-5 text-sm font-bold text-white transition hover:bg-red-700"
            >
              <LogOut className="h-5 w-5" aria-hidden="true" />
              Keluar Akun
            </button>
          </form>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <ProfileEditForm user={profileOverview.user} />

          <section className="rounded-[8px] bg-white p-6 shadow-sm ring-1 ring-zinc-200">
            <UserRound className="h-8 w-8 text-[#0d7a32]" aria-hidden="true" />
            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-[#d97706]">
              Profil Saya
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#0d7a32]">
              {profileOverview.user.name}
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-semibold text-zinc-950">Email</dt>
                <dd className="mt-1 text-zinc-600">{profileOverview.user.email}</dd>
              </div>
              <div>
                <dt className="font-semibold text-zinc-950">Nomor WhatsApp</dt>
                <dd className="mt-1 text-zinc-600">
                  {profileOverview.user.phone || "Belum diisi"}
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-[8px] bg-white p-6 shadow-sm ring-1 ring-zinc-200">
            <MapPin className="h-8 w-8 text-[#0d7a32]" aria-hidden="true" />
            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-[#d97706]">
              Alamat Saya
            </p>
            <p className="mt-4 text-sm leading-7 text-zinc-700">
              {profileOverview.user.address || "Alamat pengiriman belum diisi."}
            </p>
          </section>

          <section className="rounded-[8px] bg-white p-6 shadow-sm ring-1 ring-zinc-200">
            <PackageCheck className="h-8 w-8 text-[#0d7a32]" aria-hidden="true" />
            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-[#d97706]">
              Pesanan Saya
            </p>
            {profileOverview.orders.length > 0 ? (
              <div className="mt-4 space-y-4">
                {profileOverview.orders.map((order) => (
                  <article
                    key={order.orderNumber}
                    className="rounded-md border border-zinc-200 p-4"
                  >
                    <p className="text-sm font-bold text-zinc-950">
                      {order.orderNumber}
                    </p>
                    <p className="mt-2 text-xs font-semibold text-[#0d7a32]">
                      Status pengiriman: {translateOrderStatus(order.status)}
                    </p>
                    <p className="mt-1 text-xs text-zinc-600">
                      Pembayaran: {translatePaymentStatus(order.paymentStatus)}
                    </p>
                    <p className="mt-2 text-sm font-bold text-zinc-950">
                      {formatter.format(order.total)}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm leading-7 text-zinc-700">
                Belum ada pesanan.
              </p>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}

function translateOrderStatus(status: string) {
  const labels: Record<string, string> = {
    PENDING: "Menunggu pembayaran",
    PAID: "Sudah dibayar",
    PROCESSING: "Diproses",
    SHIPPED: "Dikirim",
    COMPLETED: "Selesai",
    CANCELLED: "Dibatalkan",
  };

  return labels[status] ?? status;
}

function translatePaymentStatus(status: string) {
  const labels: Record<string, string> = {
    UNPAID: "Belum dibayar",
    PAID: "Sudah dibayar",
    FAILED: "Gagal",
    REFUNDED: "Dikembalikan",
  };

  return labels[status] ?? status;
}
