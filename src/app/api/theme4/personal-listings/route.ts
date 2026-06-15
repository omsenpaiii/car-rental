import { NextResponse } from "next/server";

import {
  createPersonalCarListing,
  listPersonalCarListings,
} from "@/lib/personal-car-listings.server";
import { getPersonalListingValidationMessage } from "@/lib/personal-car-listings";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const listings = await listPersonalCarListings();
    return NextResponse.json({ listings });
  } catch (error) {
    console.error("Failed to load personal car listings", error);
    return NextResponse.json(
      { error: "Unable to load personal car listings right now." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const listing = await createPersonalCarListing(body);
    return NextResponse.json({ listing }, { status: 201 });
  } catch (error) {
    const message = getPersonalListingValidationMessage(error);
    const status = message.includes("required") || message.includes("check") ? 400 : 500;

    if (status === 500) {
      console.error("Failed to create personal car listing", error);
    }

    return NextResponse.json({ error: message }, { status });
  }
}
