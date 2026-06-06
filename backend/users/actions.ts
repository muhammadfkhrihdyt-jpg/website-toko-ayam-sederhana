"use server";

import { revalidatePath } from "next/cache";
import { createSessionCookie, getCurrentUser } from "@/backend/auth/session";
import { prisma } from "@/backend/db/prisma";

export type ProfileFormState = {
  status: "idle" | "error" | "success";
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function updateProfile(
  _previousState: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      status: "error",
      message: "Sesi login sudah habis. Silakan masuk ulang.",
    };
  }

  const name = readString(formData, "name");
  const email = readString(formData, "email").toLowerCase();
  const phone = readString(formData, "phone");
  const address = readString(formData, "address");

  if (!name || !email) {
    return {
      status: "error",
      message: "Nama dan email wajib diisi.",
    };
  }

  if (!emailPattern.test(email)) {
    return {
      status: "error",
      message: "Format email belum valid.",
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email,
      NOT: { id: currentUser.id },
    },
    select: { id: true },
  });

  if (existingUser) {
    return {
      status: "error",
      message: "Email sudah digunakan akun lain.",
    };
  }

  const updatedUser = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      name,
      email,
      phone: phone || null,
      address: address || null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  await createSessionCookie({
    ...updatedUser,
    role: updatedUser.role.toString(),
  });
  revalidatePath("/profile");

  return {
    status: "success",
    message: "Profil berhasil diperbarui.",
  };
}

export async function clearAddress(
  previousState: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  void previousState;
  void formData;

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      status: "error",
      message: "Sesi login sudah habis. Silakan masuk ulang.",
    };
  }

  await prisma.user.update({
    where: { id: currentUser.id },
    data: { address: null },
  });

  revalidatePath("/profile");

  return {
    status: "success",
    message: "Alamat berhasil dikosongkan.",
  };
}
