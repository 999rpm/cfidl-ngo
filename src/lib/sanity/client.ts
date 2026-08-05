import { createClient, type ClientConfig } from '@sanity/client';

export const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? '';
export const dataset = import.meta.env.PUBLIC_SANITY_DATASET ?? 'production';
export const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION ?? '2026-01-01';

/**
 * True once a real Sanity project ID has been supplied. Every query in
 * ./queries.ts checks this before calling the API, so the site builds and
 * renders nicely with placeholder content even before Sanity is connected.
 */
export const isSanityConfigured = Boolean(projectId);

const config: ClientConfig = {
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  useCdn: true,
  // Only used if you set SANITY_API_READ_TOKEN (e.g. for a private dataset
  // or to read drafts). Safe to leave undefined for public datasets.
  token: import.meta.env.SANITY_API_READ_TOKEN || undefined,
};

export const sanityClient = createClient(config);

/**
 * Fetch from Sanity with a typed fallback. If Sanity isn't configured yet,
 * or the request fails for any reason (network hiccup, bad query while a
 * schema change is mid-flight, wrong project ID), this returns `fallback`
 * instead of throwing — so a single content hiccup can't take the whole
 * static build down.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T,
): Promise<T> {
  if (!isSanityConfigured) return fallback;

  try {
    const result = await sanityClient.fetch<T>(query, params);
    return result ?? fallback;
  } catch (error) {
    console.warn('[sanity] query failed, using fallback content:\n', error);
    return fallback;
  }
}
