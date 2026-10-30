import { describe, expect, it } from "vitest";
import {
  acceptsClarity,
  acceptsGa4,
  acceptsLinkedInPartner,
  acceptsMetaPixel,
} from "./tracking";

describe("tracking ids", () => {
  it("rejects empty and malformed ids so nothing is injected", () => {
    expect(acceptsGa4("")).toBe("");
    expect(acceptsGa4("GTM-AAAA")).toBe("");
    expect(acceptsGa4("G-ABC123")).toBe("G-ABC123");
    expect(acceptsClarity("")).toBe("");
    expect(acceptsClarity("ab")).toBe("");
    expect(acceptsClarity("z5bl67uqah")).toBe("z5bl67uqah");
    expect(acceptsMetaPixel("abc")).toBe("");
    expect(acceptsMetaPixel("2615387118898673")).toBe("2615387118898673");
    expect(acceptsLinkedInPartner("")).toBe("");
    expect(acceptsLinkedInPartner("12")).toBe("");
    expect(acceptsLinkedInPartner("1234567")).toBe("1234567");
  });
});
