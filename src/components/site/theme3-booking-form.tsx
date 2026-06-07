"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, CarFront, MapPin } from "lucide-react";

import { bookingFormDefaults, type FleetCategory } from "@/lib/site-data";

function nextDate(offset: number) {
  const value = new Date();
  value.setDate(value.getDate() + offset);
  return value.toISOString().slice(0, 10);
}

const vehicleOptions: Array<{ label: string; category: FleetCategory }> = [
  { label: "Sedan", category: "Sedan" },
  { label: "SUV", category: "SUV" },
  { label: "Hatch", category: "Hatchback" },
  { label: "Mover", category: "People Mover" },
];

export function Theme3BookingForm() {
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
    <div className="rounded-[28px] border border-[#eceaff] bg-white p-5 shadow-[0_28px_80px_rgba(92,72,255,0.12)] sm:p-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {vehicleOptions.map((option) => {
          const isActive = category === option.category;
          return (
            <button
              key={option.label}
              type="button"
              onClick={() => setCategory(option.category)}
              className={
                isActive
                  ? "rounded-[18px] border border-[#5c48ff] bg-[#f3f1ff] p-3 text-left"
                  : "rounded-[18px] border border-[#eceaff] bg-[#faf9ff] p-3 text-left transition-colors hover:border-[#c9c2ff]"
              }
            >
              <div className="flex h-14 items-center justify-center rounded-[16px] bg-white text-[#b7b7c9]">
                <CarFront className="size-7" />
              </div>
              <p className="mt-3 text-sm font-semibold text-[#202020]">{option.label}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid gap-3">
        <label className="flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7b7b8d]">
          Pickup Location
          <div className="flex h-12 items-center gap-2 rounded-[16px] border border-[#eceaff] bg-[#faf9ff] px-4">
            <MapPin className="size-4 shrink-0 text-[#5c48ff]" />
            <select
              value={pickupLocation}
              onChange={(event) => setPickupLocation(event.target.value)}
              className="w-full min-w-0 bg-transparent text-sm text-[#2f2f39] outline-none"
            >
              {bookingFormDefaults.locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label className="flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7b7b8d]">
          Return Location
          <div className="flex h-12 items-center gap-2 rounded-[16px] border border-[#eceaff] bg-[#faf9ff] px-4">
            <MapPin className="size-4 shrink-0 text-[#5c48ff]" />
            <select
              value={dropoffLocation}
              onChange={(event) => setDropoffLocation(event.target.value)}
              className="w-full min-w-0 bg-transparent text-sm text-[#2f2f39] outline-none"
            >
              {bookingFormDefaults.locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7b7b8d]">
            Pickup Date
            <div className="flex h-12 items-center gap-2 rounded-[16px] border border-[#eceaff] bg-[#faf9ff] px-4">
              <CalendarDays className="size-4 shrink-0 text-[#5c48ff]" />
              <input
                type="date"
                value={pickupDate}
                onChange={(event) => setPickupDate(event.target.value)}
                className="w-full bg-transparent text-sm text-[#2f2f39] outline-none"
              />
            </div>
          </label>

          <label className="flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7b7b8d]">
            Return Date
            <div className="flex h-12 items-center gap-2 rounded-[16px] border border-[#eceaff] bg-[#faf9ff] px-4">
              <CalendarDays className="size-4 shrink-0 text-[#5c48ff]" />
              <input
                type="date"
                value={dropoffDate}
                onChange={(event) => setDropoffDate(event.target.value)}
                className="w-full bg-transparent text-sm text-[#2f2f39] outline-none"
              />
            </div>
          </label>
        </div>
      </div>

      <button
        type="button"
        onClick={submitSearch}
        className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-[16px] bg-[#5c48ff] text-sm font-semibold text-white transition-colors hover:bg-[#4a38e0]"
      >
        Book now
      </button>
    </div>
  );
}
