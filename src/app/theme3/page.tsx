import Link from "next/link";
import {
  CarFront,
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Smartphone,
  Star,
  Users,
} from "lucide-react";

import { Theme3BookingForm } from "@/components/site/theme3-booking-form";
import { bookingFormDefaults, fleetItems, siteConfig, testimonials } from "@/lib/site-data";

const theme3Fleet = fleetItems.slice(0, 6);
const featurePills = [
  { title: "Wide variety", text: "Sedans to people movers for Melbourne trips." },
  { title: "Easy booking", text: "Same core search flow, framed in a cleaner theme." },
  { title: "Trusted support", text: "Human help from pickup to return." },
  { title: "Flexible pickup", text: "City desk, airport hub, and local office options." },
];

const comparisonRows = [
  { title: "Variety brands", text: "Practical choices for city errands, airport pickups, and longer Victorian road trips." },
  { title: "Awesome support", text: "Melbourne-based messaging, straightforward policies, and real contact details." },
  { title: "Maximum freedom", text: "Same routing into fleets and booking, with a layout built for faster scanning." },
  { title: "Flexibility on the go", text: "Responsive cards, quick FAQs, and touch-friendly controls across the route." },
];

const blogCards = [
  "How to choose the right car for a Melbourne city week",
  "Which rental setup works best for airport pickups?",
  "Enjoy speed, choice, and total control over your booking",
];

const faqs = [
  "Can I book a Phillips Car Rental vehicle for Melbourne Airport pickup?",
  "Do you offer flexible return dates for longer Victoria trips?",
  "Can I compare categories before heading into the main fleet page?",
  "Is support available if I need help after booking?",
];

function BrandWordmark() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-11 items-center justify-center rounded-2xl bg-[#5c48ff] text-white">
        <CarFront className="size-5" />
      </div>
      <div className="leading-none">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1d1d1f]">
          Phillips Car Rental
        </p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-[#8f8f9d]">
          Melbourne Australia
        </p>
      </div>
    </div>
  );
}

