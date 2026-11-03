/** Vite `base`. Vazio = raiz do domínio próprio. A URL antiga do repositório pede `VITE_BASE_PATH=/northkeep-site/`. */
export function normalizeBase(value: string | undefined | null): string {
  const raw = (value ?? "").trim();
  if (!raw) return "/";
  if (raw === "/") return "/";
  const withLead = raw.startsWith("/") ? raw : `/${raw}`;
  return withLead.endsWith("/") ? withLead : `${withLead}/`;
}

/** Prefixo do wouter. Vazio quando o site está na raiz. */
export function routerBase(baseUrl: string | undefined): string {
  const base = baseUrl ?? "/";
  if (base === "/" || base === "") return "";
  return base.replace(/\/$/, "");
}
