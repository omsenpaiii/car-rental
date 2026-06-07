"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";

import { siteConfig } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-amber-400 text-lg font-bold text-slate-950 shadow-sm">
            P
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight text-slate-950">
              Philips Car Rental
            </span>
            <span className="text-xs text-slate-500">Victoria&apos;s road-ready rental team</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-slate-600 transition-colors hover:text-slate-950",
                pathname === item.href && "text-slate-950"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition-colors hover:text-slate-950"
          >
            <Phone className="size-4 text-amber-500" />
            {siteConfig.phone}
          </a>
          <Link
            href="/search-your-car"
            className="inline-flex h-11 items-center justify-center rounded-full bg-amber-400 px-5 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-amber-300"
          >
            Book now
          </Link>
        </div>

        <Sheet>
          <SheetTrigger
            className="inline-flex size-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 md:hidden"
            aria-label="Open menu"
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="right" className="w-[84vw] max-w-sm bg-white">
            <SheetHeader className="border-b border-slate-200 px-6 py-5">
              <SheetTitle>Philips Car Rental</SheetTitle>
              <SheetDescription>Navigate the booking and fleet pages.</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-2 px-6 py-6">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950",
                    pathname === item.href && "bg-slate-100 text-slate-950"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-4 border-t border-slate-200 px-6 py-6">
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                className="text-sm font-semibold text-slate-700"
              >
                {siteConfig.phone}
              </a>
              <Button
                className="h-11 rounded-full bg-amber-400 text-slate-950 hover:bg-amber-300"
                onClick={() => {
                  window.location.href = "/search-your-car";
                }}
              >
                Start booking
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
