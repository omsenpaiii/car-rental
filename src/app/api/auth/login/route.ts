import { NextResponse } from "next/server";

import { ensureProfileForUser } from "@/lib/portal-auth.server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.user) {
      return NextResponse.json({ error: error?.message ?? "Unable to log in." }, { status: 401 });
    }

    const profile = await ensureProfileForUser(data.user);

    return NextResponse.json({
      user: { id: data.user.id, email: data.user.email ?? null },
      profile,
    });
  } catch (error) {
    console.error("Login failed", error);
    return NextResponse.json({ error: "Unable to log in right now." }, { status: 500 });
  }
}
