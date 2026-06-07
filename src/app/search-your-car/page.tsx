import { BookingForm } from "@/components/site/booking-form";
import { MotionSection } from "@/components/site/motion-section";
import { SectionHeading } from "@/components/site/section-heading";

export default function SearchYourCarPage() {
  return (
    <div className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Search your car"
            title="Plan the trip and match the vehicle"
            description="This page keeps the reference site’s focused search experience while cleaning up spacing, responsiveness, and control styling."
          />
        </div>
      </section>

      <MotionSection className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <BookingForm title="Phillips Car Rental" showMapLink />
      </MotionSection>
    </div>
  );
}
