"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Archive, CheckCircle2, Loader2, Plus, ShieldAlert, XCircle } from "lucide-react";

import { AuthPanel } from "@/components/portal/auth-panel";
import { useAuth } from "@/components/portal/auth-provider";
import type { EnquiryRow, ListingStatus, VehicleListingRow } from "@/lib/portal-listings";

type AdminPayload = {
  listings: VehicleListingRow[];
  enquiries: EnquiryRow[];
  summary: {
    pendingListings: number;
    approvedInventory: number;
    archivedItems: number;
    newEnquiries: number;
  };
};

const emptyListing = {
  make: "",
  model: "",
  year: "2024",
  location: "Melbourne, VIC",
  pricePerDay: "95",
  enableRent: true,
  enableRentToOwn: false,
  rentToOwnPrice: "42000",
  rentToOwnMonths: "36",
  enableDirectSale: false,
  salePrice: "45000",
  contactName: "Phillips Car Rental",
  contactEmail: "booking@phillipscarrental.com.au",
  contactPhone: "1300 315 275",
  imageUrl: "",
};

export default function AdminPage() {
  const { user, profile, isLoading, refresh } = useAuth();
  const [payload, setPayload] = useState<AdminPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [listingForm, setListingForm] = useState(emptyListing);

  const loadAdmin = async () => {
    setIsBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/portal", { cache: "no-store" });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "Unable to load admin portal.");
      setPayload(body);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load admin portal.");
    } finally {
      setIsBusy(false);
    }
  };

  useEffect(() => {
    if (profile?.role !== "admin") return;

    const timeout = window.setTimeout(() => {
      void loadAdmin();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [profile?.role]);

  const cards = useMemo(
    () => [
      ["Pending listings", payload?.summary.pendingListings ?? 0],
      ["New enquiries", payload?.summary.newEnquiries ?? 0],
      ["Approved inventory", payload?.summary.approvedInventory ?? 0],
      ["Archived", payload?.summary.archivedItems ?? 0],
    ],
    [payload]
  );

  const action = async (id: string, status: ListingStatus) => {
    setIsBusy(true);
    try {
      const response = await fetch("/api/admin/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update_listing_status", id, status }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "Action failed.");
      await loadAdmin();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Action failed.");
    } finally {
      setIsBusy(false);
    }
  };

  const createListing = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_listing",
          listing: {
            ...listingForm,
            year: Number(listingForm.year),
            pricePerDay: listingForm.enableRent ? Number(listingForm.pricePerDay) : null,
            rentToOwnPrice: listingForm.enableRentToOwn ? Number(listingForm.rentToOwnPrice) : null,
            rentToOwnMonths: listingForm.enableRentToOwn ? Number(listingForm.rentToOwnMonths) : null,
            salePrice: listingForm.enableDirectSale ? Number(listingForm.salePrice) : null,
          },
        }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "Unable to create listing.");
      setListingForm(emptyListing);
      await loadAdmin();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create listing.");
    } finally {
      setIsBusy(false);
    }
  };

  if (isLoading) {
    return <div className="flex min-h-[70vh] items-center justify-center text-turo-purple"><Loader2 className="size-6 animate-spin" /></div>;
  }

  if (!user) {
    return <main className="mx-auto max-w-md px-4 py-28"><AuthPanel onAuthenticated={() => void refresh()} /></main>;
  }

  if (profile?.role !== "admin") {
    return (
      <main className="mx-auto max-w-2xl px-4 py-28 text-center">
        <ShieldAlert className="mx-auto size-12 text-turo-purple" />
        <h1 className="mt-4 text-3xl font-black text-gray-950">Admin access required</h1>
        <p className="mt-2 text-sm font-medium text-gray-500">
          Your account is active, but it is not listed in `ADMIN_EMAILS`.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4 border-b border-gray-200 pb-8">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-turo-purple">Admin</p>
          <h1 className="mt-2 text-3xl font-black text-gray-950">Phillips Car Rental Portal</h1>
          <p className="mt-2 text-sm font-medium text-gray-500">
            Approve host cars, create Phillips-owned inventory, and monitor enquiries.
          </p>
        </div>
        {isBusy ? <Loader2 className="size-5 animate-spin text-turo-purple" /> : null}
      </div>

      {error ? <p className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-bold text-red-600">{error}</p> : null}

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-wider text-gray-400">{label}</p>
            <p className="mt-2 text-3xl font-black text-gray-950">{value}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-5">
            <h2 className="text-lg font-black text-gray-950">Listings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-gray-50 text-xs font-black uppercase tracking-wider text-gray-400">
                <tr>
                  <th className="px-5 py-3">Vehicle</th>
                  <th className="px-5 py-3">Owner</th>
                  <th className="px-5 py-3">Modes</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(payload?.listings ?? []).map((listing) => (
                  <tr key={listing.id}>
                    <td className="px-5 py-4 font-bold text-gray-950">
                      {listing.year} {listing.make} {listing.model}
                      <p className="text-xs font-medium text-gray-500">{listing.location}</p>
                    </td>
                    <td className="px-5 py-4 text-xs font-medium text-gray-500">
                      {listing.owner_display_name}<br />{listing.owner_email}
                    </td>
                    <td className="px-5 py-4 text-xs font-bold text-gray-600">
                      {listing.enable_rent ? "Rent " : ""}{listing.enable_rent_to_own ? "RTO " : ""}{listing.enable_direct_sale ? "Sale" : ""}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-black uppercase text-gray-600">
                        {listing.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => action(listing.id, "approved")} className="rounded-full bg-green-50 p-2 text-green-700"><CheckCircle2 className="size-4" /></button>
                        <button onClick={() => action(listing.id, "rejected")} className="rounded-full bg-red-50 p-2 text-red-700"><XCircle className="size-4" /></button>
                        <button onClick={() => action(listing.id, "archived")} className="rounded-full bg-gray-100 p-2 text-gray-700"><Archive className="size-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <form onSubmit={createListing} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <Plus className="size-5 text-turo-purple" />
            <h2 className="text-lg font-black text-gray-950">Create inventory</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {(["make", "model", "year", "location", "pricePerDay", "imageUrl"] as const).map((field) => (
              <input
                key={field}
                value={listingForm[field]}
                onChange={(event) => setListingForm({ ...listingForm, [field]: event.target.value })}
                placeholder={field}
                className="rounded-2xl border border-gray-200 px-4 py-3 text-sm font-semibold outline-none focus:border-turo-purple"
              />
            ))}
            <label className="flex items-center gap-2 text-xs font-bold text-gray-700">
              <input type="checkbox" checked={listingForm.enableRentToOwn} onChange={(event) => setListingForm({ ...listingForm, enableRentToOwn: event.target.checked })} />
              Rent-to-own
            </label>
            <label className="flex items-center gap-2 text-xs font-bold text-gray-700">
              <input type="checkbox" checked={listingForm.enableDirectSale} onChange={(event) => setListingForm({ ...listingForm, enableDirectSale: event.target.checked })} />
              Direct sale
            </label>
            <button disabled={isBusy} className="mt-2 rounded-2xl bg-turo-purple px-5 py-3 text-sm font-black text-white disabled:opacity-60">
              Create approved listing
            </button>
          </div>
        </form>
      </section>

      <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-black text-gray-950">Enquiries</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {(payload?.enquiries ?? []).map((enquiry) => (
            <div key={enquiry.id} className="rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-black capitalize text-gray-950">{enquiry.mode.replace("_", " ")}</p>
                <span className="rounded-full bg-turo-light px-3 py-1 text-[10px] font-black uppercase text-turo-purple">{enquiry.status}</span>
              </div>
              <p className="mt-2 text-xs font-medium text-gray-500">
                {enquiry.requester_name} · {enquiry.requester_email} · {enquiry.requester_phone}
              </p>
              {enquiry.message ? <p className="mt-2 text-xs leading-relaxed text-gray-600">{enquiry.message}</p> : null}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
