"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, MapPin } from "lucide-react";

import { bookingFormDefaults, type FleetCategory } from "@/lib/site-data";

function nextDate(offset: number) {
  const value = new Date();
  value.setDate(value.getDate() + offset);
  return value.toISOString().slice(0, 10);
}

export function Theme2BookingForm() {
  const router = useRouter();
  const defaultPickup = useMemo(() => bookingFormDefaults.locations[0], []);
  const [pickupLocation, setPickupLocation] = useState(defaultPickup);
  const [dropoffLocation, setDropoffLocation] = useState(defaultPickup);
  const [pickupDate, setPickupDate] = useState(nextDate(1));
  const [dropoffDate, setDropoffDate] = useState(nextDate(4));
  const [category, setCategory] = useState<FleetCategory>("Any");

  const submitSearch = () => {
    const params = new URLSearchParams({
      pickupLocation,
      dropoffLocation,
      pickupDate,
      dropoffDate,
      category,
      pickupTime: "09:00",
      dropoffTime: "09:00",
    });

    router.push(`/our-fleets?${params.toString()}`);
  };

  return (
    <div className="rounded-[10px] bg-white p-4 shadow-[0_20px_60px_rgba(245,87,87,0.12)] sm:p-6">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
        <label className="flex min-w-0 flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#808080]">
          Pick Up Location
          <div className="flex h-12 items-center gap-2 rounded-[6px] border border-[#f1d8d8] px-3">
            <MapPin className="size-4 shrink-0 text-[#f55757]" />
            <select
              value={pickupLocation}
              onChange={(event) => setPickupLocation(event.target.value)}
              className="w-full min-w-0 bg-transparent text-sm text-[#737373] outline-none"
            >
              {bookingFormDefaults.locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label className="flex min-w-0 flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#808080]">
          Return Location
          <div className="flex h-12 items-center gap-2 rounded-[6px] border border-[#f1d8d8] px-3">
            <MapPin className="size-4 shrink-0 text-[#f55757]" />
            <select
              value={dropoffLocation}
              onChange={(event) => setDropoffLocation(event.target.value)}
              className="w-full min-w-0 bg-transparent text-sm text-[#737373] outline-none"
            >
              {bookingFormDefaults.locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label className="flex min-w-0 flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#808080]">
          Pick Up Date
          <div className="flex h-12 items-center gap-2 rounded-[6px] border border-[#f1d8d8] px-3">
            <CalendarDays className="size-4 shrink-0 text-[#f55757]" />
            <input
              type="date"
              value={pickupDate}
              onChange={(event) => setPickupDate(event.target.value)}
              className="w-full bg-transparent text-sm text-[#737373] outline-none"
            />
          </div>
        </label>

        <label className="flex min-w-0 flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#808080]">
          Return Date
          <div className="flex h-12 items-center gap-2 rounded-[6px] border border-[#f1d8d8] px-3">
            <CalendarDays className="size-4 shrink-0 text-[#f55757]" />
            <input
              type="date"
              value={dropoffDate}
              onChange={(event) => setDropoffDate(event.target.value)}
              className="w-full bg-transparent text-sm text-[#737373] outline-none"
            />
          </div>
        </label>

        <label className="flex min-w-0 flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#808080]">
          Category
          <div className="flex h-12 items-center rounded-[6px] border border-[#f1d8d8] px-3">
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as FleetCategory)}
              className="w-full bg-transparent text-sm text-[#737373] outline-none"
            >
              {bookingFormDefaults.categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </label>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={submitSearch}
          className="inline-flex h-12 items-center justify-center rounded-[6px] bg-[#f55757] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#de4b4b]"
        >
          Search Car
        </button>
      </div>
    </div>
  );
}
