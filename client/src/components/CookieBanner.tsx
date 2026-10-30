import { openCookiePreferences, readCookieConsent, writeCookieConsent } from "@/lib/consent";
import { hasOptionalTrackers } from "@/lib/tracking";
import { useEffect, useState } from "react";

export function CookieBanner() {
  const enabled = hasOptionalTrackers();
  const [open, setOpen] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    if (!readCookieConsent()) setOpen(true);
    const reopen = () => {
      const saved = readCookieConsent();
      setAnalytics(saved?.analytics ?? false);
      setMarketing(saved?.marketing ?? false);
      setCustomize(true);
      setOpen(true);
    };
    window.addEventListener("nk-open-cookie-preferences", reopen);
    return () => window.removeEventListener("nk-open-cookie-preferences", reopen);
  }, [enabled]);

  if (!enabled || !open) return null;

  function save(next: { analytics: boolean; marketing: boolean }) {
    writeCookieConsent(next);
    window.location.reload();
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-[#1B4D5C] bg-white p-4 shadow-2xl"
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
    >
      <div className="container mx-auto max-w-4xl">
        <h2 id="cookie-title" className="text-base font-semibold text-gray-900">
          Cookies neste site
        </h2>
        <p id="cookie-desc" className="mt-2 text-sm text-gray-600">
          Cookies necessários guardam só a sua escolha neste navegador. Analíticos (Google Analytics 4 e Microsoft Clarity) e de marketing (Meta Pixel e LinkedIn Insight Tag) só carregam se você aceitar a categoria e a ferramenta estiver ativa.
        </p>
        {customize && (
          <div className="mt-4 space-y-2 text-sm text-gray-800">
            <label className="flex items-start gap-2">
              <input type="checkbox" checked disabled className="mt-1" />
              <span>Necessários — sempre ativos</span>
            </label>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
                className="mt-1 accent-[#2B7A8E]"
              />
              <span>Analíticos</span>
            </label>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(event) => setMarketing(event.target.checked)}
                className="mt-1 accent-[#2B7A8E]"
              />
              <span>Marketing</span>
            </label>
          </div>
        )}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            className="rounded-md bg-[#2B7A8E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1B4D5C]"
            onClick={() => save({ analytics: true, marketing: true })}
          >
            Aceitar todos
          </button>
          <button
            type="button"
            className="rounded-md border border-[#2B7A8E] px-4 py-2 text-sm font-semibold text-[#2B7A8E] hover:bg-[#2B7A8E] hover:text-white"
            onClick={() => save({ analytics: false, marketing: false })}
          >
            Rejeitar não essenciais
          </button>
          {customize ? (
            <button
              type="button"
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
              onClick={() => save({ analytics, marketing })}
            >
              Salvar preferências
            </button>
          ) : (
            <button
              type="button"
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
              onClick={() => setCustomize(true)}
            >
              Personalizar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function CookiePreferencesButton({ className }: { className?: string }) {
  if (!hasOptionalTrackers()) return null;
  return (
    <button type="button" className={className} onClick={openCookiePreferences}>
      Preferências de cookies
    </button>
  );
}