function Theme3VehicleCard({ item }: { item: (typeof theme3Fleet)[number] }) {
  return (
    <article className="rounded-[26px] border border-[#eceaff] bg-white p-4 shadow-[0_16px_48px_rgba(31,24,88,0.06)]">
      <div className="rounded-[22px] bg-[#f5f4ff] p-5">
        <div className="flex h-28 items-center justify-center rounded-[20px] bg-white text-[#c3c3d5]">
          <CarFront className="size-16" />
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold text-[#202020]">{item.name}</p>
          <p className="mt-1 text-sm text-[#85859a]">{item.category}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-[#5c48ff]">${item.pricePerDay}</p>
          <p className="text-xs text-[#85859a]">/Day</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-[#85859a]">
        <span>{item.seats} seats</span>
        <span>{item.transmission}</span>
        <span>{item.fuelType}</span>
      </div>
      <Link
        href="/search-your-car"
        className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-[14px] bg-[#5c48ff] text-sm font-semibold text-white transition-colors hover:bg-[#4a38e0]"
      >
        Rent now
      </Link>
    </article>
  );
}

function InfoBadge({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-[20px] border border-[#eceaff] bg-white p-4 shadow-[0_10px_28px_rgba(31,24,88,0.04)]">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-[#f5f4ff] text-[#5c48ff]">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8f8f9d]">{label}</p>
        <p className="mt-2 text-sm text-[#202020]">{value}</p>
      </div>
    </div>
  );
}

export default function Theme3Page() {
  return (
    <div className="bg-[#fbfbff] text-[#202020]">
      <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-6 px-4 py-7 sm:px-8 lg:px-14">
        <BrandWordmark />
        <nav className="hidden items-center gap-4 rounded-full border border-[#eceaff] bg-white px-4 py-2 text-sm text-[#5f5f74] shadow-[0_10px_30px_rgba(31,24,88,0.04)] md:flex">
          <a href="#hero" className="rounded-full px-3 py-2 transition-colors hover:bg-[#f5f4ff] hover:text-[#5c48ff]">Home</a>
          <a href="#vehicles" className="rounded-full px-3 py-2 transition-colors hover:bg-[#f5f4ff] hover:text-[#5c48ff]">Vehicles</a>
          <a href="#details" className="rounded-full px-3 py-2 transition-colors hover:bg-[#f5f4ff] hover:text-[#5c48ff]">Details</a>
          <a href="#about" className="rounded-full px-3 py-2 transition-colors hover:bg-[#f5f4ff] hover:text-[#5c48ff]">About Us</a>
          <a href="#contact" className="rounded-full px-3 py-2 transition-colors hover:bg-[#f5f4ff] hover:text-[#5c48ff]">Contact Us</a>
        </nav>
        <a
          href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
          className="hidden items-center gap-3 rounded-full border border-[#eceaff] bg-white px-4 py-3 text-sm font-semibold text-[#1d1d1f] shadow-[0_10px_30px_rgba(31,24,88,0.04)] lg:flex"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-[#f5f4ff] text-[#5c48ff]">
            <Phone className="size-4" />
          </span>
          <span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-[#8f8f9d]">Need help?</span>
            <span className="block mt-1">{siteConfig.phone}</span>
          </span>
        </a>
      </header>

      <section
        id="hero"
        className="mx-auto grid w-full max-w-[1440px] gap-10 px-4 pb-10 pt-4 sm:px-8 lg:grid-cols-[0.92fr_0.78fr_0.82fr] lg:px-14 lg:items-stretch"
      >
        <div className="rounded-[34px] bg-[#5c48ff] p-8 text-white shadow-[0_30px_80px_rgba(92,72,255,0.25)] sm:p-10">
          <span className="inline-flex rounded-full bg-white/14 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/90">
            Melbourne, Victoria, Australia
          </span>
          <h1 className="mt-8 max-w-[420px] text-[44px] font-semibold leading-[1.02] sm:text-[56px]">
            Experience the road like never before
          </h1>
          <p className="mt-6 max-w-[420px] text-base leading-8 text-white/78">
            Phillips Car Rental pairs this polished theme with the same live booking behavior, fleet browsing, and Melbourne-ready pickup flow used across the rest of the app.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/our-fleets"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#ffb100] px-5 text-sm font-semibold text-[#1d1d1f] transition-colors hover:bg-[#f2a400]"
            >
              Explore fleet
            </Link>
            <Link
              href="/track-order"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Track order
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { value: "20k+", label: "Happy customers" },
              { value: "540+", label: "Cars available" },
              { value: "25+", label: "Years combined experience" },
            ].map((item) => (
              <div key={item.label} className="rounded-[22px] bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-semibold">{item.value}</p>
                <p className="mt-2 text-sm text-white/72">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[34px] border border-[#eceaff] bg-white p-6 shadow-[0_24px_72px_rgba(31,24,88,0.08)]">
          <Theme3BookingForm />
        </div>

        <div className="flex flex-col gap-4">
          {featurePills.map((item, index) => (
            <div
              key={item.title}
              className={
                index === 0
                  ? "rounded-[30px] border border-[#eceaff] bg-white p-6 shadow-[0_18px_54px_rgba(31,24,88,0.06)]"
                  : "rounded-[30px] border border-[#eceaff] bg-white p-6 shadow-[0_12px_36px_rgba(31,24,88,0.04)]"
              }
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#f5f4ff] text-[#5c48ff]">
                {index === 0 ? <Users className="size-5" /> : index === 1 ? <ShieldCheck className="size-5" /> : index === 2 ? <Phone className="size-5" /> : <MapPin className="size-5" />}
              </div>
              <h2 className="mt-5 text-xl font-semibold text-[#202020]">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#6d6d82]">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="details" className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-8 lg:px-14">
        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="rounded-[34px] bg-[radial-gradient(circle_at_top_left,#8f80ff_0%,#5c48ff_48%,#33219d_100%)] p-8 text-white shadow-[0_24px_72px_rgba(92,72,255,0.24)]">
            <div className="rounded-[28px] bg-white/10 p-6 backdrop-blur-sm">
              <div className="grid grid-cols-3 gap-3">
                {["Sedan", "SUV", "Hatchback", "People Mover", "Airport", "Long Trip"].map((item) => (
                  <div key={item} className="rounded-[20px] bg-white/12 p-4 text-center text-sm font-medium">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 rounded-[30px] bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">Phillips Car Rental</p>
              <p className="mt-4 max-w-[440px] text-[28px] font-semibold leading-[1.2]">
                Choose the car that suits your Melbourne trip, then continue into the existing live fleet search.
              </p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {comparisonRows.map((item) => (
              <article key={item.title} className="rounded-[30px] border border-[#eceaff] bg-white p-6 shadow-[0_14px_40px_rgba(31,24,88,0.05)]">
                <h3 className="text-[24px] font-semibold text-[#202020]">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#6d6d82]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="vehicles" className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-8 lg:px-14">
        <div className="flex flex-col gap-4 sm:items-center sm:text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8f8f9d]">
            Select a vehicle group
          </span>
          <h2 className="text-[36px] font-semibold text-[#202020]">Browse the Melbourne lineup</h2>
          <p className="max-w-[720px] text-sm leading-8 text-[#6d6d82]">
            Same Phillips Car Rental data, cleaner product cards, and a mockup-inspired silhouette treatment so the route feels native to this Figma theme.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {theme3Fleet.map((item) => (
            <Theme3VehicleCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-8 lg:px-14">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[34px] border border-[#eceaff] bg-white p-8 shadow-[0_18px_54px_rgba(31,24,88,0.05)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8f8f9d]">Download mobile app</p>
            <h2 className="mt-4 text-[34px] font-semibold text-[#202020]">Manage your booking from anywhere in Melbourne</h2>
            <p className="mt-4 max-w-[520px] text-sm leading-8 text-[#6d6d82]">
              This section echoes the app/download block from the mockup while keeping it grounded in Phillips Car Rental&apos;s existing vehicle search and order tracking routes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="inline-flex h-11 items-center gap-2 rounded-full border border-[#d9d6ff] bg-white px-5 text-sm font-semibold text-[#202020]">
                <Smartphone className="size-4 text-[#5c48ff]" />
                App Store
              </button>
              <button className="inline-flex h-11 items-center gap-2 rounded-full border border-[#d9d6ff] bg-white px-5 text-sm font-semibold text-[#202020]">
                <Smartphone className="size-4 text-[#5c48ff]" />
                Google Play
              </button>
            </div>
          </div>
          <div className="rounded-[34px] bg-[#5c48ff] p-8 text-white shadow-[0_28px_80px_rgba(92,72,255,0.22)]">
            <div className="grid h-full gap-6 sm:grid-cols-2">
              <div className="rounded-[28px] border border-white/16 bg-white/10 p-6 backdrop-blur-sm">
                <div className="mx-auto h-[280px] w-[150px] rounded-[34px] border-[10px] border-white bg-[#fbfbff]" />
              </div>
              <div className="rounded-[28px] border border-white/16 bg-white/10 p-6 backdrop-blur-sm sm:translate-y-10">
                <div className="mx-auto h-[280px] w-[150px] rounded-[34px] border-[10px] border-white bg-[#fbfbff]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-8 lg:px-14">
        <div className="flex flex-col gap-4 sm:items-center sm:text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8f8f9d]">Reviews from our customers</span>
          <h2 className="text-[36px] font-semibold text-[#202020]">What Melbourne renters say</h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-[30px] border border-[#eceaff] bg-white p-6 shadow-[0_14px_40px_rgba(31,24,88,0.05)]">
              <div className="flex items-center gap-1 text-[#ffb100]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-5 text-sm leading-8 text-[#6d6d82]">{item.quote}</p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-[#f5f4ff] text-sm font-semibold text-[#5c48ff]">
                  {item.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <p className="font-semibold text-[#202020]">{item.name}</p>
                  <p className="text-sm text-[#8f8f9d]">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-4 py-8 sm:px-8 lg:px-0">
        <div className="rounded-[34px] border border-[#eceaff] bg-white p-6 shadow-[0_18px_54px_rgba(31,24,88,0.05)] sm:p-8">
          <div className="flex flex-col gap-3 sm:items-center sm:text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8f8f9d]">
              Top car rental questions
            </span>
            <h2 className="text-[34px] font-semibold text-[#202020]">Frequently asked questions</h2>
          </div>
          <div className="mt-8 space-y-3">
            {faqs.map((item) => (
              <details key={item} className="group rounded-[20px] border border-[#eceaff] bg-[#faf9ff] px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-[#202020]">
                  {item}
                  <ChevronRight className="size-4 text-[#5c48ff] transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-4 text-sm leading-7 text-[#6d6d82]">
                  Yes. This themed route still feeds into the same Phillips Car Rental Melbourne booking workflow and support paths as the rest of the app.
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-8 lg:px-14">
        <div className="rounded-[36px] bg-[linear-gradient(135deg,#5c48ff_0%,#7a68ff_60%,#3c2ac7_100%)] p-8 text-white shadow-[0_28px_80px_rgba(92,72,255,0.2)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-white/14 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/85">
                Melbourne focus
              </span>
              <h2 className="mt-6 text-[36px] font-semibold leading-[1.1]">
                Looking for a car near the airport, CBD, or Keysborough?
              </h2>
              <p className="mt-4 max-w-[520px] text-sm leading-8 text-white/78">
                Use the same fleet search, but with a destination-first callout that matches the bold lower-page promo style from the Figma mockup.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
              <div className="flex h-14 items-center rounded-[18px] bg-white px-5 text-sm text-[#4b4b57]">
                {bookingFormDefaults.locations[1]}
              </div>
              <Link
                href="/search-your-car"
                className="inline-flex h-14 items-center justify-center rounded-[18px] bg-[#ffb100] px-6 text-sm font-semibold text-[#1d1d1f] transition-colors hover:bg-[#f2a400]"
              >
                Search
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-8 lg:px-14">
        <div className="grid gap-5 lg:grid-cols-4">
          <InfoBadge icon={<MapPin className="size-5" />} label="Address" value={siteConfig.address} />
          <InfoBadge icon={<Mail className="size-5" />} label="Email" value={siteConfig.email} />
          <InfoBadge icon={<Phone className="size-5" />} label="Phone" value={siteConfig.phone} />
          <InfoBadge icon={<Clock3 className="size-5" />} label="Opening hours" value="Daily: 8:00am - 9:00pm AEST" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-8 lg:px-14">
        <div className="flex flex-col gap-4 sm:items-center sm:text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8f8f9d]">
            Latest blog posts & news
          </span>
          <h2 className="text-[36px] font-semibold text-[#202020]">Guides and updates for Melbourne renters</h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {blogCards.map((title, index) => (
            <article key={title} className="rounded-[28px] border border-[#eceaff] bg-white p-4 shadow-[0_14px_40px_rgba(31,24,88,0.05)]">
              <div
                className={
                  index === 0
                    ? "h-52 rounded-[22px] bg-[linear-gradient(135deg,#dfe3ff,#b1bdfd,#8f9efb)]"
                    : index === 1
                      ? "h-52 rounded-[22px] bg-[linear-gradient(135deg,#d5d8ea,#b7bbd8,#939abf)]"
                      : "h-52 rounded-[22px] bg-[linear-gradient(135deg,#f0e5ff,#d3c2ff,#b29dff)]"
                }
              />
              <div className="mt-5">
                <h3 className="text-xl font-semibold text-[#202020]">{title}</h3>
                <p className="mt-3 text-sm text-[#8f8f9d]">News / 12 April 2024</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-4 py-4 sm:px-8 lg:px-14">
        <div className="grid grid-cols-2 gap-6 rounded-[34px] border border-[#eceaff] bg-white px-6 py-10 text-center text-[#9c9caf] shadow-[0_14px_40px_rgba(31,24,88,0.04)] sm:grid-cols-3 lg:grid-cols-6">
          {["BMW", "LEXUS", "HONDA", "HYUNDAI", "TOYOTA", "KIA"].map((brand) => (
            <p key={brand} className="text-lg font-semibold tracking-[0.18em]">
              {brand}
            </p>
          ))}
        </div>
      </section>

      <footer className="mt-16 border-t border-[#eceaff] bg-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-8 lg:px-14">
          <div className="flex flex-col gap-6 border-b border-[#eceaff] pb-10 lg:flex-row lg:items-center lg:justify-between">
            <BrandWordmark />
            <div className="grid gap-4 sm:grid-cols-3 lg:w-[820px]">
              <div className="flex items-center gap-3 text-sm text-[#5f5f74]">
                <MapPin className="size-4 text-[#5c48ff]" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#5f5f74]">
                <Mail className="size-4 text-[#5c48ff]" />
                <span>{siteConfig.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#5f5f74]">
                <Phone className="size-4 text-[#5c48ff]" />
                <span>{siteConfig.phone}</span>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.8fr_0.8fr_0.9fr]">
            <div>
              <p className="max-w-[360px] text-sm leading-8 text-[#6d6d82]">
                Phillips Car Rental in Melbourne, Australia keeps this route visually aligned to the community Figma template while preserving the existing fleet, booking, and order-tracking behavior.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#202020]">Useful links</h3>
              <div className="mt-5 space-y-3 text-sm text-[#6d6d82]">
                <p>About us</p>
                <p>Contact us</p>
                <p>Gallery</p>
                <p>Blog</p>
                <p>F.A.Q</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#202020]">Vehicles</h3>
              <div className="mt-5 space-y-3 text-sm text-[#6d6d82]">
                {["Sedan", "SUV", "Hatchback", "People Mover", "Airport Transfer"].map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#202020]">Search routes</h3>
              <div className="mt-5 space-y-3 text-sm text-[#6d6d82]">
                <p>Melbourne CBD</p>
                <p>Melbourne Airport</p>
                <p>Keysborough Office</p>
                <p>Southern Cross Desk</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-[#eceaff] bg-[#f5f4ff] py-4 text-center text-xs uppercase tracking-[0.22em] text-[#6d6d82]">
          © Phillips Car Rental Melbourne 2026
        </div>
      </footer>
    </div>
  );
}
