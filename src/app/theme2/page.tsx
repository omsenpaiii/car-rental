import Link from "next/link";
import { CarFront, CheckCircle2, Mail, MapPin, Phone, ShieldCheck, Sparkles, Star, Users } from "lucide-react";

import { Theme2BookingForm } from "@/components/site/theme2-booking-form";
import { fleetItems, services, siteConfig, testimonials, whyChooseUs } from "@/lib/site-data";

const featuredFleet = fleetItems.slice(0, 3);
const featureHighlights = [
  { icon: CarFront, title: "Easy Rent", description: "Practical booking flows that get you from browsing to driving without fuss." },
  { icon: Sparkles, title: "Premium Quality", description: "Clean, road-ready vehicles presented in a more elevated editorial theme." },
  { icon: Users, title: "Professional Agent", description: "Helpful human support when dates shift or you want advice before booking." },
  { icon: ShieldCheck, title: "Car Safety", description: "Dependable vehicles and clear rental details for everyday city and long-trip use." },
  { icon: CheckCircle2, title: "Referral", description: "Share-ready links and repeat-booking patterns that keep the experience lightweight." },
  { icon: Star, title: "Live Monitoring", description: "Track order and support visibility still map back to the same core flow." },
];

const serviceCards = [
  {
    title: "Instant Rent",
    description: "Reserve a car quickly with a lighter, more editorial landing experience.",
    image: "/theme2/service-1.jpg",
  },
  {
    title: "Private Driver",
    description: "A premium visual theme for users who want a more concierge-like first impression.",
    image: "/theme2/service-2.jpg",
  },
  {
    title: "Long Trip",
    description: "The same search and fleet logic, styled for comfortable long-distance planning.",
    image: "/theme2/service-3.jpg",
  },
];

