import { z } from "zod";

import type { TuroCar } from "@/lib/theme4-data";

export const LISTING_STATUSES = [
  "draft",
  "pending_review",
  "approved",
  "rejected",
  "archived",
] as const;

export type ListingStatus = (typeof LISTING_STATUSES)[number];

export const VEHICLE_CATEGORIES = ["Electric", "Sport", "SUV", "Luxury", "Classic"] as const;
export const TRANSMISSIONS = ["Automatic", "Manual"] as const;
export const FUEL_TYPES = ["Electric", "Petrol", "Hybrid", "LPG"] as const;
export const BODY_TYPES = [
  "SUV",
  "Sedan",
  "Hatchback",
  "Ute",
  "Van",
  "Wagon",
  "Coupe",
  "Convertible",
  "Other",
] as const;

export const vehicleListingInputSchema = z
  .object({
    make: z.string().trim().min(1, "Car make is required.").max(80),
    model: z.string().trim().min(1, "Car model is required.").max(80),
    year: z.coerce.number().int().min(2000).max(2035),
    location: z.string().trim().min(1, "Location is required.").max(140).default("Melbourne, VIC"),
    category: z.enum(VEHICLE_CATEGORIES).optional(),
    transmission: z.enum(TRANSMISSIONS).default("Automatic"),
    fuelType: z.enum(FUEL_TYPES).optional(),
    seats: z.coerce.number().int().min(2).max(12).default(5),
    bodyType: z.enum(BODY_TYPES).default("Sedan"),
    colour: z.string().trim().max(40).optional(),
    odometer: z.coerce.number().int().min(0).max(1000000).nullable().optional(),
    hasLeatherSeats: z.coerce.boolean().default(false),
    hasFourByFour: z.coerce.boolean().default(false),
    description: z.string().trim().max(1200).optional(),
    imageUrl: z.string().trim().url("Image must be a valid URL.").optional().or(z.literal("")),
    pricePerDay: z.coerce.number().int().min(30).max(5000).nullable().optional(),
    enableRent: z.coerce.boolean().default(true),
    enableRentToOwn: z.coerce.boolean().default(false),
    rentToOwnPrice: z.coerce.number().int().min(1000).max(500000).nullable().optional(),
    rentToOwnMonths: z.coerce.number().int().min(12).max(60).nullable().optional(),
    enableDirectSale: z.coerce.boolean().default(false),
    salePrice: z.coerce.number().int().min(1000).max(500000).nullable().optional(),
    contactName: z.string().trim().min(1, "Contact name is required.").max(120),
    contactEmail: z.string().trim().email("A valid contact email is required.").max(180),
    contactPhone: z.string().trim().min(6, "Contact phone is required.").max(40),
  })
  .superRefine((value, ctx) => {
    if (!value.enableRent && !value.enableRentToOwn && !value.enableDirectSale) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["enableRent"],
        message: "Choose at least one listing mode.",
      });
    }

    if (value.enableRent && !value.pricePerDay) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pricePerDay"],
        message: "Daily rental rate is required for rental listings.",
      });
    }

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

    if (value.enableDirectSale && !value.salePrice) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["salePrice"],
        message: "Listing sale price is required when sale mode is enabled.",
      });
    }
  });

export type VehicleListingInput = z.infer<typeof vehicleListingInputSchema>;

export type VehicleListingRow = {
  id: string;
  owner_id: string | null;
  source: string;
  make: string;
  model: string;
  year: number;
  category: TuroCar["category"];
  location: string;
  price_per_day: number | null;
  enable_rent: boolean;
  enable_rent_to_own: boolean;
  rent_to_own_price: number | null;
  rent_to_own_months: number | null;
  enable_direct_sale: boolean;
  sale_price: number | null;
  status: ListingStatus;
  transmission: TuroCar["transmission"];
  fuel_type: TuroCar["fuelType"];
  seats: number;
  body_type?: string | null;
  colour?: string | null;
  odometer?: number | null;
  has_leather_seats?: boolean | null;
  has_4x4?: boolean | null;
  description: string | null;
  features: string[] | null;
  image_url: string | null;
  owner_display_name: string | null;
  owner_email: string | null;
  owner_phone: string | null;
  created_at: string;
  updated_at: string;
};

