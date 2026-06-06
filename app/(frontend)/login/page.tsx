import { getCurrentUser } from "@/backend/auth/session";
import { LoginSection, SiteHeader, WhatsAppButton } from "@/frontend/components/home";

export default async function LoginPage() {
  const currentUser = await getCurrentUser();

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SiteHeader currentUser={currentUser} />
      <LoginSection />
      <WhatsAppButton />
    </main>
  );
}
