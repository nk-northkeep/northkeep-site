import { describe, expect, it } from "vitest";
import {
  isHoneypotTripped,
  mailtoHref,
  postContact,
  validateContact,
  type ContactFields,
} from "./contact";
import { resolveContactEmail, resolveFormEndpoint } from "./site";

const valid: ContactFields = {
  name: "Ana Souza",
  company: "Exemplo Ltda",
  position: "Diretora",
  email: "ana@exemplo.com.br",
  phone: "(47) 99999-0000",
  message: "Quero entender o ONE e o NK Action.",
  consent: true,
  gotcha: "",
};

describe("validateContact", () => {
  it("accepts a complete lead", () => {
    expect(validateContact(valid)).toBeNull();
  });

  it("rejects an invalid email, a short phone and missing consent", () => {
    expect(validateContact({ ...valid, email: "ana" })).toMatch(/e-mail/i);
    expect(validateContact({ ...valid, phone: "123" })).toMatch(/telefone/i);
    expect(validateContact({ ...valid, consent: false })).toMatch(/Autorize/i);
  });
});

describe("postContact", () => {
  it("posts the lead fields to the Formspree endpoint", async () => {
    const calls: Array<{ url: string; email: FormDataEntryValue | null; gotcha: FormDataEntryValue | null }> = [];
    const original = globalThis.fetch;
    globalThis.fetch = (async (url: string, init?: RequestInit) => {
      const body = init?.body as FormData;
      calls.push({
        url: String(url),
        email: body.get("email"),
        gotcha: body.get("_gotcha"),
      });
      return new Response("{}", { status: 200 });
    }) as typeof fetch;
    try {
      expect(await postContact("https://formspree.io/f/abc", valid)).toBe("ok");
      expect(calls).toEqual([
        {
          url: "https://formspree.io/f/abc",
          email: "ana@exemplo.com.br",
          gotcha: "",
        },
      ]);
      globalThis.fetch = (async () => new Response("no", { status: 422 })) as typeof fetch;
      expect(await postContact("https://formspree.io/f/abc", valid)).toBe("error");
    } finally {
      globalThis.fetch = original;
    }
  });
});

describe("honeypot and mailto fallback", () => {
  it("treats a filled honeypot as a bot", () => {
    expect(isHoneypotTripped("")).toBe(false);
    expect(isHoneypotTripped("http://spam")).toBe(true);
  });

  it("builds a mailto without the honeypot value", () => {
    const href = mailtoHref("comercial@northkeep.com.br", {
      ...valid,
      gotcha: "bot",
    });
    expect(href.startsWith("mailto:comercial@northkeep.com.br?")).toBe(true);
    expect(decodeURIComponent(href)).toContain("Ana Souza");
    expect(href).not.toContain("bot");
  });
});

describe("public config", () => {
  it("falls back to the commercial mailbox and ignores a non-https form endpoint", () => {
    expect(resolveContactEmail(undefined)).toBe("comercial@northkeep.com.br");
    expect(resolveContactEmail("  ")).toBe("comercial@northkeep.com.br");
    expect(resolveContactEmail("ola@northkeep.com.br")).toBe(
      "ola@northkeep.com.br"
    );
    expect(resolveFormEndpoint(undefined)).toBe("");
    expect(resolveFormEndpoint("http://formspree.io/f/abc")).toBe("");
    expect(resolveFormEndpoint("https://formspree.io/f/abc")).toBe(
      "https://formspree.io/f/abc"
    );
  });
});
