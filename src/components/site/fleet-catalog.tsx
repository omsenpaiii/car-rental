"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { bookingFormDefaults, fleetItems, type FleetCategory } from "@/lib/site-data";
import { FleetCard } from "@/components/site/fleet-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type FleetCatalogProps = {
  initialCategory?: FleetCategory;
};

export function FleetCatalog({ initialCategory = "Any" }: FleetCatalogProps) {
  const [category, setCategory] = useState<FleetCategory>(initialCategory);
  const [query, setQuery] = useState("");

  const filteredFleet = useMemo(() => {
    return fleetItems.filter((item) => {
      const categoryMatch = category === "Any" || item.category === category;
      const queryMatch = item.name.toLowerCase().includes(query.toLowerCase());
      return categoryMatch && queryMatch;
    });
  }, [category, query]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.35)] sm:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Available vehicles</h2>
            <p className="text-sm text-slate-500">
              Browse by category or search by model name.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative min-w-0 sm:w-72">
              <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search your car"
                className="h-12 rounded-full border-slate-200 bg-slate-50 pl-11"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {bookingFormDefaults.categories.map((item) => (
                <Button
                  key={item}
                  variant={category === item ? "default" : "outline"}
                  className={
                    category === item
                      ? "h-12 rounded-full bg-slate-950 px-5 text-white hover:bg-slate-800"
                      : "h-12 rounded-full border-slate-200 px-5 text-slate-700 hover:bg-slate-50"
                  }
                  onClick={() => setCategory(item)}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredFleet.map((item) => (
          <FleetCard key={item.id} item={item} />
        ))}
      </div>

      {!filteredFleet.length ? (
        <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <h3 className="text-xl font-semibold text-slate-950">No cars match that filter</h3>
          <p className="mt-2 text-sm text-slate-500">
            Try another category or search term and we&apos;ll surface the closest match.
          </p>
        </div>
      ) : null}
    </div>
  );
}
