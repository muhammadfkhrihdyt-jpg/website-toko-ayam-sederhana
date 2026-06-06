import { registerUser } from "@/backend/auth/service";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return Response.json(
      { ok: false, message: "Body JSON tidak valid." },
      { status: 400 },
    );
  }

  const result = await registerUser({
    name: typeof body.name === "string" ? body.name : "",
    email: typeof body.email === "string" ? body.email : "",
    phone: typeof body.phone === "string" ? body.phone : "",
    address: typeof body.address === "string" ? body.address : "",
    password: typeof body.password === "string" ? body.password : "",
    confirmPassword:
      typeof body.confirmPassword === "string" ? body.confirmPassword : "",
  });

  return Response.json(result, { status: result.ok ? 201 : 400 });
}
