import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import type { AuthUser } from "@/backend/auth/service";

const cookieName = "toko_ayam_session";
const maxAge = 60 * 60 * 24 * 7;

function getSecret() {
  return (
    process.env.AUTH_SECRET ??
    process.env.NEXTAUTH_SECRET ??
    process.env.DATABASE_URL ??
    "dev-only-session-secret"
  );
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function encodeSession(user: AuthUser) {
  const payload = Buffer.from(
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }),
  ).toString("base64url");

  return `${payload}.${sign(payload)}`;
}

export function decodeSession(token?: string): AuthUser | null {
  if (!token) {
    return null;
  }

  const [payload, signature] = token.split(".");

  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = sign(payload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString());

    if (
      typeof parsed.id !== "number" ||
      typeof parsed.name !== "string" ||
      typeof parsed.email !== "string" ||
      typeof parsed.role !== "string"
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export async function createSessionCookie(user: AuthUser) {
  const cookieStore = await cookies();

  cookieStore.set(cookieName, encodeSession(user), {
    httpOnly: true,
    maxAge,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function deleteSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  return decodeSession(cookieStore.get(cookieName)?.value);
}
