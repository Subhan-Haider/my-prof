import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  AUTHORIZED_ADMIN_EMAIL,
  createSessionToken,
  verifyAdminCredentials,
  updateAdminPassword,
  isRequestAuthorized,
  verifySessionToken,
} from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

// GET /api/admin/auth -> Verify active session
export async function GET(request: Request) {
  try {
    const isAuth = await isRequestAuthorized(request);
    if (isAuth) {
      return NextResponse.json({
        authenticated: true,
        user: {
          email: AUTHORIZED_ADMIN_EMAIL,
          role: "Superadmin",
        },
      });
    }
    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch (error) {
    console.error("Error verifying admin session:", error);
    return NextResponse.json({ authenticated: false, error: "Internal error" }, { status: 500 });
  }
}

// POST /api/admin/auth -> Login, Logout, Change Password
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = body.action || "login";

    // 1. LOGIN
    if (action === "login") {
      const email = (body.email || "").toString().trim().toLowerCase();
      const password = (body.password || "").toString();

      if (!email || !password) {
        return NextResponse.json(
          { success: false, error: "Email and password are required." },
          { status: 400 }
        );
      }

      // Check if email matches authorized email
      if (email !== AUTHORIZED_ADMIN_EMAIL) {
        return NextResponse.json(
          {
            success: false,
            error: `Access Denied: ${email} is not authorized. Only ${AUTHORIZED_ADMIN_EMAIL} can access this dashboard.`,
          },
          { status: 403 }
        );
      }

      // Verify credentials
      const isValid = await verifyAdminCredentials(email, password);
      if (!isValid) {
        return NextResponse.json(
          { success: false, error: "Incorrect password. Please try again." },
          { status: 401 }
        );
      }

      // Generate session token
      const token = createSessionToken(email);

      // Set HTTP-only session cookie
      const cookieStore = await cookies();
      cookieStore.set("admin_auth_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });

      return NextResponse.json({
        success: true,
        token,
        user: {
          email: AUTHORIZED_ADMIN_EMAIL,
          role: "Superadmin",
        },
      });
    }

    // 2. LOGOUT
    if (action === "logout") {
      const cookieStore = await cookies();
      cookieStore.delete("admin_auth_session");
      return NextResponse.json({ success: true, message: "Logged out successfully." });
    }

    // 3. CHANGE PASSWORD
    if (action === "change-password") {
      const isAuth = await isRequestAuthorized(request);
      if (!isAuth) {
        return NextResponse.json(
          { success: false, error: "Unauthorized. Please log in first." },
          { status: 401 }
        );
      }

      const { currentPassword, newPassword } = body;
      if (!currentPassword || !newPassword) {
        return NextResponse.json(
          { success: false, error: "Current password and new password are required." },
          { status: 400 }
        );
      }

      if (newPassword.length < 6) {
        return NextResponse.json(
          { success: false, error: "New password must be at least 6 characters." },
          { status: 400 }
        );
      }

      // Verify current password first
      const isCurrentValid = await verifyAdminCredentials(AUTHORIZED_ADMIN_EMAIL, currentPassword);
      if (!isCurrentValid) {
        return NextResponse.json(
          { success: false, error: "Current password is incorrect." },
          { status: 401 }
        );
      }

      const updated = await updateAdminPassword(newPassword);
      if (updated) {
        return NextResponse.json({ success: true, message: "Password updated successfully." });
      } else {
        return NextResponse.json({ success: false, error: "Failed to update password." }, { status: 500 });
      }
    }

    return NextResponse.json({ success: false, error: "Invalid action." }, { status: 400 });
  } catch (error) {
    console.error("Admin Auth Error:", error);
    return NextResponse.json({ success: false, error: "Authentication server error." }, { status: 500 });
  }
}
