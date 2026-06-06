"use server";

import { redirect } from "next/navigation";
import { createSessionCookie, deleteSessionCookie } from "@/backend/auth/session";
import { loginUser, registerUser } from "@/backend/auth/service";

export type AuthFormState = {
  status: "idle" | "error" | "success";
  message: string;
};

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function createAccount(
  _previousState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const result = await registerUser({
    name: readString(formData, "name"),
    email: readString(formData, "email"),
    phone: readString(formData, "phone"),
    address: readString(formData, "address"),
    password: readString(formData, "password"),
    confirmPassword: readString(formData, "confirmPassword"),
  });

  return {
    status: result.ok ? "success" : "error",
    message: result.message,
  };
}

export async function loginAccount(
  _previousState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const result = await loginUser({
    email: readString(formData, "email"),
    password: readString(formData, "password"),
  });

  if (!result.ok) {
    return {
      status: "error",
      message: result.message,
    };
  }

  await createSessionCookie(result.user);
  redirect("/");
}

export async function logoutAccount() {
  await deleteSessionCookie();
  redirect("/login");
}
