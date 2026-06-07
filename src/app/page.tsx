import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, ChevronRight, Quote } from "lucide-react";

import { BookingForm } from "@/components/site/booking-form";
import { FleetCard } from "@/components/site/fleet-card";
import { MotionSection } from "@/components/site/motion-section";
import { SectionHeading } from "@/components/site/section-heading";
import {
  carCategories,
  fleetItems,
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
      <section
        className="relative overflow-hidden bg-[#f8faff] pb-[210px] text-[#272727]"
        style={{
          backgroundImage:
            "url('https://mobiscarrental.com.au/wp-content/uploads/2024/09/newbanner-1.jpg')",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          borderBottomLeftRadius: "40px",
          borderBottomRightRadius: "40px",
        }}
      >
        <div className="mx-auto grid w-full max-w-[1290px] gap-10 px-4 pb-24 pt-14 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:items-center lg:pt-20">
          <div className="z-10 flex flex-col justify-center">
            <h1 className="max-w-[760px] text-[50px] font-semibold uppercase leading-[1.08] text-[#272727] sm:text-[64px] lg:text-[78px]">
              PHILLIPS CAR RENTAL
            </h1>
            <p className="mt-10 max-w-[760px] text-[26px] font-light leading-[1.45] text-[#727272]">
              {siteConfig.tagline}
            </p>
            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
              <Link href="/our-fleets" className="mobis-button">
                Find a car
                <span aria-hidden="true" className="ml-3 text-[20px] tracking-normal">
                  →
                </span>
              </Link>
              <Link href="#how-it-works" className="mobis-link">
                Learn more
                <span aria-hidden="true" className="text-[20px] tracking-normal">
                  →
                </span>
              </Link>
            </div>
            <div className="mt-12 flex items-end gap-3 text-[#272727]">
              <span className="font-heading text-[54px] font-medium leading-none sm:text-[76px]">
                $15.00
              </span>
              <span className="pb-2 text-[26px] font-light text-[#727272]">/Per Day</span>
            </div>
          </div>

          <div className="relative min-h-[320px] lg:min-h-[620px]">
            <Image
              src="https://mobiscarrental.com.au/wp-content/uploads/2024/09/car-home-2-1.png"
              alt="Phillips Car Rental featured vehicle"
              fill
              priority
              className="object-contain object-center"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
        </div>
      </section>

      <div className="relative z-20 mx-auto -mt-[170px] w-full max-w-[1390px] px-4 sm:px-6 lg:px-8">
        <BookingForm compact title="" />
      </div>

      <div id="how-it-works" />
      <MotionSection className="mx-auto w-full max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8" delay={0.05}>
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
              alt="Interior detail for Phillips Car Rental"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center gap-6">
            <SectionHeading
              eyebrow="About us"
              title="Modern convenience, grounded in the same practical rental experience people already trust"
              description="This first version mirrors the familiar Mobis-style information architecture while polishing the experience into a cleaner, more responsive Phillips Car Rental brand for Melbourne, Australia."
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
            description="Phillips Car Rental keeps the signal strong for Melbourne, Australia: dependable support, clean interfaces, and straightforward booking tools."
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
