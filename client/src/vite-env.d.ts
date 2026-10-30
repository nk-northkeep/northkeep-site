/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_PATH?: string;
  readonly VITE_FORMSPREE_ENDPOINT?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_CLARITY_ID?: string;
  readonly VITE_GA4_ID?: string;
  readonly VITE_META_PIXEL_ID?: string;
  readonly VITE_LINKEDIN_PARTNER_ID?: string;
  readonly VITE_COMPANY_LEGAL_NAME?: string;
  readonly VITE_COMPANY_CNPJ?: string;
  readonly VITE_COMPANY_ADDRESS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
