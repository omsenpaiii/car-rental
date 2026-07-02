"use client";

import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Fuel,
  Gauge,
  Heart,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type Mode = "rent" | "earn" | "sell";

type VehicleType = {
  label: string;
  image: string;
  count: string;
};

type CarListing = {
  id: string;
  title: string;
  type: string;
  location: string;
  image: string;
  day: number;
  week: number;
  month: number;
  rating: number;
  trips: number;
  seats: number;
  fuel: string;
  transmission: string;
  deposit: number;
};

const screens = {
  cashHero: "/theme5/screens/img_0076.png",
  earningBlue: "/theme5/screens/img_0077.png",
  landingFlow: "/theme5/screens/img_0078.png",
  phoneHand: "/theme5/screens/img_0079.png",
  weekly: "/theme5/screens/img_0080.png",
  ownerSteps: "/theme5/screens/img_0102.png",
};

const vehicleTypes: VehicleType[] = [
  { label: "SUV", image: "/theme5/screens/img_0081.png", count: "64 cars" },
  { label: "Sedan", image: "/theme5/screens/img_0081.png", count: "43 cars" },
  { label: "Van", image: "/theme5/screens/img_0094.png", count: "18 cars" },
  { label: "Luxury", image: "/theme5/screens/img_0116.png", count: "12 cars" },
];

const cars: CarListing[] = [
  {
    id: "toyota-rav4",
    title: "2023 Toyota RAV4",
    type: "SUV",
    location: "Sydney CBD",
    image: "/theme5/screens/img_0086.png",
    day: 89,
    week: 490,
    month: 1370,
    rating: 4.96,
    trips: 41,
    seats: 5,
    fuel: "Hybrid",
    transmission: "Automatic",
    deposit: 220,
  },
  {
    id: "mercedes-ble",
    title: "2023 Mercedes BLE",
    type: "Luxury",
    location: "Melbourne Airport",
    image: "/theme5/screens/img_0091.png",
    day: 220,
    week: 1250,
    month: 5200,
    rating: 4.98,
    trips: 27,
    seats: 5,
    fuel: "Premium",
    transmission: "Automatic",
    deposit: 420,
  },
  {
    id: "tesla-model-3",
    title: "2024 Tesla Model 3",
    type: "Sedan",
    location: "Brisbane City",
    image: "/theme5/screens/img_0116.png",
    day: 120,
    week: 720,
    month: 2100,
    rating: 4.93,
    trips: 36,
    seats: 5,
    fuel: "Electric",
    transmission: "Automatic",
    deposit: 300,
  },
];

const ownerSteps = [
  {
    title: "List your car",
    body: "Add photos, daily pricing, pickup rules, and the dates your car is free.",
  },
  {
    title: "Approve bookings",
    body: "Review renter details, confirm handover time, and keep control of availability.",
  },
  {
    title: "Earn weekly",
    body: "Payments land every week with trip tracking, protection checks, and clear summaries.",
  },
];

const faqItems = [
  {
    question: "How quickly can I list my car?",
    answer:
      "Most owners can create a draft in under five minutes. Add photos, location, price, availability, and payout details.",
  },
  {
    question: "Can I rent by week or month?",
    answer:
      "Yes. Switch between daily, weekly, and monthly estimates from each car card before you book.",
  },
  {
    question: "What happens after booking?",
    answer:
      "The booking panel confirms dates, pickup location, estimated fees, and a handover checklist.",
  },
  {
    question: "Can owners pause availability?",
    answer:
      "Yes. The owner flow includes a simple availability calendar and a monthly earnings estimator.",
  },
];

function Logo() {
  return (
    <div className="font-heading text-[32px] font-black italic leading-none tracking-[-0.01em] text-[#145adf]">
      ZOOML<span className="text-[#ffbc15]">i</span>
    </div>
  );
}

