import { describe, expect, it } from "vitest";

import { getAdminEmails, isConfiguredAdminEmail } from "./admin";

describe("admin email helpers", () => {
  it("parses configured admin emails", () => {
    expect(getAdminEmails(" Owner@Phillips.com.au, admin@example.com ,, ")).toEqual([
      "owner@phillips.com.au",
      "admin@example.com",
    ]);
  });

  it("matches admin emails case-insensitively", () => {
    expect(isConfiguredAdminEmail("OWNER@PHILLIPS.COM.AU", "owner@phillips.com.au")).toBe(true);
    expect(isConfiguredAdminEmail("driver@example.com", "owner@phillips.com.au")).toBe(false);
  });
});
