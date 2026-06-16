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
