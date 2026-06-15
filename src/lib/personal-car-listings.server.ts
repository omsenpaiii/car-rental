import "server-only";

import { Pool } from "pg";

import {
  mapPersonalListingRowToCar,
  sanitizePersonalCarListingInput,
  toPersonalCarInsert,
  type PersonalCarListingInput,
  type PersonalCarListingRow,
} from "@/lib/personal-car-listings";

declare global {
  var __phillipsPersonalCarsPool: Pool | undefined;
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

function getPool() {
  if (!globalThis.__phillipsPersonalCarsPool) {
    globalThis.__phillipsPersonalCarsPool = new Pool({
      connectionString: getDatabaseUrl(),
      ssl: { rejectUnauthorized: false },
      max: 5,
    });
  }

  return globalThis.__phillipsPersonalCarsPool;
}

export async function listPersonalCarListingRows() {
  const pool = getPool();
  const result = await pool.query<PersonalCarListingRow>(
    `select
      id,
      make,
      model,
      year,
      location,
      price_per_day,
      enable_rent_to_own,
      rent_to_own_price,
      rent_to_own_months,
      status,
      created_at
    from public.personal_car_listings
    order by created_at desc`
  );

  return result.rows;
}

export async function listPersonalCarListings() {
  const rows = await listPersonalCarListingRows();
  return rows.map(mapPersonalListingRowToCar);
}

export async function createPersonalCarListing(input: unknown) {
  const parsed = sanitizePersonalCarListingInput(input);
  const values = toPersonalCarInsert(parsed);
  const pool = getPool();

  const result = await pool.query<PersonalCarListingRow>(
    `insert into public.personal_car_listings (
      make,
      model,
      year,
      location,
      price_per_day,
      enable_rent_to_own,
      rent_to_own_price,
      rent_to_own_months
    ) values ($1, $2, $3, $4, $5, $6, $7, $8)
    returning
      id,
      make,
      model,
      year,
      location,
      price_per_day,
      enable_rent_to_own,
      rent_to_own_price,
      rent_to_own_months,
      status,
      created_at`,
    [
      values.make,
      values.model,
      values.year,
      values.location,
      values.price_per_day,
      values.enable_rent_to_own,
      values.rent_to_own_price,
      values.rent_to_own_months,
    ]
  );

  return mapPersonalListingRowToCar(result.rows[0]);
}

export function buildPersonalListingPayload(input: PersonalCarListingInput) {
  return toPersonalCarInsert(input);
}
