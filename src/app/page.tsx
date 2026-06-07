import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Quote, Star } from "lucide-react";

import { BookingForm } from "@/components/site/booking-form";
import { FleetCard } from "@/components/site/fleet-card";
import { MotionSection } from "@/components/site/motion-section";
import { SectionHeading } from "@/components/site/section-heading";
import {
  carCategories,
  fleetItems,
  heroMetrics,
  howItWorks,
  services,
  siteConfig,
  testimonials,
  whyChooseUs,
} from "@/lib/site-data";

export default function Home() {
  const featuredFleet = fleetItems.slice(0, 4);

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=1600&q=80"
            alt="Philips Car Rental hero vehicle"
            fill
            priority
            className="object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.28),transparent_30%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(15,23,42,0.76))]" />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center gap-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/80">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              Trusted by Melbourne drivers across business, airport, and family travel
            </div>
            <div className="flex flex-col gap-5">
              <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                {siteConfig.brand}
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-200">{siteConfig.tagline}</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/our-fleets"
                className="inline-flex h-12 items-center justify-center rounded-full bg-amber-400 px-6 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-amber-300"
              >
                View available cars
              </Link>
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Call {siteConfig.phone}
              </a>
            </div>

            <div className="grid max-w-xl grid-cols-3 gap-3">
              {heroMetrics.map((metric) => (
                <div key={metric.label} className="rounded-[22px] border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
                  <p className="text-2xl font-semibold text-white">{metric.value}</p>
                  <p className="mt-1 text-sm text-slate-300">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pt-4">
            <BookingForm compact title="Search for your car" />
          </div>
        </div>
      </section>

      <MotionSection className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8" delay={0.05}>
        <SectionHeading
          eyebrow="How it works"
          title="A booking flow that stays quick, clear, and road-focused"
          description="We kept the structure familiar on purpose: simple steps, practical filters, and a clean path from browsing to booking."
          align="center"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {howItWorks.map((item) => (
            <div key={item.step} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-50px_rgba(15,23,42,0.35)]">
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-500">
                Step {item.step}
              </span>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="bg-slate-50" delay={0.08}>
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:px-8">
          <div className="relative min-h-[360px] overflow-hidden rounded-[32px]">
            <Image
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=80"
              alt="Interior detail for Philips Car Rental"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center gap-6">
            <SectionHeading
              eyebrow="About us"
              title="Modern convenience, grounded in the same practical rental experience people already trust"
              description="This first version mirrors the familiar Mobis-style information architecture while polishing the experience into a cleaner, more responsive Philips brand."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {whyChooseUs.map((item) => (
                <div key={item.title} className="rounded-[24px] border border-slate-200 bg-white p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex size-8 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                      <Check className="size-4" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8" delay={0.1}>
        <SectionHeading
          eyebrow="Popular categories"
          title="Vehicles matched to the way people actually move"
          description="Comfortable commuter sedans, family SUVs, tidy hatchbacks, and people movers for bigger plans."
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {carCategories.map((category) => (
            <div key={category.title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-50px_rgba(15,23,42,0.35)]">
              <h3 className="text-2xl font-semibold tracking-tight text-slate-950">{category.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{category.description}</p>
              <Link
                href={`/our-fleets?category=${encodeURIComponent(category.title)}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-950"
              >
                Explore fleet
                <ChevronRight className="size-4 text-amber-500" />
              </Link>
            </div>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="bg-slate-950 text-white" delay={0.12}>
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="flex flex-col gap-5">
          <SectionHeading
            eyebrow="Why choose us"
            title="Everything important, without the clutter"
            description="Philips keeps the signal strong: dependable support, clean interfaces, and straightforward booking tools."
            inverted
          />
            <div className="flex flex-col gap-4">
              {services.map((service) => (
                <div key={service} className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-white/5 px-5 py-4">
                  <div className="flex size-9 items-center justify-center rounded-full bg-amber-400 text-slate-950">
                    <ArrowRight className="size-4" />
                  </div>
                  <p className="font-medium text-slate-100">{service}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="rounded-[28px] border border-white/10 bg-white/6 p-6">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8" delay={0.14}>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Our fleet cars"
            title="Driven by your needs"
            description="A clean featured selection that stays visually close to the reference while using fresh imagery and modern card treatment."
          />
          <Link
            href="/our-fleets"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950"
          >
            View available cars
            <ChevronRight className="size-4 text-amber-500" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredFleet.map((item) => (
            <FleetCard key={item.id} item={item} />
          ))}
        </div>
      </MotionSection>

      <MotionSection className="bg-slate-50" delay={0.16}>
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Testimonials"
            title="What customers notice first"
            description="Fast pickup, clear pricing, and enough polish that the whole experience feels taken care of."
            align="center"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-50px_rgba(15,23,42,0.35)]">
                <Quote className="size-8 text-amber-400" />
                <p className="mt-5 text-base leading-7 text-slate-600">{testimonial.quote}</p>
                <div className="mt-6">
                  <p className="font-semibold text-slate-950">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>
    </div>
  );
}
