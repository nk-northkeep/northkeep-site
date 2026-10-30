export type CookieConsent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "nk-cookie-consent";

export function readCookieConsent(storage: Storage | undefined = globalThis.localStorage): CookieConsent | null {
  if (!storage) return null;
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CookieConsent>;
    if (typeof parsed.analytics !== "boolean" || typeof parsed.marketing !== "boolean") {
      return null;
    }
    return { necessary: true, analytics: parsed.analytics, marketing: parsed.marketing };
  } catch {
    return null;
  }
}

export function writeCookieConsent(choice: Pick<CookieConsent, "analytics" | "marketing">, storage: Storage | undefined = globalThis.localStorage) {
  storage?.setItem(
    STORAGE_KEY,
    JSON.stringify({ necessary: true, analytics: choice.analytics, marketing: choice.marketing })
  );
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event("nk-open-cookie-preferences"));
}
