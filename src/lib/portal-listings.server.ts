import "server-only";

import {
  getListingValidationMessage,
  mapVehicleListingRowToCar,
  sanitizeVehicleListingInput,
  toVehicleListingInsert,
  type EnquiryRow,
  type ListingStatus,
  type VehicleListingRow,
} from "@/lib/portal-listings";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdminUser, requireCurrentUser } from "@/lib/portal-auth.server";

export async function listApprovedVehicleRows() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("vehicle_listings")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as VehicleListingRow[];
}

export async function listApprovedVehicleCards() {
  const rows = await listApprovedVehicleRows();
  return rows.map(mapVehicleListingRowToCar);
}

export async function getVisibleVehicleRow(id: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("vehicle_listings")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as VehicleListingRow | null;
}

export async function createUserVehicleListing(input: unknown) {
  const { user, profile } = await requireCurrentUser();
  const parsed = sanitizeVehicleListingInput(input);
  const supabase = await createSupabaseServerClient();
  const values = toVehicleListingInsert(
    {
      ...parsed,
      contactEmail: parsed.contactEmail || profile.email,
      contactName: parsed.contactName || profile.full_name || profile.email,
      contactPhone: parsed.contactPhone || profile.phone || "",
    },
    user.id,
    "pending_review"
  );

  const { data, error } = await supabase
    .from("vehicle_listings")
    .insert(values)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapVehicleListingRowToCar(data as VehicleListingRow);
}

export async function listAccountPortalData() {
  const { user, profile } = await requireCurrentUser();
  const supabase = await createSupabaseServerClient();

  const [{ data: listings, error: listingError }, { data: enquiries, error: enquiryError }] =
    await Promise.all([
      supabase
        .from("vehicle_listings")
        .select("*")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("enquiries")
        .select("*")
        .or(`requester_id.eq.${user.id},owner_id.eq.${user.id}`)
        .order("created_at", { ascending: false }),
    ]);

  if (listingError) throw new Error(listingError.message);
  if (enquiryError) throw new Error(enquiryError.message);

  return {
    profile,
    listings: (listings ?? []) as VehicleListingRow[],
    enquiries: (enquiries ?? []) as EnquiryRow[],
  };
}

export async function createVehicleEnquiry(input: unknown) {
  const { user, profile } = await requireCurrentUser();
  const body = input as Record<string, unknown>;
  const listingId = typeof body.listingId === "string" ? body.listingId : "";
  const mode = body.mode === "sale" || body.mode === "rent_to_own" ? body.mode : "rent";

  if (!listingId) {
    throw new Error("Listing is required.");
  }

  const supabase = await createSupabaseServerClient();
  const listing = await getVisibleVehicleRow(listingId);

  if (!listing) {
    throw new Error("Listing not found.");
  }

  const requesterName =
    typeof body.requesterName === "string" && body.requesterName.trim()
      ? body.requesterName.trim()
      : profile.full_name || profile.email;
  const requesterPhone =
    typeof body.requesterPhone === "string" && body.requesterPhone.trim()
      ? body.requesterPhone.trim()
      : profile.phone || "";

  if (!requesterPhone) {
    throw new Error("A contact phone number is required.");
  }

  const { data, error } = await supabase
    .from("enquiries")
    .insert({
      listing_id: listing.id,
      requester_id: user.id,
      owner_id: listing.owner_id,
      mode,
      requester_name: requesterName,
      requester_email: profile.email,
      requester_phone: requesterPhone,
      pickup_date: typeof body.pickupDate === "string" ? body.pickupDate : null,
      return_date: typeof body.returnDate === "string" ? body.returnDate : null,
      delivery_location: typeof body.deliveryLocation === "string" ? body.deliveryLocation : null,
      message: typeof body.message === "string" ? body.message.trim() : null,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as EnquiryRow;
}

export async function getAdminPortalData(status?: ListingStatus | "all") {
  await requireAdminUser();
  const supabase = await createSupabaseServerClient();

  let listingQuery = supabase
    .from("vehicle_listings")
    .select("*")
    .order("created_at", { ascending: false });

  if (status && status !== "all") {
    listingQuery = listingQuery.eq("status", status);
  }

  const [{ data: listings, error: listingError }, { data: enquiries, error: enquiryError }] =
    await Promise.all([
      listingQuery,
      supabase.from("enquiries").select("*").order("created_at", { ascending: false }),
    ]);

  if (listingError) throw new Error(listingError.message);
  if (enquiryError) throw new Error(enquiryError.message);

  const listingRows = (listings ?? []) as VehicleListingRow[];
  const enquiryRows = (enquiries ?? []) as EnquiryRow[];

  return {
    listings: listingRows,
    enquiries: enquiryRows,
    summary: {
      pendingListings: listingRows.filter((listing) => listing.status === "pending_review").length,
      approvedInventory: listingRows.filter((listing) => listing.status === "approved").length,
      archivedItems: listingRows.filter((listing) => listing.status === "archived").length,
      newEnquiries: enquiryRows.filter((enquiry) => enquiry.status === "new").length,
    },
  };
}

export async function updateAdminListingStatus(id: string, status: ListingStatus) {
  await requireAdminUser();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("vehicle_listings")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data as VehicleListingRow;
}

export async function createAdminVehicleListing(input: unknown) {
  await requireAdminUser();
  const parsed = sanitizeVehicleListingInput(input);
  const supabase = await createSupabaseServerClient();
  const values = toVehicleListingInsert(parsed, null, "approved");

  const { data, error } = await supabase
    .from("vehicle_listings")
    .insert({ ...values, source: "phillips" })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return data as VehicleListingRow;
}

export function getPortalErrorMessage(error: unknown) {
  return getListingValidationMessage(error);
}
