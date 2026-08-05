import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';

const SANITY_PROJECT_ID = process.env.PUBLIC_SANITY_PROJECT_ID || 'placeholder';
const SANITY_DATASET = process.env.PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://www.cfidl.org',

  // The whole site is prerendered to static HTML by default (fast, cheap to
  // host, great SEO). Only src/pages/api/newsletter.ts opts out of that via
  // `export const prerender = false`, so it can run Zoho SMTP on demand.
  // See: https://docs.astro.build/en/guides/on-demand-rendering/
  output: 'static',
  adapter: vercel(),

  integrations: [
    sitemap(),
    react(),
    // Embeds Sanity Studio at /studio using the schema in ./schemaTypes.
    // Safe to keep active even before a real project ID is set.
    sanity({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      useCdn: true,
      apiVersion: '2026-01-01',
      studioBasePath: '/studio',
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
