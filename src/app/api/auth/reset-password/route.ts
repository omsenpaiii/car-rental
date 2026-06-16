import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json();
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (email) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.resetPasswordForEmail(email);
  }

  return NextResponse.json({
    message: "If that account exists, a password reset email has been sent.",
  });
}
