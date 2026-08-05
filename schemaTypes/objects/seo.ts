import { defineField, defineType } from 'sanity';
import { SearchIcon } from '@sanity/icons/Search';

export default defineType({
  name: 'seo',
  title: 'SEO & sharing',
  type: 'object',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      description:
        'Shown in browser tabs and search results. Falls back to the page title if left blank.',
      validation: (Rule) =>
        Rule.max(60).warning('Titles over ~60 characters get truncated by Google.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'The one or two sentences that show up under the title in search results.',
      validation: (Rule) =>
        Rule.max(160).warning('Descriptions over ~160 characters get truncated.'),
    }),
    defineField({
      name: 'shareImage',
      title: 'Social share image',
      type: 'image',
      description:
        'Shown when this page is shared on Facebook, LinkedIn, X, etc. Ideally 1200×630.',
      options: { hotspot: true },
    }),
  ],
  options: { collapsible: true, collapsed: true },
});
