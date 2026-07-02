"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ChevronLeft, ChevronRight, LockKeyhole, Upload } from "lucide-react";

import { useAuth } from "@/components/portal/auth-provider";
import {
  Theme5AuthModal,
  Theme5Shell,
  theme5Button,
  theme5SecondaryButton,
} from "@/components/theme5/theme5-ui";
import { theme5BodyTypes, theme5FuelTypes, theme5Transmissions } from "@/lib/theme5";

const initialListing = {
  make: "",
  model: "",
  year: "2024",
  location: "Melbourne, VIC",
  bodyType: "Sedan",
  fuelType: "Petrol",
  transmission: "Automatic",
  seats: "5",
  colour: "",
  odometer: "25000",
  hasLeatherSeats: false,
  hasFourByFour: false,
  description: "",
  imageUrl: "",
  enableRent: true,
  pricePerDay: "120",
  enableRentToOwn: false,
  rentToOwnPrice: "42000",
  rentToOwnMonths: "36",
  enableDirectSale: false,
  salePrice: "45000",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
};

export default function Theme5ListYourCarPage() {
  const router = useRouter();
  const { user, profile, isLoading, refresh } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialListing);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm((current) => ({
        ...current,
        contactName: current.contactName || profile.full_name || "",
        contactEmail: current.contactEmail || profile.email || "",
        contactPhone: current.contactPhone || profile.phone || "",
      }));
    }
  }, [profile]);

  const update = (key: keyof typeof form, value: string | boolean) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!user) {
      setAuthOpen(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/portal/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          year: Number(form.year),
          seats: Number(form.seats),
          odometer: Number(form.odometer),
          pricePerDay: form.enableRent ? Number(form.pricePerDay) : null,
          rentToOwnPrice: form.enableRentToOwn ? Number(form.rentToOwnPrice) : null,
          rentToOwnMonths: form.enableRentToOwn ? Number(form.rentToOwnMonths) : null,
          salePrice: form.enableDirectSale ? Number(form.salePrice) : null,
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Unable to submit listing.");
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit listing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Theme5Shell>
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-[8px] bg-[#07111f] p-6 text-white sm:p-8">
          <h1 className="font-heading text-4xl font-black uppercase sm:text-6xl">List your car</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
            Add vehicle specs, pricing, and owner contact details. New listings are saved to your account and sent for review.
          </p>
        </section>

        {!isLoading && !user ? (
          <section className="mt-8 rounded-[8px] border border-[#dfe7f3] bg-white p-8 text-center">
            <LockKeyhole className="mx-auto size-10 text-[#1157d9]" />
            <h2 className="mt-4 text-2xl font-black text-[#10213f]">Log in to list a car</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-7 text-[#60728d]">
              Your account stores draft ownership details, review status, and future renter or buyer enquiries.
            </p>
            <button type="button" onClick={() => setAuthOpen(true)} className={`${theme5Button} mt-6`}>
              Log in or register
            </button>
          </section>
        ) : null}

        {user ? (
          <form onSubmit={submit} className="mt-8 rounded-[8px] border border-[#dfe7f3] bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-8 grid grid-cols-3 gap-2">
              {["Vehicle", "Pricing", "Contact"].map((label, index) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setStep(index + 1)}
                  className={`rounded-[6px] px-3 py-3 text-xs font-black uppercase tracking-normal ${
                    step === index + 1 ? "bg-[#1157d9] text-white" : "bg-[#f4f8fe] text-[#60728d]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {step === 1 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  ["Make", "make", "Toyota"],
                  ["Model", "model", "Camry"],
                  ["Year", "year", "2024"],
                  ["Location", "location", "Melbourne, VIC"],
                  ["Colour", "colour", "White"],
                  ["Kilometres", "odometer", "45000"],
                  ["Seats", "seats", "5"],
                  ["Image URL", "imageUrl", "https://..."],
                ].map(([label, key, placeholder]) => (
                  <label key={key} className="grid gap-2 text-xs font-black uppercase tracking-normal text-[#60728d]">
                    {label}
                    <input
                      value={String(form[key as keyof typeof form])}
                      onChange={(event) => update(key as keyof typeof form, event.target.value)}
                      placeholder={placeholder}
                      className="h-12 rounded-[6px] border border-[#dfe7f3] px-3 text-sm font-bold text-[#10213f] outline-none focus:border-[#1157d9]"
                      required={!["colour", "imageUrl"].includes(key)}
                    />
                  </label>
                ))}
                <SelectField label="Body type" value={form.bodyType} options={theme5BodyTypes} onChange={(value) => update("bodyType", value)} />
                <SelectField label="Fuel" value={form.fuelType} options={theme5FuelTypes} onChange={(value) => update("fuelType", value)} />
                <SelectField label="Transmission" value={form.transmission} options={theme5Transmissions} onChange={(value) => update("transmission", value)} />
                <label className="grid gap-2 md:col-span-2">
                  <span className="text-xs font-black uppercase tracking-normal text-[#60728d]">Description</span>
                  <textarea
                    value={form.description}
                    onChange={(event) => update("description", event.target.value)}
                    className="min-h-28 rounded-[6px] border border-[#dfe7f3] px-3 py-3 text-sm font-bold text-[#10213f] outline-none focus:border-[#1157d9]"
                    placeholder="Condition, service history, pickup notes, features..."
                  />
                </label>
                <Checkbox label="Leather seats" checked={form.hasLeatherSeats} onChange={(value) => update("hasLeatherSeats", value)} />
                <Checkbox label="4x4 / AWD" checked={form.hasFourByFour} onChange={(value) => update("hasFourByFour", value)} />
              </div>
            ) : null}

            {step === 2 ? (
              <div className="grid gap-5">
                <Checkbox label="Available for standard rental" checked={form.enableRent} onChange={(value) => update("enableRent", value)} />
                {form.enableRent ? <TextField label="Daily rental price" value={form.pricePerDay} onChange={(value) => update("pricePerDay", value)} /> : null}
                <Checkbox label="Available for direct sale" checked={form.enableDirectSale} onChange={(value) => update("enableDirectSale", value)} />
                {form.enableDirectSale ? <TextField label="Sale price" value={form.salePrice} onChange={(value) => update("salePrice", value)} /> : null}
                <Checkbox label="Available for rent-to-own" checked={form.enableRentToOwn} onChange={(value) => update("enableRentToOwn", value)} />
                {form.enableRentToOwn ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <TextField label="RTO buyout price" value={form.rentToOwnPrice} onChange={(value) => update("rentToOwnPrice", value)} />
                    <TextField label="RTO term months" value={form.rentToOwnMonths} onChange={(value) => update("rentToOwnMonths", value)} />
                  </div>
                ) : null}
              </div>
            ) : null}

            {step === 3 ? (
              <div className="grid gap-4 md:grid-cols-2">
                <TextField label="Contact name" value={form.contactName} onChange={(value) => update("contactName", value)} />
                <TextField label="Contact email" value={form.contactEmail} onChange={(value) => update("contactEmail", value)} />
                <TextField label="Contact phone" value={form.contactPhone} onChange={(value) => update("contactPhone", value)} />
                <div className="rounded-[8px] bg-[#f4f8fe] p-4 text-sm leading-7 text-[#60728d] md:col-span-2">
                  Listings are submitted as pending review. Once approved by Phillips, they appear in search and can receive rent, buy, or RTO enquiries.
                </div>
              </div>
            ) : null}

            {error ? <p className="mt-6 rounded-[6px] bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p> : null}
            {success ? (
              <div className="mt-6 rounded-[6px] bg-emerald-50 px-4 py-4 text-sm font-bold text-emerald-700">
                <CheckCircle2 className="mb-1" size={20} />
                Listing submitted for review.
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap justify-between gap-3">
              <button type="button" disabled={step === 1} onClick={() => setStep((current) => Math.max(1, current - 1))} className={theme5SecondaryButton}>
                <ChevronLeft size={16} />
                Back
              </button>
              {step < 3 ? (
                <button type="button" onClick={() => setStep((current) => Math.min(3, current + 1))} className={theme5Button}>
                  Continue
                  <ChevronRight size={16} />
                </button>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {success ? (
                    <button type="button" onClick={() => router.push("/theme5/account")} className={theme5SecondaryButton}>
                      View account
                    </button>
                  ) : null}
                  <button disabled={isSubmitting} className={theme5Button}>
                    <Upload size={16} />
                    {isSubmitting ? "Submitting..." : "Submit listing"}
                  </button>
                </div>
              )}
            </div>
          </form>
        ) : null}
      </main>
      <Theme5AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuthenticated={() => void refresh()} />
    </Theme5Shell>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-xs font-black uppercase tracking-normal text-[#60728d]">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-[6px] border border-[#dfe7f3] px-3 text-sm font-bold text-[#10213f] outline-none focus:border-[#1157d9]"
        required
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-xs font-black uppercase tracking-normal text-[#60728d]">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="h-12 rounded-[6px] border border-[#dfe7f3] px-3 text-sm font-bold text-[#10213f] outline-none focus:border-[#1157d9]">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 rounded-[8px] border border-[#dfe7f3] bg-white p-4 text-sm font-black text-[#10213f]">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="size-4 accent-[#1157d9]" />
      {label}
    </label>
  );
}
