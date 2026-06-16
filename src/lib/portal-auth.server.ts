import "server-only";

import type { User } from "@supabase/supabase-js";

import { isConfiguredAdminEmail } from "@/lib/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type PortalProfile = {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: "user" | "admin";
  created_at: string;
  updated_at: string;
};

function getDisplayName(user: User) {
  const metadataName = user.user_metadata?.full_name;
  if (typeof metadataName === "string" && metadataName.trim()) {
    return metadataName.trim();
  }

  return user.email?.split("@")[0] ?? "Phillips customer";
}

export async function ensureProfileForUser(user: User) {
  const email = user.email?.toLowerCase();

  if (!email) {
    throw new Error("Authenticated user does not have an email address.");
  }

  const role = isConfiguredAdminEmail(email) ? "admin" : "user";
  
  // Use admin client if service role key is available (bypasses RLS), otherwise fallback to server client
  const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createSupabaseAdminClient()
    : await createSupabaseServerClient();

  // Fetch existing profile to handle coalesce for full_name and conditionally update role
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  const existing = existingProfile as { full_name: string | null; role: "user" | "admin" } | null;
  const fullNameValue = existing?.full_name || getDisplayName(user);
  const finalRole = existing?.role === "admin" || role === "admin" ? "admin" : "user";

  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      email,
      full_name: fullNameValue,
      phone: typeof user.user_metadata?.phone === "string" ? user.user_metadata.phone : null,
      role: finalRole,
      updated_at: new Date().toISOString(),
    })
    .select("id, email, full_name, phone, role, created_at, updated_at")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as PortalProfile;
}

export async function getCurrentSessionProfile() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { user: null, profile: null };
  }

  const profile = await ensureProfileForUser(user);
  return { user, profile };
}

export async function requireCurrentUser() {
  const { user, profile } = await getCurrentSessionProfile();

  if (!user || !profile) {
    throw new Error("Please log in to continue.");
  }

  return { user, profile };
}

export async function requireAdminUser() {
  const { user, profile } = await requireCurrentUser();

  if (profile.role !== "admin") {
    throw new Error("Admin access is required.");
  }

  return { user, profile };
}
