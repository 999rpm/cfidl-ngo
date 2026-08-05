import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllPosts, getSiteSettings } from '../lib/sanity/queries';

export async function GET(context: APIContext) {
  const [posts, settings] = await Promise.all([getAllPosts(), getSiteSettings()]);

  return rss({
    title: `${settings.orgName} — Stories`,
    description: settings.tagline || 'Stories from the field.',
    site: context.site ?? 'https://www.cfidl.org',
    items: posts.map((post) => ({
      title: post.title,
      description: post.excerpt,
      pubDate: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      link: `/stories/${post.slug.current}/`,
    })),
    customData: `<language>en</language>`,
  });
}
