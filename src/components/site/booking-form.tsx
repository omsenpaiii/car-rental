"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, ChevronDown, MapPin } from "lucide-react";

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
  showMapLink = false,
  initialCategory = "Any",
}: BookingFormProps) {
  const router = useRouter();
  const defaultPickup = useMemo(() => bookingFormDefaults.locations[0], []);
  const [pickupLocation, setPickupLocation] = useState(defaultPickup);
  const [dropoffLocation, setDropoffLocation] = useState(defaultPickup);
  const [pickupDate, setPickupDate] = useState(nextDate(1));
  const [pickupTime, setPickupTime] = useState("09:00");
  const [dropoffDate, setDropoffDate] = useState(nextDate(4));
  const [dropoffTime, setDropoffTime] = useState("09:00");
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

  const timeToParts = (value: string) => {
    const [hour, minute] = value.split(":");
    return { hour, minute };
  };

  const pickupParts = timeToParts(pickupTime);
  const dropoffParts = timeToParts(dropoffTime);

  const updateTimePart = (
    current: string,
    setter: (value: string) => void,
    next: Partial<{ hour: string; minute: string }>
  ) => {
    const parts = timeToParts(current);
    setter(`${next.hour ?? parts.hour}:${next.minute ?? parts.minute}`);
  };

  const updateHour =
    (current: string, setter: (value: string) => void) =>
    (value: string | null) => {
      if (value) {
        updateTimePart(current, setter, { hour: value });
      }
    };

  const updateMinute =
    (current: string, setter: (value: string) => void) =>
    (value: string | null) => {
      if (value) {
        updateTimePart(current, setter, { minute: value });
      }
    };

  return (
    <div
      className="rounded-[20px] border border-white/90 bg-white bg-cover bg-center bg-no-repeat p-6 shadow-[0_20px_60px_rgba(19,33,68,0.12)] sm:p-10"
      style={{
        backgroundImage:
          "url('https://mobiscarrental.com.au/wp-content/uploads/2024/09/home4-car-book-bg1.png')",
      }}
    >
      <div className="grid gap-5 lg:grid-cols-12">
        <div className="booking-field lg:col-span-6">
          <label className="booking-label">Pickup Location</label>
          <div className="booking-icon-wrap relative">
            <MapPin className="size-4 text-[#727272]" />
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
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#272727]" />
          </div>
        </div>

        <div className="booking-field lg:col-span-6">
          <label className="booking-label">Drop Off Location</label>
          <div className="booking-icon-wrap relative">
            <MapPin className="size-4 text-[#727272]" />
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
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#272727]" />
          </div>
        </div>

        <div className="booking-field lg:col-span-3">
          <label className="booking-label">Pickup Date</label>
          <div className="booking-icon-wrap relative">
            <input
              className="booking-input"
              type="date"
              value={pickupDate}
              onChange={(event) => setPickupDate(event.target.value)}
            />
            <CalendarDays className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#272727]" />
          </div>
        </div>

        <div className="booking-field lg:col-span-3">
          <label className="booking-label">Pickup Time</label>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div className="booking-icon-wrap relative px-0">
              <Select
                value={pickupParts.hour}
                onValueChange={updateHour(pickupTime, setPickupTime)}
              >
                <SelectTrigger className="booking-trigger px-5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {bookingFormDefaults.hours.map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#272727]" />
            </div>
            <span className="text-[30px] font-light text-[#727272]">:</span>
            <div className="booking-icon-wrap relative px-0">
              <Select
                value={pickupParts.minute}
                onValueChange={updateMinute(pickupTime, setPickupTime)}
              >
                <SelectTrigger className="booking-trigger px-5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {bookingFormDefaults.minutes.map((minute) => (
                      <SelectItem key={minute} value={minute}>
                        {minute}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#272727]" />
            </div>
          </div>
        </div>

        <div className="booking-field lg:col-span-3">
          <label className="booking-label">Drop Off Date</label>
          <div className="booking-icon-wrap relative">
            <input
              className="booking-input"
              type="date"
              value={dropoffDate}
              onChange={(event) => setDropoffDate(event.target.value)}
            />
            <CalendarDays className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#272727]" />
          </div>
        </div>

        <div className="booking-field lg:col-span-3">
          <label className="booking-label">Drop Off Time</label>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div className="booking-icon-wrap relative px-0">
              <Select
                value={dropoffParts.hour}
                onValueChange={updateHour(dropoffTime, setDropoffTime)}
              >
                <SelectTrigger className="booking-trigger px-5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {bookingFormDefaults.hours.map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#272727]" />
            </div>
            <span className="text-[30px] font-light text-[#727272]">:</span>
            <div className="booking-icon-wrap relative px-0">
              <Select
                value={dropoffParts.minute}
                onValueChange={updateMinute(dropoffTime, setDropoffTime)}
              >
                <SelectTrigger className="booking-trigger px-5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {bookingFormDefaults.minutes.map((minute) => (
                      <SelectItem key={minute} value={minute}>
                        {minute}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#272727]" />
            </div>
          </div>
        </div>

        <div className="booking-field lg:col-span-12">
          <label className="booking-label">Category</label>
          <div className="booking-icon-wrap relative">
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
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#272727]" />
          </div>
        </div>
      </div>

      {title || showMapLink ? (
        <div className="mb-6 hidden items-center justify-between gap-4">
          <div>
            <p className="text-lg font-semibold text-slate-950">{title}</p>
          </div>
          {showMapLink ? (
            <a href="#" className="text-sm font-semibold text-[#11ac69]">
              View Locations Map
            </a>
          ) : null}
        </div>
      ) : null}

      <div className="mt-7">
        <Button
          className="h-[64px] w-full rounded-[12px] bg-[#11ac69] px-6 text-[17px] font-semibold uppercase tracking-[0.34em] text-white hover:bg-[#0d8d56]"
          onClick={submitSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
}
