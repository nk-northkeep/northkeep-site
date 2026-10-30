export type ContactFields = {
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  challenge: string;
  communications: boolean;
  gotcha: string;
};

export function validateContact(input: ContactFields): string | null {
  if (!input.name.trim()) return "Informe seu nome.";
  if (!input.company.trim()) return "Informe a empresa.";
  if (!input.position.trim()) return "Informe o cargo.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
    return "Informe um e-mail válido.";
  }
  const digits = input.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) {
    return "Informe um telefone com DDD.";
  }
  return null;
}

export function isHoneypotTripped(gotcha: string): boolean {
  return gotcha.trim().length > 0;
}

export function mailtoHref(email: string, input: ContactFields): string {
  const subject = "Contato — site Northkeep";
  const body = [
    `Nome: ${input.name.trim()}`,
    `Empresa: ${input.company.trim()}`,
    `Cargo: ${input.position.trim()}`,
    `E-mail: ${input.email.trim()}`,
    `Telefone: ${input.phone.trim()}`,
    `Mensagem: ${input.challenge.trim() || "—"}`,
    `Comunicações institucionais: ${input.communications ? "sim" : "não"}`,
  ].join("\n");
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function postContact(
  endpoint: string,
  input: ContactFields
): Promise<"ok" | "error"> {
  const body = new FormData();
  body.set("name", input.name.trim());
  body.set("company", input.company.trim());
  body.set("position", input.position.trim());
  body.set("email", input.email.trim());
  body.set("phone", input.phone.trim());
  body.set("challenge", input.challenge.trim());
  body.set("communications", input.communications ? "sim" : "nao");
  body.set("_subject", "Contato — site Northkeep");
  body.set("_gotcha", "");

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json" },
      body,
    });
    return response.ok ? "ok" : "error";
  } catch {
    return "error";
  }
}