function PhoneFrame({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[22px] border border-[#dfe6f5] bg-white shadow-[0_20px_70px_rgba(13,57,138,0.18)] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 78vw, 360px"
        className="object-cover object-top"
      />
    </div>
  );
}

function PillButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-10 rounded-full border px-4 text-[13px] font-semibold ${
        active
          ? "border-[#145adf] bg-[#145adf] text-white shadow-[0_10px_24px_rgba(20,90,223,0.22)]"
          : "border-[#d9e1ee] bg-white text-[#17213a] hover:border-[#145adf]"
      }`}
    >
      {children}
    </button>
  );
}

export default function Theme5Page() {
  const [mode, setMode] = useState<Mode>("rent");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [favorites, setFavorites] = useState<string[]>(["toyota-rav4"]);
  const [selectedCar, setSelectedCar] = useState<CarListing>(cars[0]);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [days, setDays] = useState(3);
  const [carValue, setCarValue] = useState(42000);
  const [availableDays, setAvailableDays] = useState(12);
  const [openFaq, setOpenFaq] = useState(0);
  const [ownerSubmitted, setOwnerSubmitted] = useState(false);

  const filteredCars = useMemo(() => {
    return cars.filter((carItem) => {
      const matchesType = activeType === "All" || carItem.type === activeType;
      const haystack = `${carItem.title} ${carItem.location} ${carItem.type}`.toLowerCase();
      return matchesType && haystack.includes(query.trim().toLowerCase());
    });
  }, [activeType, query]);

  const estimatedTrip = selectedCar.day * days + selectedCar.deposit;
  const monthlyOwnerEarnings = Math.round(carValue * 0.0016 * availableDays);

  const toggleFavorite = (id: string) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const startBooking = (carItem: CarListing) => {
    setSelectedCar(carItem);
    setBookingStep(1);
    setBookingOpen(true);
  };

  return (
    <main className="min-h-screen bg-white font-sans text-[#101828]">
      <header className="sticky top-0 z-40 border-b border-[#e7edf8] bg-white/96 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" aria-label="Zoomli home">
            <Logo />
          </a>

          <nav className="hidden items-center gap-8 text-[14px] font-semibold text-[#1d2a44] md:flex">
            <a href="#browse" className="hover:text-[#145adf]">
              Browse cars
            </a>
            <a href="#owners" className="hover:text-[#145adf]">
              For owners
            </a>
            <a href="#how" className="hover:text-[#145adf]">
              How it works
            </a>
            <a href="#faq" className="hover:text-[#145adf]">
              FAQs
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button className="rounded-full px-4 py-2 text-[14px] font-semibold text-[#1d2a44] hover:bg-[#eef4ff]">
              Log in
            </button>
            <a
              href="#browse"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#145adf] px-5 text-[14px] font-bold text-white shadow-[0_14px_30px_rgba(20,90,223,0.26)] hover:bg-[#0c49bd]"
            >
              Browse now <ArrowRight size={16} />
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d7e0f0] text-[#17213a] md:hidden"
            onClick={() => setMobileMenuOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {mobileMenuOpen ? (
          <div className="border-t border-[#e7edf8] bg-white px-4 py-4 md:hidden">
            <div className="grid gap-2 text-[15px] font-semibold">
              {["Browse cars", "For owners", "How it works", "FAQs"].map((item) => (
                <a
                  key={item}
                  href={`#${item === "Browse cars" ? "browse" : item === "For owners" ? "owners" : item === "How it works" ? "how" : "faq"}`}
                  className="rounded-xl px-3 py-3 hover:bg-[#eef4ff]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <section
        id="top"
        className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#eef5ff_54%,#ffffff_100%)]"
      >
        <div className="absolute inset-x-0 top-[118px] h-[270px] bg-[#145adf]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-10 sm:px-6 md:grid-cols-[0.92fr_1.08fr] md:items-center lg:px-8 lg:pb-24">
          <div className="relative z-10 max-w-xl">
            <Logo />
            <h1 className="mt-8 font-heading text-[48px] font-black uppercase leading-[0.9] text-[#102149] sm:text-[68px] lg:text-[86px]">
              List. Book. Earn.
            </h1>
            <p className="mt-6 max-w-md text-[17px] leading-8 text-[#42526f]">
              Australia-style car sharing with weekly owner earnings, flexible rentals,
              instant browsing, and simple booking flows.
            </p>

            <div className="mt-7 inline-grid rounded-[18px] border border-[#d7e3f7] bg-white p-1 shadow-[0_18px_48px_rgba(16,33,73,0.12)] sm:grid-cols-3">
              {[
                ["rent", "Rent a car"],
                ["earn", "Earn with car"],
                ["sell", "Sell your car"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setMode(value as Mode)}
                  className={`h-12 rounded-[14px] px-5 text-[13px] font-bold uppercase tracking-[0.08em] ${
                    mode === value ? "bg-[#145adf] text-white" : "text-[#33415f]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-8 grid max-w-md grid-cols-3 gap-3">
              {[
                ["12,000+", "Cars listed"],
                ["98%", "Owner satisfaction"],
                ["3 days", "Avg. booking"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[18px] bg-white/90 p-4 shadow-sm">
                  <div className="font-heading text-[24px] font-bold text-[#145adf]">
                    {value}
                  </div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#64748b]">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[590px]">
            <PhoneFrame
              src={screens.landingFlow}
              alt="Zoomli mobile process screen"
              priority
              className="absolute left-0 top-14 h-[520px] w-[238px] rotate-[-6deg] md:left-8"
            />
            <PhoneFrame
              src={mode === "earn" ? screens.earningBlue : mode === "sell" ? screens.cashHero : screens.phoneHand}
              alt="Zoomli hero mobile screen"
              priority
              className="absolute left-[118px] top-0 h-[590px] w-[276px] rotate-[2deg] sm:left-[190px] md:left-[250px]"
            />
            <div className="absolute bottom-5 left-4 right-0 max-w-[460px] rounded-[26px] border border-[#dbe6f7] bg-white p-4 shadow-[0_22px_60px_rgba(16,33,73,0.16)] sm:left-20">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff4d4] text-[#d89800]">
                  <CircleDollarSign size={23} />
                </div>
                <div>
                  <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#64748b]">
                    This week
                  </div>
                  <div className="text-[22px] font-black text-[#102149]">
                    ${mode === "earn" ? "800" : mode === "sell" ? "42,000" : "240"} earned
                  </div>
                </div>
                <Sparkles className="ml-auto text-[#145adf]" size={24} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="browse" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-heading text-[13px] font-bold uppercase tracking-[0.18em] text-[#145adf]">
              Find your next ride
            </p>
            <h2 className="mt-3 font-heading text-[38px] font-black uppercase leading-none text-[#102149] sm:text-[56px]">
              Browse by type
            </h2>
          </div>

          <div className="rounded-[24px] border border-[#dce6f6] bg-white p-3 shadow-[0_16px_44px_rgba(16,33,73,0.08)]">
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="flex h-12 min-w-[260px] items-center gap-3 rounded-[16px] bg-[#f5f8ff] px-4 text-[#51607a]">
                <Search size={18} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search model, city, type"
                  className="w-full bg-transparent text-[14px] font-medium text-[#102149] outline-none placeholder:text-[#7b879c]"
                />
              </label>
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-[16px] bg-[#145adf] px-5 text-[14px] font-bold text-white">
                <SlidersHorizontal size={17} /> Filters
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
          {["All", ...vehicleTypes.map((item) => item.label)].map((type) => (
            <PillButton key={type} active={activeType === type} onClick={() => setActiveType(type)}>
              {type}
            </PillButton>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {vehicleTypes.map((typeItem, index) => (
            <button
              key={typeItem.label}
              type="button"
              onClick={() => setActiveType(typeItem.label)}
              className="group overflow-hidden rounded-[22px] bg-[#f3f7ff] text-left shadow-sm"
            >
              <div className="relative h-[190px] overflow-hidden">
                <Image
                  src={typeItem.image}
                  alt={`${typeItem.label} cars`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                    index === 0 ? "object-[50%_20%]" : "object-top"
                  }`}
                />
              </div>
              <div className="flex items-center justify-between p-4">
                <div>
                  <div className="font-heading text-[24px] font-black uppercase text-[#102149]">
                    {typeItem.label}
                  </div>
                  <div className="text-[13px] font-semibold text-[#66758f]">{typeItem.count}</div>
                </div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#145adf]">
                  <ArrowRight size={18} />
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {filteredCars.map((carItem) => (
            <article
              key={carItem.id}
              className="overflow-hidden rounded-[26px] border border-[#dce6f6] bg-white shadow-[0_18px_50px_rgba(16,33,73,0.08)]"
            >
              <div className="relative h-[290px] bg-[#eef4ff]">
                <Image
                  src={carItem.image}
                  alt={carItem.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-top"
                />
                <button
                  type="button"
                  onClick={() => toggleFavorite(carItem.id)}
                  className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#145adf] shadow-sm"
                  aria-label={`Favorite ${carItem.title}`}
                >
                  <Heart
                    size={20}
                    fill={favorites.includes(carItem.id) ? "#145adf" : "transparent"}
                  />
                </button>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[21px] font-black text-[#102149]">{carItem.title}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-[13px] font-semibold text-[#66758f]">
                      <MapPin size={15} /> {carItem.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-[#fff6da] px-3 py-1 text-[13px] font-bold text-[#ae7900]">
                    <Star size={14} fill="currentColor" /> {carItem.rating}
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[
                    [`$${carItem.day}`, "per day"],
                    [`$${carItem.week}`, "per week"],
                    [`$${carItem.month}`, "monthly"],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-[16px] bg-[#f5f8ff] p-3">
                      <div className="text-[18px] font-black text-[#102149]">{value}</div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#7b879c]">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2 text-[12px] font-bold text-[#50607a]">
                  <span className="flex items-center gap-1 rounded-full bg-white">
                    <Users size={15} /> {carItem.seats} seats
                  </span>
                  <span className="flex items-center gap-1">
                    <Fuel size={15} /> {carItem.fuel}
                  </span>
                  <span className="flex items-center gap-1">
                    <Gauge size={15} /> {carItem.transmission}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => startBooking(carItem)}
                  className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[16px] bg-[#145adf] text-[14px] font-black uppercase tracking-[0.08em] text-white hover:bg-[#0c49bd]"
                >
                  Book instantly <ArrowRight size={17} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="owners" className="bg-[#145adf] py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
          <div>
            <p className="font-heading text-[13px] font-bold uppercase tracking-[0.2em] text-[#ffcf3f]">
              For owners
            </p>
            <h2 className="mt-4 font-heading text-[42px] font-black uppercase leading-none sm:text-[64px]">
              Start earning today
            </h2>
            <p className="mt-5 max-w-xl text-[17px] leading-8 text-blue-50">
              Turn idle days into weekly payments. Keep your calendar, approval flow,
              trip handover, and earnings summary in one simple mobile-first workflow.
            </p>

            <div className="mt-8 rounded-[28px] bg-white p-5 text-[#102149] shadow-[0_24px_70px_rgba(3,25,83,0.25)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-heading text-[15px] font-bold uppercase tracking-[0.14em] text-[#145adf]">
                    Estimate earnings
                  </div>
                  <div className="mt-2 text-[34px] font-black">${monthlyOwnerEarnings}/mo</div>
                </div>
                <div className="rounded-full bg-[#fff2cb] px-4 py-2 text-[13px] font-black text-[#b57e00]">
                  Live
                </div>
              </div>
              <label className="mt-5 block">
                <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#64748b]">
                  Car value: ${carValue.toLocaleString()}
                </span>
                <input
                  type="range"
                  min="12000"
                  max="90000"
                  step="1000"
                  value={carValue}
                  onChange={(event) => setCarValue(Number(event.target.value))}
                  className="mt-3 w-full accent-[#145adf]"
                />
              </label>
              <label className="mt-4 block">
                <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#64748b]">
                  Available days: {availableDays}
                </span>
                <input
                  type="range"
                  min="4"
                  max="24"
                  value={availableDays}
                  onChange={(event) => setAvailableDays(Number(event.target.value))}
                  className="mt-3 w-full accent-[#145adf]"
                />
              </label>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-[0.85fr_1.15fr]">
            <PhoneFrame
              src={screens.earningBlue}
              alt="Zoomli owner earning screen"
              className="h-[520px] sm:mt-10"
            />
            <div className="grid gap-5">
              {ownerSteps.map((step, index) => (
                <div key={step.title} className="rounded-[24px] bg-white p-5 text-[#102149]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef4ff] font-heading text-[18px] font-black text-[#145adf]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-4 text-[22px] font-black">{step.title}</h3>
                  <p className="mt-2 text-[14px] leading-7 text-[#61708a]">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="grid grid-cols-2 gap-4">
            <PhoneFrame src={screens.weekly} alt="Weekly earnings screen" className="h-[430px]" />
            <PhoneFrame src={screens.ownerSteps} alt="Owner onboarding steps" className="mt-10 h-[430px]" />
          </div>
          <div>
            <p className="font-heading text-[13px] font-bold uppercase tracking-[0.18em] text-[#145adf]">
              Simple process
            </p>
            <h2 className="mt-3 font-heading text-[42px] font-black uppercase leading-none text-[#102149] sm:text-[60px]">
              List. Sell. Get paid.
            </h2>
            <div className="mt-8 grid gap-4">
              {[
                ["Browse", "Filter by type, price, location, and rental duration."],
                ["Book", "Choose dates and confirm the handover details in a guided modal."],
                ["Earn", "Owners track weekly payouts and update availability anytime."],
              ].map(([title, body], index) => (
                <div key={title} className="flex gap-4 rounded-[22px] border border-[#dce6f6] p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#145adf] font-heading font-black text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-[20px] font-black text-[#102149]">{title}</h3>
                    <p className="mt-1 text-[14px] leading-7 text-[#66758f]">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <form
              className="mt-7 rounded-[26px] bg-[#101828] p-5 text-white"
              onSubmit={(event) => {
                event.preventDefault();
                setOwnerSubmitted(true);
              }}
            >
              <div className="text-[18px] font-black">Ready to get started?</div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input
                  required
                  placeholder="Email address"
                  className="h-12 rounded-[15px] border border-white/10 bg-white/10 px-4 text-[14px] outline-none placeholder:text-white/58"
                />
                <button className="h-12 rounded-[15px] bg-[#ffbc15] px-4 text-[14px] font-black uppercase tracking-[0.08em] text-[#102149]">
                  Join Zoomli
                </button>
              </div>
              {ownerSubmitted ? (
                <div className="mt-4 flex items-center gap-2 text-[13px] font-semibold text-[#a7f3d0]">
                  <CheckCircle2 size={17} /> You are on the owner onboarding list.
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f7ff] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              [ShieldCheck, "Protection checks", "Verification, trip notes, and handover summaries."],
              [Clock3, "Fast booking", "Average first booking lands within three days."],
              [CalendarDays, "Availability control", "Owners set blackout dates and repeat windows."],
            ].map(([Icon, title, body]) => {
              const TypedIcon = Icon as typeof ShieldCheck;
              return (
                <div key={title as string} className="rounded-[24px] bg-white p-6 shadow-sm">
                  <TypedIcon className="text-[#145adf]" size={28} />
                  <h3 className="mt-5 text-[22px] font-black text-[#102149]">{title as string}</h3>
                  <p className="mt-2 text-[14px] leading-7 text-[#66758f]">{body as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-heading text-[13px] font-bold uppercase tracking-[0.18em] text-[#145adf]">
            Common questions
          </p>
          <h2 className="mt-3 font-heading text-[42px] font-black uppercase leading-none text-[#102149] sm:text-[58px]">
            FAQs
          </h2>
        </div>
        <div className="mt-9 grid gap-3">
          {faqItems.map((item, index) => (
            <div key={item.question} className="rounded-[20px] border border-[#dce6f6] bg-white">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-[16px] font-black text-[#102149]"
              >
                {item.question}
                <ChevronDown
                  size={20}
                  className={`shrink-0 transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                />
              </button>
              {openFaq === index ? (
                <p className="px-5 pb-5 text-[14px] leading-7 text-[#66758f]">{item.answer}</p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-[#05070d] px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_1.3fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-[14px] leading-7 text-white/62">
              A working Zoomli-style marketplace clone for browsing, booking,
              earning, and selling car listings.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {["Browse", "For owners", "Support"].map((title) => (
              <div key={title}>
                <h3 className="text-[13px] font-black uppercase tracking-[0.12em] text-white/80">
                  {title}
                </h3>
                <div className="mt-3 grid gap-2 text-[14px] text-white/58">
                  <a href="#browse">Cars near you</a>
                  <a href="#owners">Start earning</a>
                  <a href="#faq">Questions</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>

      {bookingOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#07111f]/64 p-3 backdrop-blur-sm sm:items-center">
          <div className="max-h-[92vh] w-full max-w-[760px] overflow-y-auto rounded-[28px] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.32)]">
            <div className="flex items-center justify-between border-b border-[#e6edf8] p-5">
              <div>
                <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#145adf]">
                  Book instantly
                </div>
                <h2 className="text-[24px] font-black text-[#102149]">{selectedCar.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setBookingOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f1f5fb] text-[#102149]"
                aria-label="Close booking"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-0 md:grid-cols-[0.85fr_1.15fr]">
              <div className="relative min-h-[360px] bg-[#eef4ff]">
                <Image
                  src={selectedCar.image}
                  alt={selectedCar.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover object-top"
                />
              </div>

              <div className="p-5">
                <div className="mb-5 grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((step) => (
                    <button
                      key={step}
                      type="button"
                      onClick={() => setBookingStep(step)}
                      className={`h-2 rounded-full ${bookingStep >= step ? "bg-[#145adf]" : "bg-[#e1e8f5]"}`}
                      aria-label={`Booking step ${step}`}
                    />
                  ))}
                </div>

                {bookingStep === 1 ? (
                  <div>
                    <h3 className="text-[22px] font-black text-[#102149]">Choose trip length</h3>
                    <label className="mt-5 block">
                      <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#64748b]">
                        Rental days: {days}
                      </span>
                      <input
                        type="range"
                        min="1"
                        max="30"
                        value={days}
                        onChange={(event) => setDays(Number(event.target.value))}
                        className="mt-4 w-full accent-[#145adf]"
                      />
                    </label>
                    <div className="mt-5 grid gap-3">
                      <label className="grid gap-2 text-[13px] font-bold text-[#50607a]">
                        Pickup date
                        <input
                          type="date"
                          defaultValue="2026-07-10"
                          className="h-12 rounded-[15px] border border-[#dbe5f3] px-4 text-[#102149] outline-none"
                        />
                      </label>
                      <label className="grid gap-2 text-[13px] font-bold text-[#50607a]">
                        Pickup location
                        <input
                          defaultValue={selectedCar.location}
                          className="h-12 rounded-[15px] border border-[#dbe5f3] px-4 text-[#102149] outline-none"
                        />
                      </label>
                    </div>
                  </div>
                ) : bookingStep === 2 ? (
                  <div>
                    <h3 className="text-[22px] font-black text-[#102149]">Trip summary</h3>
                    <div className="mt-5 grid gap-3 text-[14px] font-semibold text-[#50607a]">
                      <div className="flex justify-between rounded-[16px] bg-[#f5f8ff] p-4">
                        <span>Daily rate x {days}</span>
                        <span>${selectedCar.day * days}</span>
                      </div>
                      <div className="flex justify-between rounded-[16px] bg-[#f5f8ff] p-4">
                        <span>Refundable deposit</span>
                        <span>${selectedCar.deposit}</span>
                      </div>
                      <div className="flex justify-between rounded-[16px] bg-[#145adf] p-4 text-white">
                        <span>Total due today</span>
                        <span>${estimatedTrip}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-[22px] font-black text-[#102149]">Booking confirmed</h3>
                    <div className="mt-5 rounded-[22px] bg-[#ecfdf5] p-5 text-[#047857]">
                      <CheckCircle2 size={34} />
                      <p className="mt-3 text-[15px] font-bold leading-7">
                        Your Zoomli-style booking is ready. Handover details,
                        payment estimate, and checklist are saved in this demo flow.
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-7 flex gap-3">
                  <button
                    type="button"
                    disabled={bookingStep === 1}
                    onClick={() => setBookingStep((step) => Math.max(1, step - 1))}
                    className="h-12 flex-1 rounded-[16px] border border-[#dbe5f3] text-[14px] font-black text-[#102149] disabled:opacity-40"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (bookingStep === 3) {
                        setBookingOpen(false);
                      } else {
                        setBookingStep((step) => step + 1);
                      }
                    }}
                    className="h-12 flex-1 rounded-[16px] bg-[#145adf] text-[14px] font-black uppercase tracking-[0.08em] text-white"
                  >
                    {bookingStep === 3 ? "Done" : "Continue"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
