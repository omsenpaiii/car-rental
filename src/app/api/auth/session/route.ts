import { NextResponse } from "next/server";

import { getCurrentSessionProfile } from "@/lib/portal-auth.server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { user, profile } = await getCurrentSessionProfile();

    return NextResponse.json({
      user: user ? { id: user.id, email: user.email ?? null } : null,
      profile,
    });
  } catch (error) {
    console.error("Failed to load auth session", error);
    return NextResponse.json({ user: null, profile: null });
  }
}