function Theme2FleetCard({ item }: { item: (typeof featuredFleet)[number] }) {
  return (
    <article className="overflow-hidden rounded-[12px] border border-[#f3dada] bg-white shadow-[0_18px_40px_rgba(245,87,87,0.08)]">
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-[#fff7f7] px-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.name}
          className="max-h-full w-full object-contain"
        />
      </div>
      <div className="space-y-5 p-5">
        <div className="space-y-2">
          <h3 className="text-[24px] font-medium text-[#525252]">{item.name}</h3>
          <div className="flex items-center justify-between gap-3 text-sm text-[#9a9a9a]">
            <p className="text-[28px] font-semibold text-[#525252]">${item.pricePerDay}/Day</p>
            <span>{item.category}</span>
          </div>
        </div>
        <Link
          href="/search-your-car"
          className="inline-flex h-11 w-full items-center justify-center rounded-[6px] bg-[#f55757] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#de4b4b]"
        >
          Rent Now
        </Link>
      </div>
    </article>
  );
}

export default function Theme2Page() {
  return (
    <div className="bg-white text-[#525252]">
      <header className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/theme2" className="text-[22px] font-extrabold uppercase tracking-[0.06em] text-[#f55757] sm:text-[24px]">
          Phillips Car Rental
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-[#525252] md:flex">
          <a href="#about" className="transition-colors hover:text-[#f55757]">About</a>
          <a href="#cars" className="transition-colors hover:text-[#f55757]">Cars</a>
          <a href="#services" className="transition-colors hover:text-[#f55757]">Services</a>
          <a href="#contact" className="transition-colors hover:text-[#f55757]">Contact</a>
        </nav>
      </header>

      <section className="mx-auto grid w-full max-w-[1240px] gap-10 px-4 pb-16 pt-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="flex flex-col justify-center">
          <span className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#f55757]">
            Melbourne, Australia
          </span>
          <h1 className="max-w-[620px] text-[42px] font-semibold leading-[1.08] text-[#525252] sm:text-[56px] lg:text-[68px]">
            We Have Prepared a Car For Your Trip
          </h1>
          <p className="mt-6 max-w-[560px] text-[17px] leading-8 text-[#8c8c8c]">
            Phillips Car Rental in Melbourne, Australia keeps the same booking logic and fleet flow here, but borrows the softer editorial theme, spacing, and accent treatment from the Figma concept.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/our-fleets"
              className="inline-flex h-12 items-center justify-center rounded-[8px] bg-[#f55757] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#de4b4b]"
            >
              Get In Touch
            </Link>
            <Link
              href="/search-your-car"
              className="inline-flex h-12 items-center justify-center rounded-[8px] border border-[#f5c7c7] px-6 text-sm font-semibold text-[#f55757] transition-colors hover:bg-[#fff2f2]"
            >
              Our Car
            </Link>
          </div>
        </div>

        <div className="relative flex min-h-[420px] items-center justify-center rounded-[28px] bg-[#fff6f6] p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/theme2/hero-map.png"
            alt="Decorative route map"
            className="absolute inset-0 h-full w-full rounded-[28px] object-cover opacity-60"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://mobiscarrental.com.au/wp-content/uploads/2024/09/car-home-2-1.png"
            alt="Featured Phillips Car Rental vehicle"
            className="relative z-10 w-full max-w-[640px] object-contain drop-shadow-[0_26px_36px_rgba(0,0,0,0.18)]"
          />
        </div>
      </section>

      <div className="mx-auto -mt-2 w-full max-w-[1040px] px-4 sm:px-6 lg:px-8">
        <Theme2BookingForm />
      </div>

      <section className="mx-auto mt-12 w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 border-y border-[#f3dada] py-10 text-center text-[#b0b0b0] sm:grid-cols-4 xl:grid-cols-8">
          {["BMW", "Lexus", "Mercedes", "Honda", "Hyundai", "Nissan", "Toyota", "KIA"].map((brand) => (
            <div key={brand} className="text-lg font-medium tracking-[0.08em]">
              {brand}
            </div>
          ))}
        </div>
      </section>

      <section id="cars" className="mx-auto w-full max-w-[1240px] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[620px] text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f55757]">Popular Car</p>
          <h2 className="mt-4 text-[34px] font-medium text-[#525252] sm:text-[44px]">
            Choose Your Suitable Car
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-[#9a9a9a]">
            We present the same core fleet dataset in a softer landing-page theme inspired by the Figma reference.
          </p>
        </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {featuredFleet.map((item) => (
            <Theme2FleetCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/our-fleets"
            className="inline-flex h-11 items-center justify-center rounded-[6px] bg-[#f55757] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#de4b4b]"
          >
            See All
          </Link>
        </div>
      </section>

      <section
        id="services"
        className="relative overflow-hidden py-24"
        style={{
          background:
            "linear-gradient(180deg, rgba(82,82,82,0.05), rgba(82,82,82,0.12))",
        }}
      >
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/theme2/services-bg.jpg"
            alt=""
            className="h-full w-full object-cover opacity-5"
          />
        </div>
        <div className="relative mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[800px] text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f55757]">Services</p>
            <h2 className="mt-4 text-[34px] font-medium text-[#525252] sm:text-[44px]">Our Services</h2>
            <p className="mt-4 text-[15px] leading-7 text-[#9a9a9a]">
              The underlying rental journey stays the same, but this endpoint presents Phillips Car Rental&apos;s Melbourne service offering in the mood of the Figma concept.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {serviceCards.map((card, index) => (
              <article key={card.title} className="relative overflow-hidden rounded-[10px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.image} alt={card.title} className="h-[430px] w-full object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(52,31,31,0.2),rgba(52,31,31,0.82))]" />
                <div className="absolute inset-x-0 bottom-0 flex h-full flex-col items-center justify-center px-8 text-center text-white">
                  <div className="mb-6 rounded-full border border-white/30 bg-white/10 p-5 backdrop-blur-sm">
                    {index === 0 ? <CarFront className="size-10" /> : index === 1 ? <Users className="size-10" /> : <MapPin className="size-10" />}
                  </div>
                  <h3 className="text-[28px] font-medium">{card.title}</h3>
                  <p className="mt-4 max-w-[280px] text-sm leading-7 text-white/80">{card.description}</p>
                  <button className="mt-8 rounded-[6px] border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#525252]">
                    Read More
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto w-full max-w-[1240px] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f55757]">Our Advantages</p>
          <h2 className="mt-4 text-[34px] font-medium text-[#525252] sm:text-[44px]">Why Choose Us ?</h2>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featureHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-[10px] border border-[#f3dada] bg-white p-6 shadow-[0_12px_30px_rgba(245,87,87,0.06)]">
                <div className="mb-5 inline-flex rounded-full bg-[#fff0f0] p-4 text-[#f55757]">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-[22px] font-medium text-[#525252]">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-[#9a9a9a]">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="contact" className="bg-[#fff7f7] py-24">
        <div className="mx-auto grid w-full max-w-[1240px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f55757]">Get In Touch</p>
            <h2 className="mt-4 text-[34px] font-medium text-[#525252] sm:text-[44px]">Contact Us</h2>
            <p className="mt-4 max-w-[480px] text-[15px] leading-7 text-[#9a9a9a]">
              Keep the same Phillips Car Rental support channels, but present them through a Melbourne, Australia landing page theme that feels closer to the community design.
            </p>

            <div className="mt-10 space-y-5 text-[15px] text-[#808080]">
              <div className="flex items-start gap-4">
                <Mail className="mt-1 size-5 text-[#f55757]" />
                <span>{siteConfig.email}</span>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="mt-1 size-5 text-[#f55757]" />
                <span>{siteConfig.phone}</span>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 size-5 text-[#f55757]" />
                <span>{siteConfig.address}</span>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[18px] border border-[#f3dada] bg-white p-3 shadow-[0_18px_40px_rgba(245,87,87,0.06)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/theme2/hero-map.png"
              alt="Map preview"
              className="h-[360px] w-full rounded-[12px] object-cover"
            />
            <div className="mt-4 flex justify-center">
              <Link
                href="/track-order"
                className="inline-flex h-11 items-center justify-center rounded-[6px] bg-[#f55757] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#de4b4b]"
              >
                Track Order
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1240px] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f55757]">Our Review</p>
          <h2 className="mt-4 text-[34px] font-medium text-[#525252] sm:text-[44px]">What They Say ?</h2>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-[12px] border border-[#f3dada] bg-white p-6 shadow-[0_18px_40px_rgba(245,87,87,0.05)]">
              <div className="flex items-center gap-1 text-[#f55757]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-5 text-[15px] leading-7 text-[#8c8c8c]">{item.quote}</p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-[#fff0f0] text-sm font-semibold text-[#f55757]">
                  {item.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <p className="font-medium text-[#525252]">{item.name}</p>
                  <p className="text-sm text-[#9a9a9a]">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#fff0f0] py-16">
        <div className="mx-auto flex w-full max-w-[960px] flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f55757]">Subscribe Our News</p>
            <h2 className="mt-4 text-[30px] font-medium text-[#525252]">Stay in the loop for new cars and deals</h2>
          </div>
          <div className="flex w-full max-w-[620px] flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Input your e-mail here"
              className="h-12 flex-1 rounded-[6px] border border-[#f3dada] bg-white px-4 text-sm text-[#737373] outline-none"
            />
            <button className="h-12 rounded-[6px] bg-[#f55757] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#de4b4b]">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#f3dada] bg-white">
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr] lg:px-8">
          <div className="space-y-5">
            <p className="text-[22px] font-extrabold uppercase tracking-[0.06em] text-[#f55757] sm:text-[24px]">Phillips Car Rental</p>
            <p className="max-w-[360px] text-[15px] leading-7 text-[#9a9a9a]">
              We keep the underlying rental product practical for Melbourne, Australia, but this endpoint gives Phillips Car Rental a softer landing-page voice from the Figma community theme.
            </p>
          </div>
          <div>
            <h3 className="text-[22px] font-medium text-[#525252]">Company</h3>
            <div className="mt-5 space-y-3 text-[15px] text-[#9a9a9a]">
              <p>About Us</p>
              <p>Services</p>
              <p>Cars</p>
              <p>Our Partner</p>
            </div>
          </div>
          <div>
            <h3 className="text-[22px] font-medium text-[#525252]">Services</h3>
            <div className="mt-5 space-y-3 text-[15px] text-[#9a9a9a]">
              {services.slice(0, 3).map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[22px] font-medium text-[#525252]">Support</h3>
            <div className="mt-5 space-y-3 text-[15px] text-[#9a9a9a]">
              {whyChooseUs.slice(0, 4).map((item) => (
                <p key={item.title}>{item.title}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#f55757] py-4 text-center text-sm font-medium text-white">
          Phillips Car Rental Theme 2 keeps the same rental flow, styled after the Figma concept for Melbourne, Australia.
        </div>
      </footer>
    </div>
  );
}
