import { describe, expect, it } from "vitest";

import {
  getRentToOwnDownPayment,
  mapPersonalListingRowToCar,
  sanitizePersonalCarListingInput,
  toPersonalCarInsert,
} from "./personal-car-listings";

describe("personal car listings", () => {
  it("sanitizes a valid payload", () => {
    const parsed = sanitizePersonalCarListingInput({
      make: " Tesla ",
      model: " Model 3 ",
      year: "2024",
      location: " Melbourne, VIC ",
      pricePerDay: "120",
      enableRentToOwn: true,
      rentToOwnPrice: "42000",
      rentToOwnMonths: "36",
    });

    expect(parsed.make).toBe("Tesla");
    expect(parsed.model).toBe("Model 3");
    expect(parsed.year).toBe(2024);
    expect(parsed.pricePerDay).toBe(120);
    expect(parsed.enableRentToOwn).toBe(true);
  });

  it("requires buyout fields when rent-to-own is enabled", () => {
    expect(() =>
      sanitizePersonalCarListingInput({
        make: "Tesla",
        model: "Model 3",
        year: 2024,
        location: "Melbourne, VIC",
        pricePerDay: 120,
        enableRentToOwn: true,
      })
    ).toThrow(/Buyout price is required/);
  });

  it("builds an insert payload with disabled rent-to-own fields nulled out", () => {
    const parsed = sanitizePersonalCarListingInput({
      make: "Toyota",
      model: "Camry",
      year: 2023,
      location: "Southbank, VIC",
      pricePerDay: 89,
      enableRentToOwn: false,
    });

    expect(toPersonalCarInsert(parsed)).toEqual({
      make: "Toyota",
      model: "Camry",
      year: 2023,
      location: "Southbank, VIC",
      price_per_day: 89,
      enable_rent_to_own: false,
      rent_to_own_price: null,
      rent_to_own_months: null,
      enable_direct_sale: false,
      sale_price: null,
    });
  });

  it("maps a database row into the theme4 card shape", () => {
    const car = mapPersonalListingRowToCar({
      id: "abc-123",
      make: "Tesla",
      model: "Model Y",
      year: 2025,
      location: "Melbourne, VIC",
      price_per_day: 145,
      enable_rent_to_own: true,
      rent_to_own_price: 48000,
      rent_to_own_months: 36,
      enable_direct_sale: true,
      sale_price: 52000,
      status: "active",
      created_at: "2026-06-16T00:00:00.000Z",
    });

    expect(car.name).toBe("Tesla Model Y 2025");
    expect(car.category).toBe("Electric");
    expect(car.rentToOwnAvailable).toBe(true);
    expect(car.downPayment).toBe(getRentToOwnDownPayment(48000));
    expect(car.saleAvailable).toBe(true);
    expect(car.hostName).toBe("Phillips Car Rental Host");
  });
});
