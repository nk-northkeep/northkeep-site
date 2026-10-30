import { describe, expect, it } from "vitest";
import { normalizeBase, routerBase } from "./base-path";

describe("normalizeBase", () => {
  it("defaults to the GitHub Pages project path", () => {
    expect(normalizeBase(undefined)).toBe("/northkeep-site/");
    expect(normalizeBase("")).toBe("/northkeep-site/");
    expect(normalizeBase("   ")).toBe("/northkeep-site/");
  });

  it("keeps a root base for the custom domain", () => {
    expect(normalizeBase("/")).toBe("/");
  });

  it("adds a leading and trailing slash", () => {
    expect(normalizeBase("northkeep-site")).toBe("/northkeep-site/");
    expect(normalizeBase("/northkeep-site")).toBe("/northkeep-site/");
  });
});

describe("routerBase", () => {
  it("strips the trailing slash and treats root as empty", () => {
    expect(routerBase("/northkeep-site/")).toBe("/northkeep-site");
    expect(routerBase("/")).toBe("");
    expect(routerBase(undefined)).toBe("");
  });
});
