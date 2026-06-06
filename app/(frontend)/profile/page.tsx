import { redirect } from "next/navigation";
import { getCurrentUser } from "@/backend/auth/session";
import { getProfileOverview } from "@/backend/users/queries";
import { UserProfileView } from "@/frontend/components/account/UserProfileView";
import { SiteHeader, WhatsAppButton } from "@/frontend/components/home";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  const profileOverview = await getProfileOverview(currentUser.id);

  if (!profileOverview) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-zinc-950">
      <SiteHeader currentUser={currentUser} />
      <UserProfileView profileOverview={profileOverview} />
      <WhatsAppButton />
    </main>
  );
}
