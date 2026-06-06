import { deleteSessionCookie } from "@/backend/auth/session";

export async function POST() {
  await deleteSessionCookie();
  return Response.json({ ok: true, message: "Logout berhasil." });
}
