"use client";

import { useState } from "react";
import { LoaderCircle, Search, ShieldCheck, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Status = "idle" | "loading" | "success" | "error";

export function TrackOrderForm() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleTrack = async () => {
    if (!orderId.trim()) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus(orderId.trim().toUpperCase().startsWith("PH") ? "success" : "error");
  };

  return (
    <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.35)] sm:p-8">
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Enter Order Number</h2>
        <p className="max-w-xl text-base leading-7 text-slate-500">
          Try an order starting with <span className="font-semibold text-slate-950">PH</span> to
          see a successful mock result.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={orderId}
            onChange={(event) => setOrderId(event.target.value)}
            placeholder="Track order"
            className="h-12 rounded-full border-slate-200 bg-slate-50 pl-11"
          />
        </div>
        <Button
          className="h-12 rounded-full bg-amber-400 px-6 text-slate-950 hover:bg-amber-300"
          onClick={handleTrack}
          disabled={status === "loading"}
        >
          {status === "loading" ? <LoaderCircle className="animate-spin" data-icon="inline-start" /> : null}
          Track order
        </Button>
      </div>

      {status === "success" ? (
        <div className="mt-5 rounded-[24px] border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-1 size-5 text-emerald-600" />
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-slate-950">Booking confirmed and ready</p>
              <p className="text-sm leading-6 text-slate-600">
                Your Philips pickup is scheduled for tomorrow at 10:00 from the Dandenong South
                office.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {status === "error" ? (
        <div className="mt-5 rounded-[24px] border border-rose-200 bg-rose-50 p-5">
          <div className="flex items-start gap-3">
            <TriangleAlert className="mt-1 size-5 text-rose-600" />
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-slate-950">We couldn&apos;t find that order yet</p>
              <p className="text-sm leading-6 text-slate-600">
                Double-check the order number or contact the support team if you need help.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
