/**
 * Configuração pública do site.
 * O e-mail padrão abaixo é o único endereço fixo aceito: é o fallback de texto
 * quando VITE_CONTACT_EMAIL não vem no build. Componentes leem `contactEmail()`.
 */
const DEFAULT_CONTACT_EMAIL = "contato@northkeep.com.br";

export function resolveContactEmail(configured: string | undefined): string {
  const value = (configured ?? "").trim();
  return value || DEFAULT_CONTACT_EMAIL;
}

export function contactEmail(): string {
  return resolveContactEmail(import.meta.env.VITE_CONTACT_EMAIL);
}

/** Endpoint https (Formspree). Vazio = o formulário não faz POST. */
export function resolveFormEndpoint(configured: string | undefined): string {
  const value = (configured ?? "").trim();
  if (!/^https:\/\/\S+$/i.test(value)) return "";
  return value;
}

export function formEndpoint(): string {
  return resolveFormEndpoint(import.meta.env.VITE_FORMSPREE_ENDPOINT);
}

export const contactPhoneDisplay = "(47) 3150-0001";
export const contactPhoneTel = "+554731500001";
export const whatsappUrl = "https://wa.me/554731500001";

export const privacyEmail = "comercial@northkeep.com.br";
export const privacyUpdated = "30 de outubro de 2026";

export function companyIdentification() {
  return {
    legalName: (import.meta.env.VITE_COMPANY_LEGAL_NAME ?? "").trim(),
    cnpj: (import.meta.env.VITE_COMPANY_CNPJ ?? "").trim(),
    address: (import.meta.env.VITE_COMPANY_ADDRESS ?? "").trim(),
  };
}

export const links = {
  oneLanding: "https://conheca.one.northkeep.com.br/",
  oneApp: "https://one.northkeep.com.br/",
  action: "https://action.northkeep.com.br/",
  actionPlans: "https://action.northkeep.com.br/#planos",
  actionTrial: "https://action.northkeep.com.br/register",
} as const;

export function publicAsset(file: string): string {
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${file.replace(/^\//, "")}`;
}
