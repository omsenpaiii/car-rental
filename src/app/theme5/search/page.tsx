"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RefreshCw, Search } from "lucide-react";

import {
  Theme5CarCard,
  Theme5EmptyState,
  Theme5ModeTabs,
  Theme5Shell,
  useTheme5Inventory,
} from "@/components/theme5/theme5-ui";
import {
  createTheme5SearchParams,
  defaultTheme5Filters,
  filterTheme5Cars,
  getTheme5FiltersFromSearchParams,
  theme5BodyTypes,
  theme5FuelTypes,
  theme5OdometerRanges,
  theme5SeatOptions,
  theme5Transmissions,
  type Theme5Filters,
} from "@/lib/theme5";

function Theme5SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cars, isLoading } = useTheme5Inventory();
  const [filters, setFilters] = useState<Theme5Filters>(
    getTheme5FiltersFromSearchParams(new URLSearchParams(searchParams.toString()))
  );

  useEffect(() => {
    setFilters(getTheme5FiltersFromSearchParams(new URLSearchParams(searchParams.toString())));
  }, [searchParams]);

  const makes = useMemo(() => Array.from(new Set(cars.map((car) => car.make))).sort(), [cars]);
  const years = useMemo(() => Array.from(new Set(cars.map((car) => String(car.year)))).sort().reverse(), [cars]);
  const filteredCars = useMemo(() => filterTheme5Cars(cars, filters), [cars, filters]);
  const filterSelects: Array<{ label: string; key: keyof Theme5Filters; options: string[] }> = [
    { label: "Location", key: "location", options: ["Melbourne, VIC", "Keysborough, VIC", "Melbourne CBD, VIC", "St Kilda, VIC"] },
    { label: "Make", key: "make", options: ["", ...makes] },
    { label: "Body", key: "bodyType", options: ["", ...theme5BodyTypes] },
    { label: "Fuel", key: "fuel", options: ["", ...theme5FuelTypes] },
    { label: "Transmission", key: "transmission", options: ["", ...theme5Transmissions] },
    { label: "Year", key: "year", options: ["", ...years] },
    { label: "Kilometres", key: "odometer", options: ["", ...theme5OdometerRanges] },
    { label: "Seats", key: "seats", options: ["", ...theme5SeatOptions] },
  ];

  const updateFilters = (next: Partial<Theme5Filters>) => {
    const merged = { ...filters, ...next };
    const params = createTheme5SearchParams(merged);
    router.push(`/theme5/search?${params.toString()}`, { scroll: false });
  };

  return (
    <Theme5Shell>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-[8px] bg-[#185ee8] p-6 text-white sm:p-8">
          <h1 className="font-heading text-4xl font-black uppercase sm:text-6xl">Find your car</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
            Filter real Phillips marketplace inventory by body type, kms, fuel, transmission, seats, price, and availability mode.
          </p>
          <div className="mt-6">
            <Theme5ModeTabs value={filters.mode} onChange={(mode) => updateFilters({ mode, price: mode === "sale" ? 90000 : mode === "rent_to_own" ? 5000 : 500 })} />
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="h-fit rounded-[8px] border border-[#dfe7f3] bg-white p-4 shadow-sm lg:sticky lg:top-24">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-normal text-[#111827]">Filters</h2>
              <button
                type="button"
                onClick={() => updateFilters({ ...defaultTheme5Filters, mode: filters.mode, price: filters.mode === "sale" ? 90000 : filters.mode === "rent_to_own" ? 5000 : 500 })}
                className="flex items-center gap-1 text-xs font-black text-[#185ee8]"
              >
                <RefreshCw size={13} />
                Reset
              </button>
            </div>

            <div className="mt-5 grid gap-4">
              <label className="grid gap-2">
                <span className="text-xs font-black uppercase tracking-normal text-[#60728d]">Search</span>
                <div className="flex items-center gap-2 rounded-[6px] bg-[#f4f8fe] px-3">
                  <Search size={16} className="text-[#185ee8]" />
                  <input
                    value={filters.query}
                    onChange={(event) => updateFilters({ query: event.target.value })}
                    placeholder="Model, make, fuel..."
                    className="h-11 w-full bg-transparent text-sm font-bold outline-none"
                  />
                </div>
              </label>

              {filterSelects.map((field) => (
                <label key={field.key} className="grid gap-2">
                  <span className="text-xs font-black uppercase tracking-normal text-[#60728d]">{field.label}</span>
                  <select
                    value={String(filters[field.key] ?? "")}
                    onChange={(event) => updateFilters({ [field.key]: event.target.value } as Partial<Theme5Filters>)}
                    className="h-11 rounded-[6px] border border-[#dfe7f3] bg-white px-3 text-sm font-bold text-[#111827] outline-none focus:border-[#185ee8]"
                  >
                    {field.options.map((option) => (
                      <option key={option || "any"} value={option}>
                        {option || "Any"}
                      </option>
                    ))}
                  </select>
                </label>
              ))}

              <label className="grid gap-2">
                <span className="text-xs font-black uppercase tracking-normal text-[#60728d]">
                  Max price: ${filters.price.toLocaleString()}
                </span>
                <input
                  type="range"
                  min={filters.mode === "sale" ? 10000 : filters.mode === "rent_to_own" ? 500 : 50}
                  max={filters.mode === "sale" ? 150000 : filters.mode === "rent_to_own" ? 8000 : 800}
                  step={filters.mode === "sale" ? 5000 : filters.mode === "rent_to_own" ? 250 : 25}
                  value={filters.price}
                  onChange={(event) => updateFilters({ price: Number(event.target.value) })}
                  className="accent-[#185ee8]"
                />
              </label>
            </div>
          </aside>

          <section>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-black text-[#111827]">
                  {isLoading ? "Loading listings..." : `${filteredCars.length} matching cars`}
                </p>
                <p className="text-xs font-semibold text-[#60728d]">Authenticated actions save to your Phillips account.</p>
              </div>
              <select
                value={filters.sort}
                onChange={(event) => updateFilters({ sort: event.target.value as Theme5Filters["sort"] })}
                className="h-11 rounded-[6px] border border-[#dfe7f3] bg-white px-3 text-sm font-bold text-[#111827] outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="price_low">Price: low to high</option>
                <option value="price_high">Price: high to low</option>
                <option value="year">Newest year</option>
                <option value="rating">Highest rated</option>
              </select>
            </div>

            {filteredCars.length ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredCars.map((car) => (
                  <Theme5CarCard key={car.id} car={car} mode={filters.mode} />
                ))}
              </div>
            ) : (
              <Theme5EmptyState
                title="No cars match those filters"
                body="Try widening the price, changing the body type, or switching between rent, buy, and rent-to-own."
              />
            )}
          </section>
        </section>
      </main>
    </Theme5Shell>
  );
}

export default function Theme5SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7faff]" />}>
      <Theme5SearchContent />
    </Suspense>
  );
}
