/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_SANITY_PROJECT_ID: string;
  readonly PUBLIC_SANITY_DATASET: string;
  readonly PUBLIC_SANITY_API_VERSION: string;
  readonly SANITY_API_READ_TOKEN?: string;
  readonly PUBLIC_FORMSPREE_FORM_ID: string;
  // Server-only (no PUBLIC_ prefix) — read in src/pages/api/newsletter.ts.
  // These were previously undeclared here, which still worked at runtime
  // (Vite's own ImportMetaEnv includes a fallback index signature) but
  // meant a typo like ZOHO_SMPT_HOST wouldn't be caught by `npm run
  // typecheck` — it would just silently read as undefined.
  readonly ZOHO_SMTP_HOST?: string;
  readonly ZOHO_SMTP_PORT?: string;
  readonly ZOHO_SMTP_SECURE?: string;
  readonly ZOHO_SMTP_USER?: string;
  readonly ZOHO_SMTP_PASSWORD?: string;
  readonly ZOHO_NOTIFY_TO?: string;
  readonly NEWSLETTER_FROM_NAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
