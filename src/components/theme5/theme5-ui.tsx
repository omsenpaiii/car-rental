"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight,
  CarFront,
  Gauge,
  Heart,
  LogOut,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  User,
  X,
} from "lucide-react";

import { AuthPanel } from "@/components/portal/auth-panel";
import { useAuth } from "@/components/portal/auth-provider";
import {
  formatMoney,
  getCarModePrice,
  getModeUnit,
  theme5Modes,
  theme5SeedCars,
  type Theme5Mode,
} from "@/lib/theme5";
import type { TuroCar } from "@/lib/theme4-data";

export const theme5Button =
  "inline-flex items-center justify-center gap-2 rounded-[6px] bg-[#6b22f6] px-5 py-3 text-sm font-black text-white shadow-[0_16px_30px_rgba(107,34,246,0.28)] transition hover:bg-[#5718d9]";

export const theme5SecondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-[6px] border border-[#d6dff1] bg-white px-5 py-3 text-sm font-black text-[#111827] transition hover:border-[#185ee8] hover:text-[#185ee8]";

export function PhillipsMark({ compact = false, inverse = false }: { compact?: boolean; inverse?: boolean }) {
  return (
    <Link href="/theme5" className="flex items-end gap-2">
      <span className={`font-heading text-[29px] font-black italic uppercase leading-none ${inverse ? "text-white" : "text-[#185ee8]"}`}>
        PHILL<span className="text-[#ffbd16]">I</span>PS
      </span>
      <span className="mb-0.5 h-3 w-1.5 skew-x-[-18deg] rounded-sm bg-[#ffbd16]" />
      <span className="leading-none">
        {!compact ? (
          <span className={`hidden text-[10px] font-black uppercase tracking-normal sm:block ${inverse ? "text-white/60" : "text-[#6b7b96]"}`}>
            Cars
          </span>
        ) : null}
      </span>
    </Link>
  );
}

export function Theme5Header() {
  const pathname = usePathname();
  const { user, profile, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const navItems = [
    { href: "/theme5/search?mode=rent", label: "Rent" },
    { href: "/theme5/search?mode=sale", label: "Buy" },
    { href: "/theme5/search?mode=rent_to_own", label: "Rent to own" },
    { href: "/theme5/list-your-car", label: "List your car" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#e8edf6] bg-white/96 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <PhillipsMark />
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = pathname === item.href.split("?")[0];
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-[6px] px-4 py-2 text-sm font-black ${
                    active ? "bg-[#eaf1ff] text-[#185ee8]" : "text-[#4d5c73] hover:bg-[#f3f7fd]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                <Link href="/theme5/account" className={theme5SecondaryButton}>
                  <User size={16} />
                  {profile?.full_name?.split(" ")[0] || "Account"}
                </Link>
                <button type="button" onClick={() => void logout()} className="rounded-full p-3 text-[#5f6f89] hover:bg-[#f3f7fd]">
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <button type="button" onClick={() => setAuthOpen(true)} className={theme5SecondaryButton}>
                <User size={16} />
                Log in
              </button>
            )}
            <Link href="/theme5/search" className={theme5Button}>
              <Search size={16} />
              Find cars
            </Link>
          </div>
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-full border border-[#d8e3f4] text-[#111827] md:hidden"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen ? (
          <div className="border-t border-[#e4ebf7] bg-white px-4 py-4 md:hidden">
            <div className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[6px] px-4 py-3 text-sm font-black text-[#111827] hover:bg-[#f3f7fd]"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    void logout();
                  }}
                  className="rounded-[6px] px-4 py-3 text-left text-sm font-black text-[#111827] hover:bg-[#f3f7fd]"
                >
                  Log out
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setAuthOpen(true);
                  }}
                  className="rounded-[6px] px-4 py-3 text-left text-sm font-black text-[#111827] hover:bg-[#f3f7fd]"
                >
                  Log in or register
                </button>
              )}
            </div>
          </div>
        ) : null}
      </header>
      <Theme5AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

