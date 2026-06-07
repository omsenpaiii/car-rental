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
    <header className="sticky top-0 z-40 border-b border-[#ececec] bg-white">
      <div className="mx-auto flex w-full max-w-[1290px] items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex flex-col leading-none">
            <span className="text-[22px] font-extrabold uppercase tracking-[0.08em] text-[#272727] sm:text-[24px]">
              Phillips Car Rental
            </span>
            <span className="mt-1 text-[11px] font-normal uppercase tracking-[0.62em] text-[#727272]">
              Melbourne Australia
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-12 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[17px] font-semibold uppercase tracking-[0.28em] text-[#272727] transition-colors hover:text-[#11ac69]",
                pathname === item.href && "text-[#11ac69]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
            className="inline-flex h-[68px] items-center gap-4 rounded-[10px] bg-[#11ac69] px-8 text-[17px] font-semibold tracking-[0.2em] text-white transition-colors hover:bg-[#0d8d56]"
          >
            <Phone className="size-5" />
            {siteConfig.phone}
          </a>
        </div>

        <Sheet>
          <SheetTrigger
            className="inline-flex size-10 items-center justify-center rounded-full border border-[#d8dde8] text-[#272727] md:hidden"
            aria-label="Open menu"
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="right" className="w-[84vw] max-w-sm bg-white">
            <SheetHeader className="border-b border-slate-200 px-6 py-5">
              <SheetTitle>Phillips Car Rental</SheetTitle>
              <SheetDescription>Navigate the booking and fleet pages.</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-2 px-6 py-6">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#272727] transition-colors hover:bg-[#f2f5fb] hover:text-[#11ac69]",
                    pathname === item.href && "bg-[#f2f5fb] text-[#11ac69]"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-4 border-t border-slate-200 px-6 py-6">
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                className="rounded-[10px] bg-[#11ac69] px-5 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white"
              >
                {siteConfig.phone}
              </a>
              <Button
                className="h-11 rounded-[10px] bg-[#11ac69] text-white hover:bg-[#0d8d56]"
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
