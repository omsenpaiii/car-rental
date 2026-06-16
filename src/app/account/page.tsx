"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Car, Inbox, Loader2 } from "lucide-react";

import { AuthPanel } from "@/components/portal/auth-panel";
import { useAuth } from "@/components/portal/auth-provider";
import type { EnquiryRow, VehicleListingRow } from "@/lib/portal-listings";

type AccountPayload = {
  listings: VehicleListingRow[];
  enquiries: EnquiryRow[];
};

export default function AccountPage() {
  const { user, profile, isLoading, refresh } = useAuth();
  const [payload, setPayload] = useState<AccountPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    if (!user) return;

    let active = true;
    const timeout = window.setTimeout(() => {
      setIsLoadingData(true);
      fetch("/api/account/portal", { cache: "no-store" })
        .then(async (response) => {
          const body = await response.json();
          if (!response.ok) throw new Error(body.error ?? "Unable to load account.");
          return body as AccountPayload;
        })
        .then((body) => {
          if (active) setPayload(body);
        })
        .catch((err) => {
          if (active) setError(err instanceof Error ? err.message : "Unable to load account.");
        })
        .finally(() => {
          if (active) setIsLoadingData(false);
        });
    }, 0);

    return () => {
      active = false;
      window.clearTimeout(timeout);
    };
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-turo-purple">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-md px-4 py-28">
        <AuthPanel onAuthenticated={() => void refresh()} />
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 border-b border-gray-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-turo-purple">
            Account
          </p>
          <h1 className="mt-2 text-3xl font-black text-gray-950">
            {profile?.full_name || profile?.email}
          </h1>
          <p className="mt-2 text-sm font-medium text-gray-500">
            Manage real listings and enquiries for Phillips Car Rental Melbourne.
          </p>
        </div>
        {profile?.role === "admin" ? (
          <Link
            href="/admin"
            className="rounded-full bg-turo-purple px-5 py-3 text-xs font-black text-white shadow-lg shadow-turo-purple/20"
          >
            Open admin
          </Link>
        ) : null}
      </div>

      {error ? (
        <p className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-bold text-red-600">
          {error}
        </p>
      ) : null}

      {isLoadingData ? (
        <div className="mt-10 flex items-center gap-2 text-sm font-bold text-gray-500">
          <Loader2 className="size-4 animate-spin" />
          Loading your portal data
        </div>
      ) : null}

      <section className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Car className="size-5 text-turo-purple" />
            <h2 className="text-lg font-black text-gray-950">My listings</h2>
          </div>
          <div className="mt-5 divide-y divide-gray-100">
            {(payload?.listings ?? []).length ? (
              payload?.listings.map((listing) => (
                <div key={listing.id} className="py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-black text-gray-950">
                        {listing.year} {listing.make} {listing.model}
                      </h3>
                      <p className="mt-1 text-xs font-medium text-gray-500">
                        {listing.location} · {listing.enable_direct_sale ? "Sale " : ""}
                        {listing.enable_rent ? "Rental " : ""}
                        {listing.enable_rent_to_own ? "RTO" : ""}
                      </p>
                    </div>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-black uppercase text-gray-600">
                      {listing.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-8 text-sm font-medium text-gray-500">
                No listings yet. Use “Lend your car” or “Sell your car” from the home page.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Inbox className="size-5 text-turo-purple" />
            <h2 className="text-lg font-black text-gray-950">My enquiries</h2>
          </div>
          <div className="mt-5 divide-y divide-gray-100">
            {(payload?.enquiries ?? []).length ? (
              payload?.enquiries.map((enquiry) => (
                <div key={enquiry.id} className="py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-black capitalize text-gray-950">
                        {enquiry.mode.replace("_", " ")} request
                      </h3>
                      <p className="mt-1 text-xs font-medium text-gray-500">
                        {enquiry.requester_name} · {new Date(enquiry.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="rounded-full bg-turo-light px-3 py-1 text-[10px] font-black uppercase text-turo-purple">
                      {enquiry.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-8 text-sm font-medium text-gray-500">
                No enquiries yet. Browse cars and submit a real rental, sale, or rent-to-own enquiry.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
