import { describe, expect, it } from "vitest";

import { normalizePrimaryHref } from "./portal-routes";

describe("primary route helpers", () => {
  it("normalizes theme4 URLs into production routes", () => {
    expect(normalizePrimaryHref("/theme4")).toBe("/");
    expect(normalizePrimaryHref("/theme4?tab=lent")).toBe("/?tab=lent");
    expect(normalizePrimaryHref("/theme4/search?mode=rto")).toBe("/search?mode=rto");
    expect(normalizePrimaryHref("/theme4/car/tesla-model-3")).toBe("/car/tesla-model-3");
    expect(normalizePrimaryHref("/theme4/policies/terms")).toBe("/policies/terms");
  });
});
