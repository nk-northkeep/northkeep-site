/**
 * Mesma regra da land do ONE: cada ferramenta só entra na página quando o
 * ID do build é válido. ID vazio ou malformado não gera pedido de rede.
 */

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  loaded?: boolean;
  version?: string;
  push?: Fbq;
};

type Lintrk = ((action: string, payload?: unknown) => void) & { q: unknown[] };

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: Fbq;
  _fbq?: Fbq;
  clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
  lintrk?: Lintrk;
  _linkedin_partner_id?: string;
  _linkedin_data_partner_ids?: string[];
};

export function acceptsGa4(id: string | undefined): string {
  const value = (id ?? "").trim();
  return /^G-[A-Z0-9]+$/i.test(value) ? value : "";
}

export function acceptsClarity(id: string | undefined): string {
  const value = (id ?? "").trim();
  return /^[a-z0-9]{4,32}$/i.test(value) ? value : "";
}

export function acceptsMetaPixel(id: string | undefined): string {
  const value = (id ?? "").trim();
  return /^\d{5,20}$/.test(value) ? value : "";
}

export function acceptsLinkedInPartner(id: string | undefined): string {
  const value = (id ?? "").trim();
  return /^\d{3,20}$/.test(value) ? value : "";
}

function loadScript(src: string) {
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function preconnect(href: string) {
  if (document.querySelector(`link[rel="preconnect"][href="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "preconnect";
  link.href = href;
  document.head.appendChild(link);
}

let started = false;

export function initTracking() {
  if (started || typeof document === "undefined") return;
  started = true;

  const win = window as AnalyticsWindow;
  const gaId = acceptsGa4(import.meta.env.VITE_GA4_ID);
  const clarityId = acceptsClarity(import.meta.env.VITE_CLARITY_ID);
  const pixelId = acceptsMetaPixel(import.meta.env.VITE_META_PIXEL_ID);
  const linkedInId = acceptsLinkedInPartner(
    import.meta.env.VITE_LINKEDIN_PARTNER_ID
  );

  if (gaId) {
    preconnect("https://www.googletagmanager.com");
    preconnect("https://www.google-analytics.com");
    win.dataLayer = win.dataLayer || [];
    win.gtag = function gtag() {
      win.dataLayer?.push(arguments);
    };
    win.gtag("js", new Date());
    win.gtag("config", gaId, { anonymize_ip: true });
    loadScript(
      `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
    );
  }

  if (clarityId) {
    preconnect("https://www.clarity.ms");
    const queue: unknown[] = [];
    const clarity = Object.assign(
      function clarityStub() {
        queue.push(arguments);
      },
      { q: queue }
    );
    win.clarity = win.clarity || clarity;
    loadScript(`https://www.clarity.ms/tag/${encodeURIComponent(clarityId)}`);
  }

  if (pixelId) {
    preconnect("https://connect.facebook.net");
    if (!win.fbq) {
      const queue: unknown[] = [];
      const fbq = Object.assign(
        function fbqStub() {
          const call = fbq.callMethod;
          if (call) call.apply(fbq, arguments as unknown as unknown[]);
          else queue.push(arguments);
        },
        { queue, loaded: true, version: "2.0" }
      ) as Fbq;
      fbq.push = fbq;
      win.fbq = fbq;
      win._fbq = fbq;
    }
    win.fbq("init", pixelId);
    win.fbq("track", "PageView");
    loadScript("https://connect.facebook.net/en_US/fbevents.js");
  }

  if (linkedInId) {
    preconnect("https://snap.licdn.com");
    win._linkedin_partner_id = linkedInId;
    win._linkedin_data_partner_ids = win._linkedin_data_partner_ids || [];
    win._linkedin_data_partner_ids.push(linkedInId);
    if (!win.lintrk) {
      const queue: unknown[] = [];
      const lintrk = Object.assign(
        function lintrkStub(action: string, payload?: unknown) {
          queue.push([action, payload]);
        },
        { q: queue }
      ) as Lintrk;
      win.lintrk = lintrk;
    }
    loadScript("https://snap.licdn.com/li.lms-analytics/insight.min.js");
  }
}

/** GA4 `generate_lead` e Meta `Lead`. Não faz nada se o pixel ou o gtag não carregou. */
export function trackGenerateLead() {
  const win = window as AnalyticsWindow;
  if (typeof win.gtag === "function") {
    win.gtag("event", "generate_lead", { method: "contact_form" });
  }
  if (typeof win.fbq === "function") {
    win.fbq("track", "Lead");
  }
}
