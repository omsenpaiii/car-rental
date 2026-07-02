"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { Inbox, LockKeyhole, Plus, RefreshCw } from "lucide-react";

import { useAuth } from "@/components/portal/auth-provider";
import {
  Theme5AuthModal,
  Theme5EmptyState,
  Theme5Shell,
  theme5Button,
  theme5SecondaryButton,
} from "@/components/theme5/theme5-ui";
import type { EnquiryRow, VehicleListingRow } from "@/lib/portal-listings";

type AccountPayload = {
  listings: VehicleListingRow[];
  enquiries: EnquiryRow[];
};

export default function Theme5AccountPage() {
  const { user, profile, isLoading, refresh } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [payload, setPayload] = useState<AccountPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const loadAccount = async () => {
    if (!user) return;
    setIsFetching(true);
    setError(null);
    try {
      const response = await fetch("/api/account/portal", { cache: "no-store" });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "Unable to load account.");
      setPayload({
        listings: Array.isArray(body.listings) ? body.listings : [],
        enquiries: Array.isArray(body.enquiries) ? body.enquiries : [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load account.");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    void loadAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <Theme5Shell>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-[8px] bg-[#07111f] p-6 text-white sm:p-8">
          <h1 className="font-heading text-4xl font-black uppercase sm:text-6xl">Your Phillips account</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
            Track submitted vehicle listings, rental requests, sale enquiries, and rent-to-own interest.
          </p>
        </section>

        {!isLoading && !user ? (
          <section className="mt-8 rounded-[8px] border border-[#dfe7f3] bg-white p-8 text-center">
            <LockKeyhole className="mx-auto size-10 text-[#1157d9]" />
            <h2 className="mt-4 text-2xl font-black text-[#10213f]">Log in to view account</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-7 text-[#60728d]">
              Your dashboard shows real saved enquiries and owner listings from the Phillips portal.
            </p>
            <button type="button" onClick={() => setAuthOpen(true)} className={`${theme5Button} mt-6`}>
              Log in or register
            </button>
          </section>
        ) : null}

        {user ? (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[8px] border border-[#dfe7f3] bg-white p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-[#10213f]">Profile</h2>
                  <p className="mt-1 text-sm font-semibold text-[#60728d]">{profile?.email}</p>
                </div>
                <button type="button" onClick={() => void loadAccount()} className={theme5SecondaryButton}>
                  <RefreshCw size={15} />
                  Refresh
                </button>
              </div>
              {error ? <p className="mt-4 rounded-[6px] bg-red-50 px-3 py-2 text-sm font-bold text-red-700">{error}</p> : null}
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Stat label="Listings" value={payload?.listings.length ?? 0} />
                <Stat label="Enquiries" value={payload?.enquiries.length ?? 0} />
              </div>
              <Link href="/theme5/list-your-car" className={`${theme5Button} mt-6 w-full`}>
                <Plus size={16} />
                List another car
              </Link>
            </div>

            <div className="grid gap-6">
              <Panel title="My listings" empty="No listings yet. List a car to start receiving requests.">
                {(payload?.listings ?? []).map((listing) => (
                  <div key={listing.id} className="rounded-[8px] border border-[#dfe7f3] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-black text-[#10213f]">
                          {listing.year} {listing.make} {listing.model}
                        </h3>
                        <p className="mt-1 text-xs font-bold text-[#60728d]">
                          {listing.body_type || "Vehicle"} · {listing.fuel_type} · {listing.odometer?.toLocaleString() ?? "No"} km
                        </p>
                      </div>
                      <span className="rounded-full bg-[#eef5ff] px-3 py-1 text-xs font-black uppercase text-[#1157d9]">
                        {listing.status.replace("_", " ")}
                      </span>
                    </div>
                    <p className="mt-3 text-xs font-semibold text-[#60728d]">
                      {listing.enable_rent ? "Rent " : ""}{listing.enable_direct_sale ? "Buy " : ""}{listing.enable_rent_to_own ? "RTO" : ""}
                    </p>
                  </div>
                ))}
              </Panel>

              <Panel title="My enquiries" empty="No saved enquiries yet. Browse cars and submit a rent, buy, or RTO request.">
                {(payload?.enquiries ?? []).map((enquiry) => (
                  <div key={enquiry.id} className="rounded-[8px] border border-[#dfe7f3] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-black capitalize text-[#10213f]">
                          {enquiry.mode.replace("_", " ")} enquiry
                        </h3>
                        <p className="mt-1 text-xs font-bold text-[#60728d]">
                          {new Date(enquiry.created_at).toLocaleDateString()} · {enquiry.delivery_location || "Location pending"}
                        </p>
                      </div>
                      <span className="rounded-full bg-[#fff4d6] px-3 py-1 text-xs font-black uppercase text-[#9a6b00]">
                        {enquiry.status}
                      </span>
                    </div>
                    {enquiry.message ? <p className="mt-3 text-sm leading-6 text-[#60728d]">{enquiry.message}</p> : null}
                  </div>
                ))}
              </Panel>
            </div>
          </section>
        ) : null}

        {user && isFetching ? (
          <p className="mt-4 text-sm font-bold text-[#60728d]">Refreshing account data...</p>
        ) : null}
      </main>
      <Theme5AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuthenticated={() => void refresh()} />
    </Theme5Shell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[8px] bg-[#f4f8fe] p-4">
      <div className="text-3xl font-black text-[#10213f]">{value}</div>
      <div className="text-xs font-black uppercase tracking-normal text-[#60728d]">{label}</div>
    </div>
  );
}

function Panel({
  title,
  empty,
  children,
}: {
  title: string;
  empty: string;
  children: ReactNode;
}) {
  const hasChildren = Array.isArray(children) ? children.length > 0 : Boolean(children);
  return (
    <div className="rounded-[8px] border border-[#dfe7f3] bg-white p-5">
      <h2 className="text-2xl font-black text-[#10213f]">{title}</h2>
      <div className="mt-4 grid gap-3">
        {hasChildren ? children : <Theme5EmptyState title={title} body={empty} />}
      </div>
      {!hasChildren ? (
        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#60728d]">
          <Inbox size={15} />
          Nothing here yet.
        </div>
      ) : null}
    </div>
  );
}
