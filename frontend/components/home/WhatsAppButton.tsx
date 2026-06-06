import { MessageCircle } from "lucide-react";
import Link from "next/link";

export function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/62895703184816"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 inline-flex h-14 items-center gap-2 rounded-full bg-[#25d366] px-5 text-sm font-bold text-white shadow-xl shadow-emerald-950/20 transition hover:-translate-y-0.5 hover:bg-[#1fbd59]"
      aria-label="Chat WhatsApp Natura Fresh"
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      WhatsApp Us
    </Link>
  );
}
