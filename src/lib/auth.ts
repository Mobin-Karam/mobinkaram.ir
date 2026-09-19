import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

const SESSION_SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || "default-secret-change-me",
);
const COOKIE_NAME = "admin-session";
const EXPIRY_HOURS = 24;

export type SessionPayload = {
  username: string;
  loginAt: number;
};

/**
 * Verify admin credentials against environment variables.
 */
export async function verifyCredentials(
  username: string,
  password: string,
): Promise<boolean> {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminUsername || !adminPasswordHash) {
    throw new Error("ADMIN_USERNAME or ADMIN_PASSWORD_HASH is missing.");
  }

  if (username !== adminUsername) {
    return false;
  }

  return await bcrypt.compare(password, adminPasswordHash);
}

/**
 * Create a signed JWT session token.
 */
export async function createSession(username: string): Promise<string> {
  const payload: SessionPayload = {
    username,
    loginAt: Date.now(),
  };

  return new SignJWT(payload as any)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${EXPIRY_HOURS}h`)
    .sign(SESSION_SECRET);
}

/**
 * Verify and decode a session token.
 */
export async function verifySession(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SESSION_SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

/**
 * Get the current session from cookies.
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

/**
 * Require an admin session. Throws if not authenticated.
 */
export async function requireAdmin(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

/**
 * Set the session cookie.
 */
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: EXPIRY_HOURS * 60 * 60,
    path: "/",
  });
}

/**
 * Clear the session cookie (logout).
 */
export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Generate a bcrypt hash for a password (for .env setup).
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}
