/**
 * Server-only auth helpers.
 * Uses Node.js built-in `crypto` — no extra dependencies.
 * Session token = HMAC-SHA256(SESSION_SECRET, ADMIN_EMAIL)
 */
import { createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const SESSION_COOKIE = "admin_session";

function secret(): string {
  return process.env.SESSION_SECRET ?? "dev-fallback-secret-change-in-production";
}

/** Create a deterministic session token for the given email. */
export function createSession(email: string): string {
  return createHmac("sha256", secret()).update(email).digest("hex");
}

/** Return true if the token matches the expected admin session. */
export function verifySession(token: string | undefined): boolean {
  if (!token) return false;
  const expected = createSession(process.env.ADMIN_EMAIL ?? "");
  return token === expected;
}

/**
 * For use inside Route Handlers.
 * Returns a 401 NextResponse if the request has no valid session cookie,
 * otherwise returns null (caller continues).
 */
export function requireAdmin(req: NextRequest): NextResponse | null {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!verifySession(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
