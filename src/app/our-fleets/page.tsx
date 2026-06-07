import type { FleetCategory } from "@/lib/site-data";
import { BookingForm } from "@/components/site/booking-form";
import { FleetCatalog } from "@/components/site/fleet-catalog";
import { MotionSection } from "@/components/site/motion-section";
import { SectionHeading } from "@/components/site/section-heading";

type FleetsPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function OurFleetsPage({ searchParams }: FleetsPageProps) {
  const params = await searchParams;
  const initialCategory = (params.category as FleetCategory | undefined) ?? "Any";

  return (
    <div className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our fleets"
            title="Browse the Phillips Car Rental fleet"
            description="The page mirrors the familiar listing-first flow: filters up top, available cars underneath, and a practical grid built for quick comparison."
          />
          <div className="mt-10">
            <BookingForm title="Refine your search" compact initialCategory={initialCategory} />
          </div>
        </div>
      </section>

      <MotionSection className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <FleetCatalog initialCategory={initialCategory} />
      </MotionSection>
    </div>
  );
}
