import { redirect } from "next/navigation";
import { getCurrentUser } from "@/backend/auth/session";
import { getProfileOverview } from "@/backend/users/queries";
import { CheckoutView } from "@/frontend/components/checkout/CheckoutView";
import { SiteHeader, WhatsAppButton } from "@/frontend/components/home";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  const profileOverview = await getProfileOverview(currentUser.id);

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-zinc-950">
      <SiteHeader currentUser={currentUser} />
      <CheckoutView customer={profileOverview?.user ?? null} />
      <WhatsAppButton />
    </main>
  );
}