export type EnquiryRow = {
  id: string;
  listing_id: string;
  requester_id: string;
  owner_id: string | null;
  mode: "rent" | "rent_to_own" | "sale";
  status: "new" | "contacted" | "closed" | "cancelled";
  requester_name: string;
  requester_email: string;
  requester_phone: string;
  pickup_date: string | null;
  return_date: string | null;
  delivery_location: string | null;
  message: string | null;
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

export function inferCategory(make: string, model: string): TuroCar["category"] {
  const normalizedMake = normalizeMake(make);
  const normalizedModel = model.trim().toLowerCase();

  if (normalizedMake.includes("tesla") || normalizedModel.includes("ev")) return "Electric";
  if (
    normalizedMake.includes("porsche") ||
    normalizedMake.includes("ferrari") ||
    normalizedMake.includes("lamborghini") ||
    normalizedModel.includes("gt") ||
    normalizedModel.includes("911")
  ) return "Sport";
  if (
    normalizedMake.includes("jeep") ||
    normalizedModel.includes("suv") ||
    normalizedModel.includes("x5") ||
    normalizedModel.includes("landcruiser")
  ) return "SUV";
  if (
    normalizedMake.includes("mercedes") ||
    normalizedMake.includes("bmw") ||
    normalizedMake.includes("audi") ||
    normalizedMake.includes("lexus")
  ) return "Luxury";

  return "Sport";
}

export function inferFuelType(make: string): TuroCar["fuelType"] {
  return normalizeMake(make).includes("tesla") ? "Electric" : "Petrol";
}

export function inferImage(make: string) {
  const normalizedMake = normalizeMake(make);
  return imageByMake[normalizedMake] ?? imageByMake.default;
}

export function getRentToOwnDownPayment(price: number) {
  return Math.round(price * 0.1);
}

export function sanitizeVehicleListingInput(input: unknown) {
  return vehicleListingInputSchema.parse(input);
}

export function toVehicleListingInsert(input: VehicleListingInput, ownerId: string | null, status: ListingStatus) {
  const category = input.category ?? inferCategory(input.make, input.model);
  const fuelType = input.fuelType ?? inferFuelType(input.make);
  const pricePerDay = input.enableRent ? input.pricePerDay ?? null : null;

  return {
    owner_id: ownerId,
    source: ownerId ? "host" : "phillips",
    make: input.make.trim(),
    model: input.model.trim(),
    year: input.year,
    category,
    location: input.location.trim(),
    price_per_day: pricePerDay,
    enable_rent: input.enableRent,
    enable_rent_to_own: input.enableRentToOwn,
    rent_to_own_price: input.enableRentToOwn ? input.rentToOwnPrice ?? null : null,
    rent_to_own_months: input.enableRentToOwn ? input.rentToOwnMonths ?? null : null,
    enable_direct_sale: input.enableDirectSale,
    sale_price: input.enableDirectSale ? input.salePrice ?? null : null,
    status,
    transmission: input.transmission,
    fuel_type: fuelType,
    seats: input.seats,
    body_type: input.bodyType,
    colour: input.colour?.trim() || null,
    odometer: input.odometer ?? null,
    has_leather_seats: input.hasLeatherSeats,
    has_4x4: input.hasFourByFour,
    description: input.description?.trim() || null,
    features: [
      input.bodyType,
      input.colour?.trim() ? `${input.colour.trim()} exterior` : null,
      input.odometer != null ? `${input.odometer.toLocaleString()} km odometer` : null,
      input.hasLeatherSeats ? "Leather seats" : null,
      input.hasFourByFour ? "4x4" : null,
      "Bluetooth",
      "GPS",
    ].filter(Boolean),
    image_url: input.imageUrl?.trim() || inferImage(input.make),
    owner_display_name: input.contactName.trim(),
    owner_email: input.contactEmail.trim().toLowerCase(),
    owner_phone: input.contactPhone.trim(),
  };
}

export function mapVehicleListingRowToCar(row: VehicleListingRow): TuroCar {
  const name = `${row.make} ${row.model} ${row.year}`;
  const rentToOwnPrice = row.rent_to_own_price ?? undefined;
  const generatedFeatures = [
    row.body_type,
    row.colour ? `${row.colour} exterior` : null,
    row.odometer != null ? `${row.odometer.toLocaleString()} km odometer` : null,
    row.has_leather_seats ? "Leather seats" : null,
    row.has_4x4 ? "4x4" : null,
  ].filter(Boolean) as string[];

  return {
    id: row.id,
    name,
    make: row.make,
    model: row.model,
    year: row.year,
    category: row.category,
    pricePerDay: row.price_per_day ?? 0,
    rating: row.source === "phillips" ? 4.96 : 5,
    tripsCount: row.source === "phillips" ? 18 : 0,
    isAllStarHost: row.source === "phillips",
    hostName: row.owner_display_name || "Phillips Car Rental Host",
    hostAvatar,
    image: row.image_url || inferImage(row.make),
    location: row.location,
    transmission: row.transmission,
    fuelType: row.fuel_type,
    seats: row.seats,
    bodyType: row.body_type ?? undefined,
    colour: row.colour ?? undefined,
    odometer: row.odometer ?? undefined,
    hasLeatherSeats: Boolean(row.has_leather_seats),
    hasFourByFour: Boolean(row.has_4x4),
    description:
      row.description ||
      "Listed on Phillips Car Rental in Melbourne. This owner-hosted vehicle is ready for local rentals, sales enquiries, and weekend drives across Victoria.",
    features: row.features?.length
      ? Array.from(new Set([...generatedFeatures, ...row.features]))
      : [...generatedFeatures, "Bluetooth", "USB Charger", "GPS"],
    rentToOwnAvailable: row.enable_rent_to_own,
    rentToOwnPrice,
    rentToOwnMonths: row.rent_to_own_months ?? undefined,
    downPayment: rentToOwnPrice ? getRentToOwnDownPayment(rentToOwnPrice) : undefined,
    saleAvailable: row.enable_direct_sale,
    salePrice: row.sale_price ?? undefined,
  };
}

export function getListingValidationMessage(error: unknown) {
  if (error instanceof z.ZodError) {
    return error.issues[0]?.message ?? "Please check the listing details and try again.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to save your listing right now.";
}
