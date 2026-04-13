import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const ADMIN_SESSION_COOKIE = "kuleta_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

type AdminSession = {
  adminId: string;
  email: string;
};

function getJwtSecret() {
  const rawSecret = process.env.ADMIN_JWT_SECRET;
  if (rawSecret && rawSecret.length >= 32) {
    return new TextEncoder().encode(rawSecret);
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("ADMIN_JWT_SECRET must be set and at least 32 characters in production.");
  }

  return new TextEncoder().encode("dev-only-admin-secret-change-me-please");
}

export function getAdminSessionCookieName() {
  return ADMIN_SESSION_COOKIE;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export async function createAdminSessionToken(session: AdminSession) {
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({ email: session.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.adminId)
    .setIssuedAt(now)
    .setExpirationTime(now + SESSION_DURATION_SECONDS)
    .sign(getJwtSecret());
}

export async function verifyAdminSessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    if (!payload.sub || typeof payload.email !== "string") {
      return null;
    }

    return {
      adminId: payload.sub,
      email: payload.email,
    };
  } catch {
    return null;
  }
}

export async function getAdminSessionFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) {
    return null;
  }

  return verifyAdminSessionToken(token);
}
