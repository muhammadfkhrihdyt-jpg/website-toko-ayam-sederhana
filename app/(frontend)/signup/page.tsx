import { getCurrentUser } from "@/backend/auth/session";
import { SignupSection, SiteHeader, WhatsAppButton } from "@/frontend/components/home";

export default async function SignupPage() {
  const currentUser = await getCurrentUser();

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SiteHeader currentUser={currentUser} />
      <SignupSection />
      <WhatsAppButton />
    </main>
  );
}
