import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { normalizeBase, routerBase } from "./base-path";
import { siteOrigin } from "./client/src/lib/site";

describe("normalizeBase", () => {
  it("defaults to the custom domain root", () => {
    expect(normalizeBase(undefined)).toBe("/");
    expect(normalizeBase("")).toBe("/");
    expect(normalizeBase("   ")).toBe("/");
    expect(normalizeBase("/")).toBe("/");
  });

  it("adds a leading and trailing slash for a project path", () => {
    expect(normalizeBase("northkeep-site")).toBe("/northkeep-site/");
    expect(normalizeBase("/northkeep-site")).toBe("/northkeep-site/");
  });
});

describe("custom domain files", () => {
  it("publishes www.northkeep.com.br at the root", () => {
    expect(readFileSync(new URL("./client/public/CNAME", import.meta.url), "utf8").trim()).toBe(
      "www.northkeep.com.br"
    );
    const html = readFileSync(new URL("./client/index.html", import.meta.url), "utf8");
    expect(siteOrigin).toBe("https://www.northkeep.com.br");
    expect(html).toContain(`rel="canonical" href="${siteOrigin}/"`);
    expect(html).toContain(`property="og:url" content="${siteOrigin}/"`);
  });
});

describe("public copy", () => {
  it("invites any company to the free ONE evaluation", () => {
    const home = readFileSync(new URL("./client/src/pages/Home.tsx", import.meta.url), "utf8");
    expect(home).not.toMatch(/50 ou mais/);
    expect(home).not.toMatch(/funcionários/);
    expect(home).toContain("Avaliação de Aderência gratuita, sem compromisso");
  });
});

describe("routerBase", () => {
  it("strips the trailing slash and treats root as empty", () => {
    expect(routerBase("/northkeep-site/")).toBe("/northkeep-site");
    expect(routerBase("/")).toBe("");
    expect(routerBase(undefined)).toBe("");
  });
});
