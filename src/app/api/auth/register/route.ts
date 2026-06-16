import { NextResponse } from "next/server";

import { ensureProfileForUser } from "@/lib/portal-auth.server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";

    if (!email || !password || !fullName || !phone) {
      return NextResponse.json(
        { error: "Name, phone, email, and password are required." },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
        },
      },
    });

    if (error || !data.user) {
      return NextResponse.json(
        { error: error?.message ?? "Unable to create account." },
        { status: 400 }
      );
    }

    const profile = await ensureProfileForUser(data.user);

    return NextResponse.json(
      {
        user: { id: data.user.id, email: data.user.email ?? null },
        profile,
        message: data.session
          ? "Account created and signed in."
          : "Account created. Check your email if confirmation is enabled.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration failed", error);
    return NextResponse.json({ error: "Unable to create account right now." }, { status: 500 });
  }
}
