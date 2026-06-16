import "server-only";

import {
  mapPersonalListingRowToCar,
  sanitizePersonalCarListingInput,
  toPersonalCarInsert,
  type PersonalCarListingInput,
  type PersonalCarListingRow,
} from "@/lib/personal-car-listings";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function listPersonalCarListingRows() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("personal_car_listings")
    .select(`
      id,
      make,
      model,
      year,
      location,
      price_per_day,
      enable_rent_to_own,
      rent_to_own_price,
      rent_to_own_months,
      enable_direct_sale,
      sale_price,
      status,
      created_at
    `)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as PersonalCarListingRow[];
}

export async function listPersonalCarListings() {
  const rows = await listPersonalCarListingRows();
  return rows.map(mapPersonalListingRowToCar);
}

export async function createPersonalCarListing(input: unknown) {
  const parsed = sanitizePersonalCarListingInput(input);
  const values = toPersonalCarInsert(parsed);
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("personal_car_listings")
    .insert({
      make: values.make,
      model: values.model,
      year: values.year,
      location: values.location,
      price_per_day: values.price_per_day,
      enable_rent_to_own: values.enable_rent_to_own,
      rent_to_own_price: values.rent_to_own_price,
      rent_to_own_months: values.rent_to_own_months,
      enable_direct_sale: values.enable_direct_sale,
      sale_price: values.sale_price,
    })
    .select(`
      id,
      make,
      model,
      year,
      location,
      price_per_day,
      enable_rent_to_own,
      rent_to_own_price,
      rent_to_own_months,
      enable_direct_sale,
      sale_price,
      status,
      created_at
    `)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapPersonalListingRowToCar(data as PersonalCarListingRow);
}

export function buildPersonalListingPayload(input: PersonalCarListingInput) {
  return toPersonalCarInsert(input);
}
