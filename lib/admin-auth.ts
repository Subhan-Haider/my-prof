import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import { cookies } from "next/headers";

export const AUTHORIZED_ADMIN_EMAIL = (
  process.env.ADMIN_AUTHORIZED_EMAIL || "setupg98@gmail.com"
).toLowerCase().trim();

const AUTH_SECRET = process.env.ADMIN_AUTH_SECRET || "subhan-haider-portfolio-admin-secret-key-2026";
const DATA_FILE_PATH = path.join(process.cwd(), "data.json");

// Helper to hash password with salt
export function hashPassword(password: string, salt: string = "portfolio_salt_2026"): string {
  return crypto.createHmac("sha256", AUTH_SECRET).update(`${password}:${salt}`).digest("hex");
}

// Generate secure session token
export function createSessionToken(email: string): string {
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const payload = `${email.toLowerCase()}:${expiresAt}`;
  const signature = crypto.createHmac("sha256", AUTH_SECRET).update(payload).digest("hex");
  return Buffer.from(JSON.stringify({ email: email.toLowerCase(), expiresAt, signature })).toString("base64");
}

// Verify session token
export function verifySessionToken(token: string): { valid: boolean; email?: string } {
  try {
    if (!token) return { valid: false };
    const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf8"));
    const { email, expiresAt, signature } = decoded;

    if (!email || !expiresAt || !signature) return { valid: false };
    if (Date.now() > expiresAt) return { valid: false };
    if (email.toLowerCase() !== AUTHORIZED_ADMIN_EMAIL) return { valid: false };

    const expectedPayload = `${email.toLowerCase()}:${expiresAt}`;
    const expectedSignature = crypto.createHmac("sha256", AUTH_SECRET).update(expectedPayload).digest("hex");

    if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return { valid: true, email };
    }
    return { valid: false };
  } catch {
    return { valid: false };
  }
}

// Get configured password hash or fallback
export async function getAdminAuthData(): Promise<{ passwordHash: string; salt: string }> {
  try {
    const fileContents = await fs.readFile(DATA_FILE_PATH, "utf8");
    const data = JSON.parse(fileContents);
    if (data.adminAuth && data.adminAuth.passwordHash) {
      return data.adminAuth;
    }
  } catch (err) {
    console.error("Error reading admin auth data:", err);
  }

  // Fallback default password is "setupg98" (or env ADMIN_PASSWORD)
  const defaultPassword = process.env.ADMIN_PASSWORD || "setupg98";
  const salt = "portfolio_salt_2026";
  const passwordHash = hashPassword(defaultPassword, salt);
  return { passwordHash, salt };
}

// Verify password
export async function verifyAdminCredentials(email: string, passwordAttempt: string): Promise<boolean> {
  const normalizedEmail = email.toLowerCase().trim();
  if (normalizedEmail !== AUTHORIZED_ADMIN_EMAIL) {
    return false;
  }

  const { passwordHash, salt } = await getAdminAuthData();
  const attemptHash = hashPassword(passwordAttempt, salt);
  
  return crypto.timingSafeEqual(Buffer.from(attemptHash), Buffer.from(passwordHash));
}

// Change Admin Password
export async function updateAdminPassword(newPassword: string): Promise<boolean> {
  try {
    const salt = crypto.randomBytes(16).toString("hex");
    const passwordHash = hashPassword(newPassword, salt);

    const fileContents = await fs.readFile(DATA_FILE_PATH, "utf8");
    const data = JSON.parse(fileContents);

    data.adminAuth = {
      email: AUTHORIZED_ADMIN_EMAIL,
      passwordHash,
      salt,
      updatedAt: new Date().toISOString(),
    };

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Error updating admin password:", err);
    return false;
  }
}

// Server-side helper to verify request authentication
export async function isRequestAuthorized(request?: Request): Promise<boolean> {
  // 1. Check Authorization header
  if (request) {
    const authHeader = request.headers.get("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      const { valid } = verifySessionToken(token);
      if (valid) return true;
    }
  }

  // 2. Check cookies
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("admin_auth_session")?.value;
    if (sessionCookie) {
      const { valid } = verifySessionToken(sessionCookie);
      if (valid) return true;
    }
  } catch {
    // Cookie store may not be available in non-standard contexts
  }

  return false;
}
