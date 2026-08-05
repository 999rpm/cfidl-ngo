import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { sanityClient } from './client';
import type { SanityImg } from './queries';

const builder = createImageUrlBuilder(sanityClient);

/**
 * Build an optimized, CDN-served URL from a Sanity image reference.
 * Usage: urlFor(post.mainImage).width(800).height(600).url()
 *
 * Accepts our own loosely-typed SanityImg (what our GROQ projections
 * actually return) as well as the library's own SanityImageSource — the
 * shapes are runtime-compatible even though SanityImg is looser.
 */
export function urlFor(source: SanityImg | SanityImageSource | null | undefined) {
  return builder.image((source ?? {}) as SanityImageSource);
}

/** True if the image object actually has an underlying asset. */
export function hasImage(image?: SanityImg | null): boolean {
  return Boolean(image?.asset?._ref || image?.asset?.url);
}
