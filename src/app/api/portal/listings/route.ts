import { NextResponse } from "next/server";

import {
  createUserVehicleListing,
  getPortalErrorMessage,
  listApprovedVehicleCards,
} from "@/lib/portal-listings.server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const listings = await listApprovedVehicleCards();
    return NextResponse.json({ listings });
  } catch (error) {
    console.error("Failed to load vehicle listings", error);
    return NextResponse.json({ error: "Unable to load vehicle listings." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const listing = await createUserVehicleListing(await request.json());
    return NextResponse.json({ listing }, { status: 201 });
  } catch (error) {
    const message = getPortalErrorMessage(error);
    const status = message.includes("log in") ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
