import { NextResponse } from "next/server";

import { getPortalErrorMessage, listAccountPortalData } from "@/lib/portal-listings.server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await listAccountPortalData());
  } catch (error) {
    const message = getPortalErrorMessage(error);
    return NextResponse.json({ error: message }, { status: message.includes("log in") ? 401 : 500 });
  }
}
