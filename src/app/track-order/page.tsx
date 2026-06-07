import { MotionSection } from "@/components/site/motion-section";
import { SectionHeading } from "@/components/site/section-heading";
import { TrackOrderForm } from "@/components/site/track-order-form";

export default function TrackOrderPage() {
  return (
    <div className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Track order"
            title="Keep the order lookup simple"
            description="A compact tracking surface with useful states instead of a dead-end input."
          />
        </div>
      </section>

      <MotionSection className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <TrackOrderForm />
      </MotionSection>
    </div>
  );
}
