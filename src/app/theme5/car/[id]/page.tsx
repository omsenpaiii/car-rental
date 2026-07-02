"use client";

import Image from "next/image";
import { Suspense, useMemo, useState, type FormEvent } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  Fuel,
  Gauge,
  MapPin,
  PenTool,
  ShieldCheck,
  Users,
} from "lucide-react";

import {
  Theme5AuthModal,
  Theme5EmptyState,
  Theme5ModeTabs,
  Theme5Shell,
  theme5Button,
  theme5SecondaryButton,
  useTheme5Inventory,
} from "@/components/theme5/theme5-ui";
import { useAuth } from "@/components/portal/auth-provider";
import {
  formatMoney,
  getCarModePrice,
  getCarMonthlyRentToOwn,
  getModeUnit,
  isCarAvailableForMode,
  normalizeTheme5Mode,
  type Theme5Mode,
} from "@/lib/theme5";

function Theme5CarDetailContent() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, profile, refresh } = useAuth();
  const { cars, isLoading } = useTheme5Inventory();
  const car = cars.find((item) => item.id === params.id);
  const initialMode = normalizeTheme5Mode(searchParams.get("mode"));
  const [mode, setMode] = useState<Theme5Mode>(initialMode);
  const [pickupDate, setPickupDate] = useState("2026-07-15");
  const [returnDate, setReturnDate] = useState("2026-07-18");
  const [deliveryLocation, setDeliveryLocation] = useState("Host location");
  const [requesterPhone, setRequesterPhone] = useState(profile?.phone ?? "");
  const [message, setMessage] = useState("");
  const [authOpen, setAuthOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const availableModes = useMemo(() => {
    if (!car) return [];
    return (["rent", "sale", "rent_to_own"] as Theme5Mode[]).filter((item) =>
      isCarAvailableForMode(car, item)
    );
  }, [car]);

  if (!car && isLoading) {
    return (
      <Theme5Shell>
        <main className="mx-auto max-w-4xl px-4 py-20">
          <Theme5EmptyState title="Loading listing" body="Checking Phillips marketplace inventory." />
        </main>
      </Theme5Shell>
    );
  }

  if (!car) {
    return (
      <Theme5Shell>
        <main className="mx-auto max-w-4xl px-4 py-20">
          <Theme5EmptyState
            title="Listing not found"
            body="This car may still be under review, archived, or unavailable."
          />
        </main>
      </Theme5Shell>
    );
  }

  const activeMode = availableModes.includes(mode) ? mode : availableModes[0] ?? "rent";
  const price = getCarModePrice(car, activeMode);
  const rtoMonthly = getCarMonthlyRentToOwn(car);
  const rentDays = Math.max(
    1,
    Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / 86400000)
  );
  const serviceFee = Math.round(car.pricePerDay * rentDays * 0.12);
  const deliveryFee = deliveryLocation === "Host location" ? 0 : 40;
  const rentTotal = car.pricePerDay * rentDays + serviceFee + deliveryFee;
  const saleCommission = Math.round((car.salePrice ?? 0) * 0.05);
  const rtoDownPayment = car.downPayment ?? Math.round((car.rentToOwnPrice ?? 0) * 0.1);
  const detailFeatures = [car.bodyType, car.transmission, car.colour, ...car.features].filter(Boolean) as string[];

  const submitEnquiry = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    if (!user) {
      setAuthOpen(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/portal/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: car.id,
          mode: activeMode,
          pickupDate: activeMode === "rent" ? pickupDate : null,
          returnDate: activeMode === "rent" ? returnDate : null,
          deliveryLocation,
          requesterPhone: requesterPhone || profile?.phone || "",
          message,
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Unable to submit enquiry.");
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit enquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Theme5Shell>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <section>
            <div className="relative aspect-[16/9] overflow-hidden rounded-[8px] bg-[#eaf1fb]">
              <Image src={car.image} alt={car.name} fill priority sizes="(max-width: 1024px) 100vw, 70vw" className="object-cover" />
            </div>
            <div className="mt-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h1 className="font-heading text-4xl font-black uppercase leading-none text-[#10213f] sm:text-6xl">
                    {car.name}
                  </h1>
                  <p className="mt-3 flex items-center gap-2 text-sm font-bold text-[#60728d]">
                    <MapPin size={17} />
                    {car.location}
                  </p>
                </div>
                <div className="rounded-[8px] border border-[#dfe7f3] bg-white px-5 py-4 text-right">
                  <div className="text-3xl font-black text-[#10213f]">{formatMoney(price)}</div>
                  <div className="text-xs font-black uppercase tracking-normal text-[#60728d]">{getModeUnit(activeMode)}</div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  [Fuel, car.fuelType],
                  [Gauge, car.odometer ? `${car.odometer.toLocaleString()} km` : "Low km"],
                  [Users, `${car.seats} seats`],
                  [CalendarDays, `${car.year} model`],
                ].map(([Icon, label]) => {
                  const TypedIcon = Icon as typeof Fuel;
                  return (
                    <div key={label as string} className="rounded-[8px] border border-[#dfe7f3] bg-white p-4">
                      <TypedIcon className="text-[#1157d9]" size={20} />
                      <div className="mt-2 text-sm font-black text-[#10213f]">{label as string}</div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-[8px] border border-[#dfe7f3] bg-white p-6">
                <h2 className="text-2xl font-black text-[#10213f]">Vehicle details</h2>
                <p className="mt-3 text-sm leading-7 text-[#60728d]">{car.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {detailFeatures.map((feature) => (
                    <span key={feature} className="rounded-full bg-[#eef5ff] px-3 py-1 text-xs font-black text-[#1157d9]">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <aside className="h-fit rounded-[8px] border border-[#dfe7f3] bg-white p-5 shadow-[0_18px_60px_rgba(16,33,63,0.10)] lg:sticky lg:top-24">
            <Theme5ModeTabs value={activeMode} onChange={setMode} />
            <div className="mt-5 rounded-[8px] bg-[#f4f8fe] p-4">
              <div className="text-3xl font-black text-[#10213f]">{formatMoney(price)}</div>
              <div className="text-xs font-black uppercase tracking-normal text-[#60728d]">{getModeUnit(activeMode)}</div>
            </div>

            <form onSubmit={submitEnquiry} className="mt-5 grid gap-4">
              {activeMode === "rent" ? (
                <div className="grid grid-cols-2 gap-3">
                  <label className="grid gap-2 text-xs font-black uppercase tracking-normal text-[#60728d]">
                    Pickup
                    <input type="date" value={pickupDate} onChange={(event) => setPickupDate(event.target.value)} className="h-11 rounded-[6px] border border-[#dfe7f3] px-3 text-sm font-bold text-[#10213f]" />
                  </label>
                  <label className="grid gap-2 text-xs font-black uppercase tracking-normal text-[#60728d]">
                    Return
                    <input type="date" value={returnDate} min={pickupDate} onChange={(event) => setReturnDate(event.target.value)} className="h-11 rounded-[6px] border border-[#dfe7f3] px-3 text-sm font-bold text-[#10213f]" />
                  </label>
                </div>
              ) : null}

              <label className="grid gap-2 text-xs font-black uppercase tracking-normal text-[#60728d]">
                Pickup or inspection location
                <select value={deliveryLocation} onChange={(event) => setDeliveryLocation(event.target.value)} className="h-11 rounded-[6px] border border-[#dfe7f3] px-3 text-sm font-bold text-[#10213f]">
                  <option>Host location</option>
                  <option>Melbourne Airport</option>
                  <option>Melbourne CBD</option>
                  <option>Keysborough office</option>
                </select>
              </label>

              <div className="rounded-[8px] border border-[#dfe7f3] p-4 text-sm text-[#60728d]">
                {activeMode === "rent" ? (
                  <div className="grid gap-2">
                    <div className="flex justify-between"><span>{rentDays} days rental</span><strong>{formatMoney(car.pricePerDay * rentDays)}</strong></div>
                    <div className="flex justify-between"><span>Service fee</span><strong>{formatMoney(serviceFee)}</strong></div>
                    <div className="flex justify-between"><span>Delivery</span><strong>{formatMoney(deliveryFee)}</strong></div>
                    <div className="flex justify-between border-t border-[#dfe7f3] pt-2 text-[#10213f]"><span>Total estimate</span><strong>{formatMoney(rentTotal)}</strong></div>
                  </div>
                ) : activeMode === "sale" ? (
                  <div className="grid gap-2">
                    <div className="flex justify-between"><span>Purchase enquiry</span><strong>{formatMoney(car.salePrice ?? 0)}</strong></div>
                    <div className="flex justify-between"><span>Seller commission disclosure</span><strong>{formatMoney(saleCommission)}</strong></div>
                    <p className="text-xs leading-6">Buying creates a saved sale enquiry. Phillips follows up before title transfer or funds are arranged.</p>
                  </div>
                ) : (
                  <div className="grid gap-2">
                    <div className="flex justify-between"><span>Monthly estimate</span><strong>{formatMoney(rtoMonthly)}</strong></div>
                    <div className="flex justify-between"><span>Option deposit</span><strong>{formatMoney(rtoDownPayment)}</strong></div>
                    <p className="text-xs leading-6">RTO creates a saved enquiry for review before any agreement is issued.</p>
                  </div>
                )}
              </div>

              <label className="grid gap-2 text-xs font-black uppercase tracking-normal text-[#60728d]">
                Contact phone
                <input value={requesterPhone} onChange={(event) => setRequesterPhone(event.target.value)} placeholder="0400 000 000" className="h-11 rounded-[6px] border border-[#dfe7f3] px-3 text-sm font-bold text-[#10213f]" />
              </label>
              <label className="grid gap-2 text-xs font-black uppercase tracking-normal text-[#60728d]">
                Message
                <textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Tell the owner what you need..." className="min-h-24 rounded-[6px] border border-[#dfe7f3] px-3 py-3 text-sm font-bold text-[#10213f]" />
              </label>

              {error ? <p className="rounded-[6px] bg-red-50 px-3 py-2 text-xs font-bold text-red-700">{error}</p> : null}
              {success ? (
                <div className="rounded-[6px] bg-emerald-50 px-3 py-3 text-xs font-bold text-emerald-700">
                  <CheckCircle2 className="mb-1" size={18} />
                  Enquiry saved. Phillips will follow up from your account.
                </div>
              ) : null}

              <button disabled={isSubmitting} className={theme5Button}>
                <PenTool size={16} />
                {isSubmitting ? "Submitting..." : user ? "Submit enquiry" : "Log in to continue"}
              </button>
              {success ? (
                <button type="button" onClick={() => router.push("/theme5/account")} className={theme5SecondaryButton}>
                  View account
                </button>
              ) : null}
            </form>

            <div className="mt-5 flex gap-2 rounded-[8px] bg-[#fff7df] p-4 text-xs font-semibold leading-6 text-[#7c5900]">
              <ShieldCheck className="shrink-0" size={18} />
              Phillips records enquiries only. Insurance, finance, inspection, title transfer, and payment must be confirmed before handover.
            </div>
          </aside>
        </div>
      </main>
      <Theme5AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuthenticated={() => void refresh()} />
    </Theme5Shell>
  );
}

export default function Theme5CarDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7faff]" />}>
      <Theme5CarDetailContent />
    </Suspense>
  );
}
