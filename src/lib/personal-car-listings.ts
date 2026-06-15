import { z } from "zod";

import type { TuroCar } from "@/lib/theme4-data";

export const DEFAULT_PERSONAL_LISTING_LOCATION = "Melbourne, VIC";

export const personalCarListingSchema = z
  .object({
    make: z.string().trim().min(1, "Car make is required.").max(80),
    model: z.string().trim().min(1, "Car model is required.").max(80),
    year: z.coerce.number().int().min(2000).max(2035),
    location: z
      .string()
      .trim()
      .min(1, "Location is required.")
      .max(120)
      .default(DEFAULT_PERSONAL_LISTING_LOCATION),
    pricePerDay: z.coerce.number().int().min(30).max(5000),
    enableRentToOwn: z.coerce.boolean().default(false),
    rentToOwnPrice: z.coerce.number().int().min(1000).max(500000).nullable().optional(),
    rentToOwnMonths: z.coerce.number().int().min(12).max(60).nullable().optional(),
  })
  .superRefine((value, ctx) => {
    if (value.enableRentToOwn) {
      if (!value.rentToOwnPrice) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["rentToOwnPrice"],
          message: "Buyout price is required when rent-to-own is enabled.",
        });
      }

      if (!value.rentToOwnMonths) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["rentToOwnMonths"],
          message: "Buyout term is required when rent-to-own is enabled.",
        });
      }
    }
  });

export type PersonalCarListingInput = z.infer<typeof personalCarListingSchema>;

export type PersonalCarListingRow = {
  id: string;
  make: string;
  model: string;
  year: number;
  location: string;
  price_per_day: number;
  enable_rent_to_own: boolean;
  rent_to_own_price: number | null;
  rent_to_own_months: number | null;
  status: string;
  created_at: string;
};

const hostAvatar =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80";

const imageByMake: Record<string, string> = {
  tesla:
    "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80",
  porsche:
    "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80",
  jeep:
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
  ford:
    "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80",
  "mercedes-benz":
    "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
  mercedes:
    "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
  toyota:
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
  bmw:
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
  audi:
    "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80",
  default:
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
};

function normalizeMake(make: string) {
  return make.trim().toLowerCase();
}

function inferCategory(make: string, model: string): TuroCar["category"] {
  const normalizedMake = normalizeMake(make);
  const normalizedModel = model.trim().toLowerCase();

  if (normalizedMake.includes("tesla") || normalizedModel.includes("ev")) {
    return "Electric";
  }

  if (
    normalizedMake.includes("porsche") ||
    normalizedMake.includes("ferrari") ||
    normalizedMake.includes("lamborghini") ||
    normalizedModel.includes("gt") ||
    normalizedModel.includes("911")
  ) {
    return "Sport";
  }

  if (
    normalizedMake.includes("jeep") ||
    normalizedModel.includes("suv") ||
    normalizedModel.includes("x5") ||
    normalizedModel.includes("landcruiser")
  ) {
    return "SUV";
  }

  if (
    normalizedMake.includes("mercedes") ||
    normalizedMake.includes("bmw") ||
    normalizedMake.includes("audi") ||
    normalizedMake.includes("lexus")
  ) {
    return "Luxury";
  }

  return "Sport";
}

function inferFuelType(make: string): TuroCar["fuelType"] {
  return normalizeMake(make).includes("tesla") ? "Electric" : "Petrol";
}

function inferImage(make: string) {
  const normalizedMake = normalizeMake(make);
  return imageByMake[normalizedMake] ?? imageByMake.default;
}

export function getRentToOwnDownPayment(price: number) {
  return Math.round(price * 0.1);
}

export function sanitizePersonalCarListingInput(input: unknown) {
  return personalCarListingSchema.parse(input);
}

export function toPersonalCarInsert(input: PersonalCarListingInput) {
  return {
    make: input.make.trim(),
    model: input.model.trim(),
    year: input.year,
    location: input.location.trim(),
    price_per_day: input.pricePerDay,
    enable_rent_to_own: input.enableRentToOwn,
    rent_to_own_price: input.enableRentToOwn ? input.rentToOwnPrice ?? null : null,
    rent_to_own_months: input.enableRentToOwn ? input.rentToOwnMonths ?? null : null,
  };
}

export function mapPersonalListingRowToCar(row: PersonalCarListingRow): TuroCar {
  const name = `${row.make} ${row.model} ${row.year}`;

  return {
    id: row.id,
    name,
    make: row.make,
    model: row.model,
    year: row.year,
    category: inferCategory(row.make, row.model),
    pricePerDay: row.price_per_day,
    rating: 5,
    tripsCount: 0,
    isAllStarHost: true,
    hostName: "Phillips Car Rental Host",
    hostAvatar,
    image: inferImage(row.make),
    location: row.location,
    transmission: "Automatic",
    fuelType: inferFuelType(row.make),
    seats: 5,
    description:
      "Listed on Phillips Car Rental in Melbourne. This owner-hosted vehicle is ready for local rentals, city trips, and weekend drives across Victoria.",
    features: ["Bluetooth", "USB Charger", "GPS"],
    ...(row.enable_rent_to_own
      ? {
          rentToOwnAvailable: true,
          rentToOwnPrice: row.rent_to_own_price ?? undefined,
          rentToOwnMonths: row.rent_to_own_months ?? undefined,
          downPayment:
            row.rent_to_own_price != null
              ? getRentToOwnDownPayment(row.rent_to_own_price)
              : undefined,
        }
      : {}),
  };
}

export function getPersonalListingValidationMessage(error: unknown) {
  if (error instanceof z.ZodError) {
    return error.issues[0]?.message ?? "Please check the listing details and try again.";
  }

  return "Unable to save your listing right now.";
}
