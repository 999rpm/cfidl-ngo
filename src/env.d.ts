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
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
