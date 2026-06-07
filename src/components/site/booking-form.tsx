"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, CarFront, Clock3, MapPin } from "lucide-react";

import { bookingFormDefaults, type FleetCategory } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type BookingFormProps = {
  title?: string;
  compact?: boolean;
  showMapLink?: boolean;
  initialCategory?: FleetCategory;
};

function nextDate(offset: number) {
  const value = new Date();
  value.setDate(value.getDate() + offset);
  return value.toISOString().slice(0, 10);
}

export function BookingForm({
  title = "Book your car",
  compact = false,
  showMapLink = false,
  initialCategory = "Any",
}: BookingFormProps) {
  const router = useRouter();
  const defaultPickup = useMemo(() => bookingFormDefaults.locations[0], []);
  const [pickupLocation, setPickupLocation] = useState(defaultPickup);
  const [dropoffLocation, setDropoffLocation] = useState(defaultPickup);
  const [pickupDate, setPickupDate] = useState(nextDate(1));
  const [pickupTime, setPickupTime] = useState("10:00");
  const [dropoffDate, setDropoffDate] = useState(nextDate(4));
  const [dropoffTime, setDropoffTime] = useState("10:00");
  const [category, setCategory] = useState<FleetCategory>(initialCategory);

  const updateIfPresent =
    <T extends string>(setter: (value: T) => void) =>
    (value: string | null) => {
      if (value) {
        setter(value as T);
      }
    };

  const submitSearch = () => {
    const params = new URLSearchParams({
      pickupLocation,
      dropoffLocation,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
      category,
    });

    router.push(`/our-fleets?${params.toString()}`);
  };

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.38)] sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-slate-950">{title}</p>
          <p className="text-sm text-slate-500">Reserve a clean, road-ready vehicle in minutes.</p>
        </div>
        {showMapLink ? (
          <a href="#" className="text-sm font-semibold text-amber-500">
            View Locations Map
          </a>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="booking-field md:col-span-2">
          <label className="booking-label">Pickup Location</label>
          <div className="booking-icon-wrap">
            <MapPin className="size-4 text-amber-500" />
            <Select value={pickupLocation} onValueChange={updateIfPresent(setPickupLocation)}>
              <SelectTrigger className="booking-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {bookingFormDefaults.locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="booking-field md:col-span-2">
          <label className="booking-label">Drop Off Location</label>
          <div className="booking-icon-wrap">
            <MapPin className="size-4 text-amber-500" />
            <Select value={dropoffLocation} onValueChange={updateIfPresent(setDropoffLocation)}>
              <SelectTrigger className="booking-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {bookingFormDefaults.locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="booking-field">
          <label className="booking-label">Pickup Date</label>
          <div className="booking-icon-wrap">
            <CalendarDays className="size-4 text-amber-500" />
            <input
              className="booking-input"
              type="date"
              value={pickupDate}
              onChange={(event) => setPickupDate(event.target.value)}
            />
          </div>
        </div>

        <div className="booking-field">
          <label className="booking-label">Pickup Time</label>
          <div className="booking-icon-wrap">
            <Clock3 className="size-4 text-amber-500" />
            <Select value={pickupTime} onValueChange={updateIfPresent(setPickupTime)}>
              <SelectTrigger className="booking-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {bookingFormDefaults.times.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="booking-field">
          <label className="booking-label">Drop Off Date</label>
          <div className="booking-icon-wrap">
            <CalendarDays className="size-4 text-amber-500" />
            <input
              className="booking-input"
              type="date"
              value={dropoffDate}
              onChange={(event) => setDropoffDate(event.target.value)}
            />
          </div>
        </div>

        <div className="booking-field">
          <label className="booking-label">Drop Off Time</label>
          <div className="booking-icon-wrap">
            <Clock3 className="size-4 text-amber-500" />
            <Select value={dropoffTime} onValueChange={updateIfPresent(setDropoffTime)}>
              <SelectTrigger className="booking-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {bookingFormDefaults.times.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="booking-field xl:col-span-2">
          <label className="booking-label">Category</label>
          <div className="booking-icon-wrap">
            <CarFront className="size-4 text-amber-500" />
            <Select value={category} onValueChange={updateIfPresent<FleetCategory>(setCategory)}>
              <SelectTrigger className="booking-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {bookingFormDefaults.categories.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Flexible dates, clear daily rates, and no dead-end booking widgets.
        </p>
        <Button
          className="h-12 rounded-full bg-amber-400 px-6 text-sm font-semibold text-slate-950 hover:bg-amber-300"
          onClick={submitSearch}
        >
          {compact ? "Search" : "Search for a car"}
        </Button>
      </div>
    </div>
  );
}
