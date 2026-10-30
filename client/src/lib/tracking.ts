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

export type ConsentChoice = { analytics: boolean; marketing: boolean };

export function trackingPlan(
  ids: { ga?: string; clarity?: string; meta?: string; linkedin?: string },
  choice: ConsentChoice
) {
  return {
    ga4: choice.analytics ? acceptsGa4(ids.ga) : "",
    clarity: choice.analytics ? acceptsClarity(ids.clarity) : "",
    meta: choice.marketing ? acceptsMetaPixel(ids.meta) : "",
    linkedin: choice.marketing ? acceptsLinkedInPartner(ids.linkedin) : "",
  };
}

export function hasOptionalTrackers(): boolean {
  const plan = trackingPlan(
    {
      ga: import.meta.env.VITE_GA4_ID,
      clarity: import.meta.env.VITE_CLARITY_ID,
      meta: import.meta.env.VITE_META_PIXEL_ID,
      linkedin: import.meta.env.VITE_LINKEDIN_PARTNER_ID,
    },
    { analytics: true, marketing: true }
  );
  return Boolean(plan.ga4 || plan.clarity || plan.meta || plan.linkedin);
}

function ensureGtag(win: AnalyticsWindow) {
  win.dataLayer = win.dataLayer || [];
  if (typeof win.gtag !== "function") {
    win.gtag = function gtag() {
      win.dataLayer?.push(arguments);
    };
  }
}

let defaultsInstalled = false;

/** Consent Mode v2 com tudo negado, sem baixar o gtag. */
export function installConsentDefaults() {
  if (defaultsInstalled || typeof window === "undefined") return;
  if (!acceptsGa4(import.meta.env.VITE_GA4_ID)) return;
  defaultsInstalled = true;
  const win = window as AnalyticsWindow;
  ensureGtag(win);
  win.gtag?.("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500,
  });
}

let loaded = false;

/** Carrega só as ferramentas da categoria aceita. Sem escolha, não carrega nada. */
export function loadOptionalTracking(choice: ConsentChoice) {
  if (loaded || typeof document === "undefined") return;
  loaded = true;

  const win = window as AnalyticsWindow;
  const plan = trackingPlan(
    {
      ga: import.meta.env.VITE_GA4_ID,
      clarity: import.meta.env.VITE_CLARITY_ID,
      meta: import.meta.env.VITE_META_PIXEL_ID,
      linkedin: import.meta.env.VITE_LINKEDIN_PARTNER_ID,
    },
    choice
  );

  if (plan.ga4) {
    ensureGtag(win);
    win.gtag?.("consent", "update", {
      analytics_storage: "granted",
      ad_storage: choice.marketing ? "granted" : "denied",
      ad_user_data: choice.marketing ? "granted" : "denied",
      ad_personalization: choice.marketing ? "granted" : "denied",
    });
    preconnect("https://www.googletagmanager.com");
    preconnect("https://www.google-analytics.com");
    win.gtag?.("js", new Date());
    win.gtag?.("config", plan.ga4, { anonymize_ip: true });
    loadScript(
      `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(plan.ga4)}`
    );
  }

  const clarityId = plan.clarity;
  const pixelId = plan.meta;
  const linkedInId = plan.linkedin;

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
