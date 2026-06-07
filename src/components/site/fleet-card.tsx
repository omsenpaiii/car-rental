import Link from "next/link";
import { Fuel, Gauge, Users } from "lucide-react";

import type { FleetItem } from "@/lib/site-data";
import { Card, CardContent } from "@/components/ui/card";

type FleetCardProps = {
  item: FleetItem;
};

export function FleetCard({ item }: FleetCardProps) {
  return (
    <Card className="overflow-hidden rounded-[26px] border-slate-200 bg-white shadow-[0_24px_70px_-50px_rgba(15,23,42,0.4)] transition-transform duration-300 hover:-translate-y-1">
      <CardContent className="p-0">
        <div className={`relative overflow-hidden ${item.accent}`}>
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/70 to-transparent" />
          <div className="relative h-56">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-500">
                {item.category}
              </p>
              <h3 className="mt-1 text-xl font-semibold text-slate-950">{item.name}</h3>
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold text-slate-950">${item.pricePerDay.toFixed(2)}</p>
              <p className="text-sm text-slate-500">/Day</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Users className="size-4 text-amber-500" />
              <span>{item.seats} Seat</span>
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="size-4 text-amber-500" />
              <span>{item.transmission}</span>
            </div>
            <div className="flex items-center gap-2">
              <Fuel className="size-4 text-amber-500" />
              <span>{item.fuelType}</span>
            </div>
          </div>

          <Link
            href="/search-your-car"
            className="inline-flex h-12 items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Continue
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
