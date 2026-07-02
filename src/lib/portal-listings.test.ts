import { describe, expect, it } from "vitest";

import {
  getRentToOwnDownPayment,
  mapVehicleListingRowToCar,
  sanitizeVehicleListingInput,
  toVehicleListingInsert,
} from "./portal-listings";

describe("portal listing validation", () => {
  it("accepts rent, sale, and rent-to-own modes together", () => {
    const parsed = sanitizeVehicleListingInput({
      make: " Tesla ",
      model: " Model Y ",
      year: "2024",
      location: " Melbourne, VIC ",
      pricePerDay: "145",
      enableRent: true,
      enableRentToOwn: true,
      rentToOwnPrice: "52000",
      rentToOwnMonths: "36",
      enableDirectSale: true,
      salePrice: "54000",
      contactName: "Phillips Admin",
      contactEmail: "admin@phillipscarrental.com.au",
      contactPhone: "1300 315 275",
    });

    expect(parsed.make).toBe("Tesla");
    expect(parsed.enableDirectSale).toBe(true);
  });

  it("requires at least one marketplace mode", () => {
    expect(() =>
      sanitizeVehicleListingInput({
        make: "Toyota",
        model: "Camry",
        year: 2023,
        enableRent: false,
        enableRentToOwn: false,
        enableDirectSale: false,
        contactName: "Owner",
        contactEmail: "owner@example.com",
        contactPhone: "0400000000",
      })
    ).toThrow(/Choose at least one/);
  });

  it("builds a pending user insert payload", () => {
    const parsed = sanitizeVehicleListingInput({
      make: "Ford",
      model: "Mustang",
      year: 2021,
      location: "South Melbourne, VIC",
      enableRent: false,
      enableDirectSale: true,
      salePrice: 48000,
      contactName: "Sarah",
      contactEmail: "Sarah@Example.com",
      contactPhone: "0400000000",
    });

    expect(toVehicleListingInsert(parsed, "user-1", "pending_review")).toMatchObject({
      owner_id: "user-1",
      source: "host",
      enable_rent: false,
      enable_direct_sale: true,
      sale_price: 48000,
      status: "pending_review",
      owner_email: "sarah@example.com",
    });
  });

  it("accepts diesel vehicle details and maps them onto cards", () => {
    const parsed = sanitizeVehicleListingInput({
      make: "Toyota",
      model: "Hilux SR5",
      year: 2022,
      location: "Keysborough, VIC",
      bodyType: "Ute",
      fuelType: "Diesel",
      transmission: "Automatic",
      odometer: 43500,
      seats: 5,
      enableRent: true,
      pricePerDay: 135,
      enableDirectSale: true,
      salePrice: 45500,
      contactName: "Phillips Fleet",
      contactEmail: "fleet@phillipscarrental.com.au",
      contactPhone: "1300 315 275",
    });

    const insert = toVehicleListingInsert(parsed, "fleet-1", "approved");
    const car = mapVehicleListingRowToCar({
      id: "diesel-ute-1",
      owner_id: "fleet-1",
      source: "host",
      make: insert.make,
      model: insert.model,
      year: insert.year,
      category: insert.category,
      location: insert.location,
      price_per_day: insert.price_per_day,
      enable_rent: insert.enable_rent,
      enable_rent_to_own: insert.enable_rent_to_own,
      rent_to_own_price: insert.rent_to_own_price,
      rent_to_own_months: insert.rent_to_own_months,
      enable_direct_sale: insert.enable_direct_sale,
      sale_price: insert.sale_price,
      status: insert.status,
      transmission: insert.transmission,
      fuel_type: insert.fuel_type,
      seats: insert.seats,
      body_type: insert.body_type,
      colour: insert.colour,
      odometer: insert.odometer,
      has_leather_seats: insert.has_leather_seats,
      has_4x4: insert.has_4x4,
      description: insert.description,
      features: insert.features,
      image_url: insert.image_url,
      owner_display_name: insert.owner_display_name,
      owner_email: insert.owner_email,
      owner_phone: insert.owner_phone,
      created_at: "2026-06-16T00:00:00.000Z",
      updated_at: "2026-06-16T00:00:00.000Z",
    });

    expect(insert.fuel_type).toBe("Diesel");
    expect(car.fuelType).toBe("Diesel");
    expect(car.bodyType).toBe("Ute");
    expect(car.odometer).toBe(43500);
  });

  it("maps approved rows into the existing card/detail shape", () => {
    const car = mapVehicleListingRowToCar({
      id: "abc-123",
      owner_id: "user-1",
      source: "host",
      make: "Tesla",
      model: "Model Y",
      year: 2025,
      category: "Electric",
      location: "Melbourne, VIC",
      price_per_day: 145,
      enable_rent: true,
      enable_rent_to_own: true,
      rent_to_own_price: 48000,
      rent_to_own_months: 36,
      enable_direct_sale: true,
      sale_price: 52000,
      status: "approved",
      transmission: "Automatic",
      fuel_type: "Electric",
      seats: 5,
      description: null,
      features: null,
      image_url: null,
      owner_display_name: "Asha",
      owner_email: "asha@example.com",
      owner_phone: "0400000000",
      created_at: "2026-06-16T00:00:00.000Z",
      updated_at: "2026-06-16T00:00:00.000Z",
    });

    expect(car.name).toBe("Tesla Model Y 2025");
    expect(car.rentToOwnAvailable).toBe(true);
    expect(car.downPayment).toBe(getRentToOwnDownPayment(48000));
    expect(car.saleAvailable).toBe(true);
    expect(car.hostName).toBe("Asha");
  });
});