export function Theme5Footer() {
  return (
    <footer className="border-t border-[#0f4bd0] bg-[#185ee8] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.1fr_1fr_1fr_1fr]">
        <div>
          <PhillipsMark compact inverse />
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
            Phillips Car Rental connects Melbourne renters, buyers, and owners through verified enquiries and practical vehicle listings.
          </p>
        </div>
        {[
          ["Marketplace", "Rent cars", "Buy cars", "Rent to own"],
          ["Owners", "List your car", "Account", "Admin review"],
          ["Support", "1300 315 275", "booking@phillipscarrental.com.au", "Keysborough VIC"],
        ].map(([title, ...items]) => (
          <div key={title}>
            <h3 className="text-xs font-black uppercase tracking-normal text-white/70">{title}</h3>
            <div className="mt-4 grid gap-3 text-sm text-white/60">
              {items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}

export function Theme5Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f3f6fb] text-[#111827]">
      <Theme5Header />
      {children}
      <Theme5Footer />
    </div>
  );
}

export function Theme5AuthModal({
  open,
  onClose,
  onAuthenticated,
}: {
  open: boolean;
  onClose: () => void;
  onAuthenticated?: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#185ee8]/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={onClose}
          className="mb-3 ml-auto block rounded-full bg-white/15 px-4 py-2 text-xs font-black text-white"
        >
          Close
        </button>
        <AuthPanel
          onAuthenticated={() => {
            onAuthenticated?.();
            onClose();
          }}
        />
      </div>
    </div>
  );
}

export function useTheme5Inventory() {
  const [remoteCars, setRemoteCars] = useState<TuroCar[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      try {
        const response = await fetch("/api/portal/listings", { cache: "no-store" });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error ?? "Unable to load listings.");
        if (isActive) {
          setRemoteCars(Array.isArray(payload.listings) ? payload.listings : []);
        }
      } catch {
        if (isActive) setRemoteCars([]);
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    void load();
    return () => {
      isActive = false;
    };
  }, []);

  const cars = useMemo(() => {
    const merged = [...remoteCars, ...theme5SeedCars];
    const seen = new Set<string>();
    return merged.filter((car) => {
      if (seen.has(car.id)) return false;
      seen.add(car.id);
      return true;
    });
  }, [remoteCars]);

  return { cars, isLoading, remoteCount: remoteCars.length };
}

export function Theme5CarCard({ car, mode }: { car: TuroCar; mode: Theme5Mode }) {
  const price = getCarModePrice(car, mode);
  return (
    <Link
      href={`/theme5/car/${car.id}?mode=${mode}`}
      className="group overflow-hidden rounded-[8px] border border-[#d9e1ef] bg-white shadow-[0_18px_36px_rgba(17,24,39,0.10)] transition hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(24,94,232,0.18)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#eaf1fb]">
        <Image
          src={car.image}
          alt={car.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-[4px] bg-[#ffbd16] px-3 py-1 text-xs font-black text-[#111827]">
          {car.bodyType || car.category}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-[#111827]">{car.name}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-[#60728d]">
              <MapPin size={14} />
              {car.location}
            </p>
          </div>
          <Heart className="size-5 text-[#185ee8]" />
        </div>
        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <div className="text-2xl font-black text-[#111827]">{formatMoney(price)}</div>
            <div className="text-xs font-bold uppercase tracking-normal text-[#7a8aa3]">
              {getModeUnit(mode)}
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-[4px] bg-[#fff4d6] px-3 py-1 text-xs font-black text-[#9a6b00]">
            {car.rating.toFixed(2)}
          </span>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-[11px] font-black text-[#60728d]">
          <span className="flex items-center gap-1">
            <CarFront size={14} />
            {car.fuelType}
          </span>
          <span>{car.transmission}</span>
          <span className="flex items-center gap-1">
            <Gauge size={14} />
            {car.odometer ? `${car.odometer.toLocaleString()} km` : "Low km"}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function Theme5EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[8px] border border-dashed border-[#cbd8ea] bg-white p-10 text-center">
      <ShieldCheck className="mx-auto size-10 text-[#185ee8]" />
      <h3 className="mt-4 text-xl font-black text-[#111827]">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#60728d]">{body}</p>
    </div>
  );
}

export function Theme5SearchBar({
  defaultQuery = "",
  defaultLocation = "Melbourne, VIC",
}: {
  defaultQuery?: string;
  defaultLocation?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultQuery);
  const [location, setLocation] = useState(defaultLocation);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const params = new URLSearchParams();
        if (query) params.set("query", query);
        if (location) params.set("location", location);
        router.push(`/theme5/search?${params.toString()}`);
      }}
      className="grid gap-3 rounded-[8px] border border-[#d8e1f2] bg-white p-3 shadow-[0_20px_50px_rgba(17,24,39,0.16)] md:grid-cols-[1fr_1fr_auto]"
    >
      <label className="flex min-h-12 items-center gap-3 rounded-[6px] bg-[#f1f5fb] px-4">
        <Search size={18} className="text-[#185ee8]" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search make, model, fuel, body"
          className="w-full bg-transparent text-sm font-bold text-[#111827] outline-none placeholder:text-[#7a8aa3]"
        />
      </label>
      <label className="flex min-h-12 items-center gap-3 rounded-[6px] bg-[#f1f5fb] px-4">
        <MapPin size={18} className="text-[#185ee8]" />
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Melbourne, VIC"
          className="w-full bg-transparent text-sm font-bold text-[#111827] outline-none placeholder:text-[#7a8aa3]"
        />
      </label>
      <button className={theme5Button}>
        Search
        <ArrowRight size={16} />
      </button>
    </form>
  );
}

export function Theme5ModeTabs({
  value,
  onChange,
}: {
  value: Theme5Mode;
  onChange: (mode: Theme5Mode) => void;
}) {
  return (
    <div className="grid rounded-[8px] border border-[#dfe7f3] bg-white p-1 sm:inline-grid sm:grid-cols-3">
      {theme5Modes.map((mode) => (
        <button
          key={mode.value}
          type="button"
          onClick={() => onChange(mode.value)}
          className={`rounded-[6px] px-4 py-3 text-sm font-black ${
            value === mode.value ? "bg-[#185ee8] text-white" : "text-[#60728d] hover:bg-[#f4f8fe]"
          }`}
        >
          {mode.shortLabel}
        </button>
      ))}
    </div>
  );
}
