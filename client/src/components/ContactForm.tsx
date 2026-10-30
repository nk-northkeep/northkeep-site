import { ArrowRight, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import {
  isHoneypotTripped,
  mailtoHref,
  postContact,
  validateContact,
  type ContactFields,
} from "@/lib/contact";
import { contactEmail, formEndpoint } from "@/lib/site";
import { trackGenerateLead } from "@/lib/tracking";

const empty: ContactFields = {
  name: "",
  company: "",
  position: "",
  email: "",
  phone: "",
  message: "",
  consent: false,
  gotcha: "",
};

const fieldClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 outline-none focus:border-[#2B7A8E] focus:ring-2 focus:ring-[#2B7A8E]/30";

export default function ContactForm() {
  const endpoint = formEndpoint();
  const email = contactEmail();
  const [fields, setFields] = useState<ContactFields>(empty);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function update<K extends keyof ContactFields>(key: K, value: ContactFields[K]) {
    setFields(current => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const problem = validateContact(fields);
    if (problem) {
      setError(problem);
      setStatus("idle");
      return;
    }
    setError(null);

    if (isHoneypotTripped(fields.gotcha)) {
      setStatus("sent");
      return;
    }

    if (!endpoint) {
      window.location.href = mailtoHref(email, fields);
      return;
    }

    setStatus("sending");
    const result = await postContact(endpoint, fields);
    if (result === "error") {
      setStatus("idle");
      setError("Não foi possível enviar. Tente de novo ou escreva para o e-mail ao lado.");
      return;
    }
    trackGenerateLead();
    setFields(empty);
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <p className="rounded-lg border border-[#C8DFE8] bg-[#F0F7FA] p-6 text-gray-800" role="status">
        Obrigado. Recebemos sua mensagem e retornaremos o contato.
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      method="post"
      action={endpoint || `mailto:${email}`}
      encType={endpoint ? "application/x-www-form-urlencoded" : "text/plain"}
      className="space-y-5 rounded-lg border border-gray-200 bg-gray-50 p-6 md:p-8"
      noValidate
    >
      {!endpoint && (
        <p className="text-sm text-gray-700">
          O envio online ainda não está ativo neste ambiente. Preencha os dados e abriremos um e-mail para{" "}
          <a className="font-semibold text-[#2B7A8E] underline" href={`mailto:${email}`}>
            {email}
          </a>
          .
        </p>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block text-sm font-medium text-gray-800">
          Nome
          <input
            className={`${fieldClass} mt-1`}
            name="nome"
            autoComplete="name"
            value={fields.name}
            onChange={event => update("name", event.target.value)}
            required
          />
        </label>
        <label className="block text-sm font-medium text-gray-800">
          Empresa
          <input
            className={`${fieldClass} mt-1`}
            name="empresa"
            autoComplete="organization"
            value={fields.company}
            onChange={event => update("company", event.target.value)}
            required
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block text-sm font-medium text-gray-800">
          Cargo
          <input
            className={`${fieldClass} mt-1`}
            name="cargo"
            autoComplete="organization-title"
            value={fields.position}
            onChange={event => update("position", event.target.value)}
            required
          />
        </label>
        <label className="block text-sm font-medium text-gray-800">
          E-mail
          <input
            className={`${fieldClass} mt-1`}
            name="email"
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={event => update("email", event.target.value)}
            required
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-gray-800">
        Telefone
        <input
          className={`${fieldClass} mt-1`}
          name="telefone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          value={fields.phone}
          onChange={event => update("phone", event.target.value)}
          required
        />
      </label>

      <label className="block text-sm font-medium text-gray-800">
        Como podemos ajudar?
        <textarea
          className={`${fieldClass} mt-1`}
          name="mensagem"
          rows={4}
          value={fields.message}
          onChange={event => update("message", event.target.value)}
        />
      </label>

      <div className="hidden" aria-hidden="true">
        <label>
          Não preencha
          <input
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            value={fields.gotcha}
            onChange={event => update("gotcha", event.target.value)}
          />
        </label>
      </div>

      <label className="flex items-start gap-3 text-sm text-gray-700">
        <input
          className="mt-1 size-4 accent-[#2B7A8E]"
          type="checkbox"
          name="consentimento"
          checked={fields.consent}
          onChange={event => update("consent", event.target.checked)}
          required
        />
        <span>Autorizo a Northkeep a usar estes dados para retornar este contato.</span>
      </label>

      {error && (
        <p className="text-sm font-medium text-red-700" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="button-primary w-full justify-center text-base" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden="true" />
            Enviando...
          </>
        ) : (
          <>
            {endpoint ? "Enviar mensagem" : "Enviar por e-mail"}
            <ArrowRight className="size-5" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
