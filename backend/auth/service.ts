import bcrypt from "bcrypt";
import { prisma } from "@/backend/db/prisma";

export type RegisterInput = {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type AuthResult =
  | {
      ok: true;
      message: string;
      user: AuthUser;
    }
  | {
      ok: false;
      message: string;
    };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function registerUser(input: RegisterInput): Promise<AuthResult> {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const phone = input.phone.trim();
  const address = input.address.trim();
  const password = input.password.trim();
  const confirmPassword = input.confirmPassword.trim();

  if (!name || !email || !password || !confirmPassword) {
    return {
      ok: false,
      message: "Nama, email, password, dan konfirmasi password wajib diisi.",
    };
  }

  if (!emailPattern.test(email)) {
    return {
      ok: false,
      message: "Format email belum valid.",
    };
  }

  if (password.length < 8) {
    return {
      ok: false,
      message: "Password minimal 8 karakter.",
    };
  }

  if (password !== confirmPassword) {
    return {
      ok: false,
      message: "Konfirmasi password tidak sama.",
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existingUser) {
    return {
      ok: false,
      message: "Email sudah terdaftar. Silakan login dengan akun tersebut.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
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

  return {
    ok: true,
    message: "Registrasi berhasil. Silakan login dengan akun baru.",
    user: {
      ...user,
      role: user.role.toString(),
    },
  };
}

export async function loginUser(input: LoginInput): Promise<AuthResult> {
  const email = input.email.trim().toLowerCase();
  const password = input.password;
  const passwordCandidates =
    password === password.trim() ? [password] : [password, password.trim()];

  if (!email || !password.trim()) {
    return {
      ok: false,
      message: "Email dan password wajib diisi.",
    };
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      role: true,
    },
  });

  if (!user) {
    return {
      ok: false,
      message: "Email atau password salah.",
    };
  }

  const passwordMatches = await verifyPassword(
    user.id,
    passwordCandidates,
    user.password,
  );

  if (!passwordMatches) {
    return {
      ok: false,
      message: "Email atau password salah.",
    };
  }

  return {
    ok: true,
    message: "Login berhasil.",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.toString(),
    },
  };
}

async function verifyPassword(
  userId: number,
  passwords: string[],
  storedPassword: string,
) {
  if (isBcryptHash(storedPassword)) {
    for (const password of passwords) {
      if (await bcrypt.compare(password, storedPassword)) {
        return true;
      }
    }

    return false;
  }

  const matchingPassword = passwords.find((password) => password === storedPassword);

  if (matchingPassword) {
    await prisma.user.update({
      where: { id: userId },
      data: { password: await bcrypt.hash(matchingPassword, 12) },
    });
  }

  return Boolean(matchingPassword);
}

function isBcryptHash(value: string) {
  return /^\$2[aby]\$\d{2}\$/.test(value);
}
