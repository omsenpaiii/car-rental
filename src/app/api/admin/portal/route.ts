import { NextResponse } from "next/server";

import {
  createAdminVehicleListing,
  getAdminPortalData,
  getPortalErrorMessage,
  updateAdminListingStatus,
} from "@/lib/portal-listings.server";
import type { ListingStatus } from "@/lib/portal-listings";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const status = (url.searchParams.get("status") || "all") as ListingStatus | "all";
    return NextResponse.json(await getAdminPortalData(status));
  } catch (error) {
    const message = getPortalErrorMessage(error);
    return NextResponse.json(
      { error: message },
      { status: message.includes("Admin") ? 403 : message.includes("log in") ? 401 : 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = typeof body.action === "string" ? body.action : "";

    if (action === "create_listing") {
      const listing = await createAdminVehicleListing(body.listing);
      return NextResponse.json({ listing }, { status: 201 });
    }

    if (action === "update_listing_status") {
      const id = typeof body.id === "string" ? body.id : "";
      const status = body.status as ListingStatus;
      const listing = await updateAdminListingStatus(id, status);
      return NextResponse.json({ listing });
    }

    return NextResponse.json({ error: "Unsupported admin action." }, { status: 400 });
  } catch (error) {
    const message = getPortalErrorMessage(error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
