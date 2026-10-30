import { describe, expect, it } from "vitest";
import { readCookieConsent, writeCookieConsent } from "./consent";
import { trackingPlan } from "./tracking";

function memoryStorage() {
  const data = new Map<string, string>();
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => {
      data.set(key, value);
    },
  } as Storage;
}

describe("cookie consent", () => {
  it("returns null until a complete choice is stored", () => {
    const storage = memoryStorage();
    expect(readCookieConsent(storage)).toBeNull();
    writeCookieConsent({ analytics: true, marketing: false }, storage);
    expect(readCookieConsent(storage)).toEqual({
      necessary: true,
      analytics: true,
      marketing: false,
    });
  });
});

describe("trackingPlan", () => {
  const ids = {
    ga: "G-ABC123",
    clarity: "abcd1234",
    meta: "1234567890",
    linkedin: "7654321",
  };

  it("loads nothing before the visitor accepts a category", () => {
    expect(trackingPlan(ids, { analytics: false, marketing: false })).toEqual({
      ga4: "",
      clarity: "",
      meta: "",
      linkedin: "",
    });
  });

  it("loads analytics and marketing tools only for the accepted category", () => {
    expect(trackingPlan(ids, { analytics: true, marketing: false })).toEqual({
      ga4: "G-ABC123",
      clarity: "abcd1234",
      meta: "",
      linkedin: "",
    });
    expect(trackingPlan(ids, { analytics: false, marketing: true }).meta).toBe("1234567890");
    expect(trackingPlan(ids, { analytics: false, marketing: true }).ga4).toBe("");
  });
});
