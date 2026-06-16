import "server-only";

import type { User } from "@supabase/supabase-js";

import { isConfiguredAdminEmail } from "@/lib/admin";
import { getPortalPool } from "@/lib/portal-db.server";
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
  const pool = getPortalPool();

  const result = await pool.query<PortalProfile>(
    `insert into public.profiles (
      id,
      email,
      full_name,
      phone,
      role
    ) values ($1, $2, $3, $4, $5)
    on conflict (id) do update set
      email = excluded.email,
      full_name = coalesce(public.profiles.full_name, excluded.full_name),
      role = case
        when excluded.role = 'admin' then 'admin'
        else public.profiles.role
      end,
      updated_at = timezone('utc', now())
    returning id, email, full_name, phone, role, created_at, updated_at`,
    [
      user.id,
      email,
      getDisplayName(user),
      typeof user.user_metadata?.phone === "string" ? user.user_metadata.phone : null,
      role,
    ]
  );

  return result.rows[0];
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
