"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeDollarSign, CarFront, CheckCircle2, Fuel, Gauge, ShieldCheck } from "lucide-react";

import {
  Theme5CarCard,
  Theme5SearchBar,
  Theme5Shell,
  theme5Button,
  theme5SecondaryButton,
  useTheme5Inventory,
} from "@/components/theme5/theme5-ui";
import { filterTheme5Cars, theme5BodyTypes, type Theme5Mode } from "@/lib/theme5";

const heroImage =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85";

export default function Theme5HomePage() {
  const { cars, isLoading } = useTheme5Inventory();
  const featuredRentals = filterTheme5Cars(cars, {
    mode: "rent",
    query: "",
    make: "",
    bodyType: "",
    fuel: "",
    transmission: "",
    year: "",
    odometer: "",
    price: 350,
    location: "",
    seats: "",
    sort: "rating",
  }).slice(0, 3);

  return (
    <Theme5Shell>
      <main>
        <section className="relative overflow-hidden bg-[#07111f] text-white">
          <Image src={heroImage} alt="Phillips marketplace vehicle" fill priority sizes="100vw" className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#07111f_0%,rgba(7,17,31,0.92)_38%,rgba(7,17,31,0.38)_100%)]" />
          <div className="relative mx-auto grid min-h-[680px] max-w-7xl content-center gap-10 px-4 py-16 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-heading text-[56px] font-black uppercase leading-[0.9] tracking-normal sm:text-[86px]">
                Phillips car marketplace
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
                Rent, buy, rent-to-own, or list a car through one authenticated Melbourne marketplace with real saved enquiries and owner listings.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/theme5/search?mode=rent" className={theme5Button}>
                  Browse cars
                  <ArrowRight size={17} />
                </Link>
                <Link href="/theme5/list-your-car" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[#10213f]">
                  List your car
                </Link>
              </div>
            </div>
            <Theme5SearchBar />
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
            {[
              [CarFront, "Browse every body", "Hatch, sedan, SUV, ute, van, coupe, convertible."],
              [Fuel, "Fuel clarity", "Petrol, diesel, hybrid, electric, and LPG filters."],
              [Gauge, "Know the kms", "Odometer ranges, year, seats, and transmission upfront."],
              [ShieldCheck, "Verified requests", "Login-gated rental, purchase, and listing enquiries."],
            ].map(([Icon, title, body]) => {
              const TypedIcon = Icon as typeof CarFront;
              return (
                <div key={title as string} className="rounded-[8px] border border-[#dfe7f3] bg-[#f8fbff] p-5">
                  <TypedIcon className="text-[#1157d9]" size={25} />
                  <h2 className="mt-4 text-lg font-black text-[#10213f]">{title as string}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#60728d]">{body as string}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-heading text-4xl font-black uppercase text-[#10213f] sm:text-6xl">
                Browse by model type
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#60728d]">
                Jump straight into practical categories with real filters waiting on the search screen.
              </p>
            </div>
            <Link href="/theme5/search" className={theme5SecondaryButton}>
              Open all filters
            </Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {theme5BodyTypes.map((bodyType) => (
              <Link
                key={bodyType}
                href={`/theme5/search?bodyType=${encodeURIComponent(bodyType)}`}
                className="group rounded-[8px] border border-[#dfe7f3] bg-white p-5 shadow-sm transition hover:border-[#1157d9] hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-black text-[#10213f]">{bodyType}</div>
                  <ArrowRight className="text-[#1157d9] transition group-hover:translate-x-1" size={20} />
                </div>
                <p className="mt-3 text-sm font-semibold text-[#60728d]">See matching {bodyType.toLowerCase()} listings</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-[#eef5ff] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-heading text-4xl font-black uppercase text-[#10213f] sm:text-6xl">
                  Featured cars
                </h2>
                <p className="mt-3 text-sm font-bold uppercase tracking-normal text-[#60728d]">
                  {isLoading ? "Loading live listings" : "Live inventory plus Phillips seed fleet"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {(["rent", "sale", "rent_to_own"] as Theme5Mode[]).map((mode) => (
                  <Link key={mode} href={`/theme5/search?mode=${mode}`} className={theme5SecondaryButton}>
                    {mode === "rent_to_own" ? "RTO" : mode === "sale" ? "Buy" : "Rent"}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {featuredRentals.map((car) => (
                <Theme5CarCard key={car.id} car={car} mode="rent" />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
          <div className="rounded-[8px] bg-[#1157d9] p-8 text-white sm:p-10">
            <BadgeDollarSign size={34} />
            <h2 className="mt-5 font-heading text-4xl font-black uppercase sm:text-6xl">
              List, rent, sell, get paid.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/75">
              Owners can submit a car for rental, direct sale, and rent-to-own in one flow. Listings enter review and then appear in the marketplace when approved.
            </p>
            <Link href="/theme5/list-your-car" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-black text-[#10213f]">
              Start listing
            </Link>
          </div>
          <div className="grid content-center gap-4 rounded-[8px] border border-[#dfe7f3] bg-white p-8">
            {["Account login required", "Pending review for new listings", "Saved rent, buy, and RTO enquiries", "Account dashboard for owners and renters"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm font-black text-[#10213f]">
                <CheckCircle2 className="text-[#13a66b]" size={20} />
                {item}
              </div>
            ))}
          </div>
        </section>
      </main>
    </Theme5Shell>
  );
}
