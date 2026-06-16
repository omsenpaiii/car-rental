import "server-only";

import { Pool } from "pg";

declare global {
  var __phillipsPortalPool: Pool | undefined;
}

function getDatabaseUrl() {
  const databaseUrl = process.env.SUPABASE_DB_URL;

  if (!databaseUrl) {
    throw new Error("SUPABASE_DB_URL is not configured.");
  }

  const parsed = new URL(databaseUrl);
  parsed.searchParams.delete("sslmode");

  return parsed.toString();
}

export function getPortalPool() {
  if (!globalThis.__phillipsPortalPool) {
    globalThis.__phillipsPortalPool = new Pool({
      connectionString: getDatabaseUrl(),
      ssl: { rejectUnauthorized: false },
      max: 5,
    });
  }

  return globalThis.__phillipsPortalPool;
}
