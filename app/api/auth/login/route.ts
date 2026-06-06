import { createSessionCookie } from "@/backend/auth/session";
import { loginUser } from "@/backend/auth/service";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return Response.json(
      { ok: false, message: "Body JSON tidak valid." },
      { status: 400 },
    );
  }

  const result = await loginUser({
    email: typeof body.email === "string" ? body.email : "",
    password: typeof body.password === "string" ? body.password : "",
  });

  if (!result.ok) {
    return Response.json(result, { status: 401 });
  }

  await createSessionCookie(result.user);
  return Response.json(result);
}
