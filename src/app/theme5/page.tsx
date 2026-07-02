"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, BadgeDollarSign, CarFront, CheckCircle2, Fuel, Gauge, Menu } from "lucide-react";

import {
  PhillipsMark,
  Theme5CarCard,
  Theme5SearchBar,
  Theme5Shell,
  theme5Button,
  theme5SecondaryButton,
  useTheme5Inventory,
} from "@/components/theme5/theme5-ui";
import { filterTheme5Cars, theme5BodyTypes, type Theme5Mode } from "@/lib/theme5";

const phoneHeroImage =
  "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=85";

const ownerImage =
  "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=900&q=85";

const bodyImages: Record<string, string> = {
  Hatchback: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&w=600&q=80",
  Sedan: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80",
  SUV: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80",
  Ute: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80",
  Van: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80",
  Wagon: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=600&q=80",
  Coupe: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
  Convertible: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80",
};

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
      <main className="bg-white">
        <section className="overflow-hidden bg-white">
          <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div className="max-w-xl">
              <p className="inline-flex rounded-[4px] bg-[#fff1b8] px-3 py-1 text-[11px] font-black uppercase tracking-normal text-[#785600]">
                Australia&apos;s Phillips car marketplace
              </p>
              <h1 className="mt-5 font-heading text-[58px] font-black uppercase leading-[0.88] text-[#111827] sm:text-[84px]">
                Turn your car into cash
              </h1>
              <p className="mt-6 max-w-lg text-base font-semibold leading-8 text-[#5f6b7d]">
                List, rent, buy, or rent-to-own through a clean mobile-style Phillips marketplace with saved authenticated requests.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/theme5/list-your-car" className={theme5Button}>
                  Start earning today
                  <ArrowRight size={17} />
                </Link>
                <Link href="/theme5/search?mode=rent" className={theme5SecondaryButton}>
                  Browse cars
                </Link>
              </div>
            </div>

            <div className="relative grid min-h-[560px] items-center">
              <div className="absolute right-0 top-8 hidden h-[420px] w-[82%] rounded-[8px] bg-[#185ee8] lg:block" />
              <PhoneMockup className="relative z-10 mx-auto w-full max-w-[365px] rotate-[-2deg]">
                <div className="flex items-center justify-between px-5 py-4">
                  <PhillipsMark compact />
                  <Menu size={18} />
                </div>
                <div className="relative h-52 overflow-hidden">
                  <Image src={phoneHeroImage} alt="Phillips rental app preview" fill priority sizes="365px" className="object-cover" />
                  <div className="absolute bottom-4 left-4 rounded-[6px] bg-white px-3 py-2 shadow-lg">
                    <p className="text-[10px] font-black uppercase text-[#ffbd16]">This week</p>
                    <p className="text-sm font-black text-[#111827]">+$240 earned</p>
                  </div>
                </div>
                <div className="bg-[#185ee8] px-5 py-6 text-white">
                  <p className="text-xs font-black uppercase tracking-normal text-white/70">Simple process</p>
                  <h2 className="mt-2 text-2xl font-black uppercase leading-none">Rent, buy, list.</h2>
                  <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                    {["12,000+", "98%", "3 days"].map((stat) => (
                      <div key={stat} className="rounded-[6px] bg-white/10 p-2">
                        <p className="text-sm font-black">{stat}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </PhoneMockup>
              <div className="absolute bottom-6 right-0 z-20 hidden w-[250px] rounded-[8px] border border-[#dfe7f3] bg-white p-4 shadow-[0_28px_60px_rgba(17,24,39,0.18)] md:block">
                <p className="text-xs font-black uppercase text-[#185ee8]">Browse efficient</p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {["SUV", "SEDAN"].map((type) => (
                    <div key={type} className="relative h-28 overflow-hidden rounded-[6px] bg-[#eef3fb]">
                      <Image src={bodyImages[type === "SUV" ? "SUV" : "Sedan"]} alt={`${type} preview`} fill sizes="125px" className="object-cover" />
                      <span className="absolute bottom-2 left-2 rounded-[4px] bg-[#111827]/80 px-2 py-1 text-[10px] font-black text-white">{type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#185ee8] px-4 py-14 text-white sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-normal text-white/70">Real earnings. Real owners.</p>
              <div className="mt-2 flex items-end gap-2">
                <span className="font-heading text-[76px] font-black leading-none text-[#ffbd16]">$800</span>
                <span className="pb-3 text-2xl font-black uppercase text-[#ffbd16]">/mo</span>
              </div>
              <p className="mt-4 max-w-xl text-sm font-semibold leading-7 text-white/75">
                Average owner-style earnings example for cars listed across rental, sale, and rent-to-own enquiries.
              </p>
              <Link href="/theme5/list-your-car" className="mt-7 inline-flex rounded-[6px] bg-[#6b22f6] px-5 py-3 text-sm font-black text-white">
                Start earning today
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["12,000+", "Cars listed"],
                ["98%", "Owner satisfaction"],
                ["3 days", "Avg. first booking"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[8px] bg-white/10 p-5">
                  <p className="text-3xl font-black">{value}</p>
                  <p className="mt-2 text-xs font-bold text-white/70">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f4f7fc] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="font-heading text-5xl font-black uppercase leading-none text-[#111827]">
                Earn weekly
              </h2>
              <p className="mt-4 max-w-md text-sm font-semibold leading-7 text-[#5f6b7d]">
                Payments and enquiries land in your account. Track listings, renter interest, buyer messages, and RTO requests from one place.
              </p>
              <div className="mt-7 grid gap-3">
                {["Create a verified listing", "Approve renter or buyer interest", "Follow up from your account"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm font-black text-[#111827]">
                    <CheckCircle2 className="text-[#185ee8]" size={19} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ["01", "List your car", "Add make, model, kms, body type, fuel, transmission, pricing, and photos."],
                ["02", "Receive requests", "Rent, buy, and rent-to-own enquiries are login-gated and saved."],
                ["03", "Manage account", "View pending listings and every enquiry in the Phillips account hub."],
              ].map(([step, title, body]) => (
                <div key={step} className="rounded-[8px] border border-[#d9e1ef] bg-white p-5 shadow-sm">
                  <p className="font-heading text-5xl font-black text-[#185ee8]">{step}</p>
                  <h3 className="mt-5 text-xl font-black uppercase text-[#111827]">{title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-[#5f6b7d]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-heading text-5xl font-black uppercase leading-none text-[#111827]">
                  Browse models
                </h2>
                <p className="mt-3 max-w-xl text-sm font-semibold leading-7 text-[#5f6b7d]">
                  Hatch, sedan, SUV, ute, van, wagon, coupe, convertible. Filter by kms, petrol, diesel, hybrid, electric, manual, automatic, and price.
                </p>
              </div>
              <Link href="/theme5/search" className={theme5SecondaryButton}>
                Open filters
              </Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {theme5BodyTypes.map((bodyType) => (
                <Link
                  key={bodyType}
                  href={`/theme5/search?bodyType=${encodeURIComponent(bodyType)}`}
                  className="group overflow-hidden rounded-[8px] border border-[#d9e1ef] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(24,94,232,0.16)]"
                >
                  <div className="relative h-44 bg-[#eef3fb]">
                    <Image src={bodyImages[bodyType] ?? bodyImages.Sedan} alt={`${bodyType} model`} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(17,24,39,0.78),rgba(17,24,39,0))] p-4">
                      <p className="text-2xl font-black uppercase text-white">{bodyType}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f4f7fc] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-heading text-5xl font-black uppercase leading-none text-[#111827]">
                  Featured cars
                </h2>
                <p className="mt-3 text-sm font-bold uppercase tracking-normal text-[#5f6b7d]">
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

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[8px] border border-[#d9e1ef] bg-[#185ee8] lg:grid-cols-[1fr_0.9fr]">
            <div className="p-8 text-white sm:p-10">
              <BadgeDollarSign size={34} />
              <h2 className="mt-5 font-heading text-5xl font-black uppercase leading-none">
                Start earning today
              </h2>
              <p className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-white/75">
                Submit once for rental, direct sale, and rent-to-own. Your listing enters review, then appears in Phillips marketplace search after approval.
              </p>
              <Link href="/theme5/list-your-car" className="mt-8 inline-flex rounded-[6px] bg-white px-6 py-3 text-sm font-black text-[#111827]">
                List your car
              </Link>
            </div>
            <div className="relative min-h-[320px] bg-[#111827]">
              <Image src={ownerImage} alt="Owner using Phillips marketplace" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover opacity-80" />
              <div className="absolute bottom-5 left-5 right-5 rounded-[8px] bg-white p-4 shadow-xl">
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    [CarFront, "Cars"],
                    [Fuel, "Fuel"],
                    [Gauge, "Kms"],
                  ].map(([Icon, label]) => {
                    const TypedIcon = Icon as typeof CarFront;
                    return (
                      <div key={label as string} className="rounded-[6px] bg-[#f4f7fc] p-3">
                        <TypedIcon className="mx-auto text-[#185ee8]" size={20} />
                        <p className="mt-2 text-xs font-black text-[#111827]">{label as string}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Theme5Shell>
  );
}

function PhoneMockup({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[24px] border-[10px] border-[#111827] bg-white shadow-[0_34px_80px_rgba(17,24,39,0.25)] ${className}`}>
      <div className="flex h-8 items-center justify-between bg-white px-5 text-[11px] font-black text-[#111827]">
        <span>1:26</span>
        <span className="h-2 w-10 rounded-full bg-[#111827]" />
      </div>
      {children}
    </div>
  );
}
