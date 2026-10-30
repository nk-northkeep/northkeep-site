export type ContactFields = {
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
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
  if (!input.consent) {
    return "Autorize o uso dos dados para retornarmos o contato.";
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
    `Mensagem: ${input.message.trim() || "—"}`,
  ].join("\n");
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function postContact(
  endpoint: string,
  input: ContactFields
): Promise<"ok" | "error"> {
  const body = new FormData();
  body.set("nome", input.name.trim());
  body.set("empresa", input.company.trim());
  body.set("cargo", input.position.trim());
  body.set("email", input.email.trim());
  body.set("telefone", input.phone.trim());
  body.set("mensagem", input.message.trim());
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
