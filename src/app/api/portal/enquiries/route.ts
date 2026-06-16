import { NextResponse } from "next/server";

import { createVehicleEnquiry, getPortalErrorMessage } from "@/lib/portal-listings.server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const enquiry = await createVehicleEnquiry(await request.json());
    return NextResponse.json({ enquiry }, { status: 201 });
  } catch (error) {
    const message = getPortalErrorMessage(error);
    const status = message.includes("log in") ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
