import { defineField, defineType } from 'sanity';
import { HomeIcon } from '@sanity/icons/Home';

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'intro', title: 'Intro' },
    { name: 'stats', title: 'Impact stats' },
    { name: 'approach', title: 'Approach teaser' },
    { name: 'cta', title: 'Call to action' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'heroEyebrow',
      title: 'Eyebrow label',
      type: 'string',
      group: 'hero',
      initialValue: 'CFIDL in Bangladesh',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Headline',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
      initialValue: 'Bangladesh solved open defecation. Now comes the harder part.',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 3,
      group: 'hero',
      initialValue:
        'Roughly two in three households still lack a toilet that safely contains and treats waste. We connect communities, builders, lenders and regulators to close that gap — one household, one system, one district at a time.',
    }),
    defineField({
      name: 'heroCtas',
      title: 'Buttons',
      type: 'array',
      group: 'hero',
      of: [{ type: 'ctaButton' }],
      validation: (Rule) => Rule.max(2),
    }),
    defineField({
      name: 'heroSlides',
      title: 'Hero background slideshow',
      type: 'array',
      group: 'hero',
      description:
        'Add 3–7 wide (landscape) photos. They rotate as a slow crossfade behind the hero text. Falls back to a set of placeholder photos if left empty.',
      of: [
        {
          type: 'image',
          name: 'heroSlide',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              description: 'Brief description for screen readers (the image is decorative).',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(7),
    }),
    defineField({
      name: 'introEyebrow',
      title: 'Eyebrow label',
      type: 'string',
      group: 'intro',
      initialValue: 'Our focus',
    }),
    defineField({
      name: 'introHeading',
      title: 'Heading',
      type: 'string',
      group: 'intro',
      initialValue: 'Cities, sludge, systems',
    }),
    defineField({
      name: 'introBody',
      title: 'Body',
      type: 'text',
      rows: 5,
      group: 'intro',
      initialValue:
        'We concentrate on (peri-)urban areas and faecal sludge management: making sure that what leaves a toilet is actually captured, transported and treated, instead of leaking into drains, ponds and fields untreated.',
    }),
    defineField({
      name: 'introVideoId',
      title: 'YouTube video ID',
      type: 'string',
      group: 'intro',
      description:
        'Just the ID, e.g. from youtube.com/watch?v=XXXXXXXX the ID is XXXXXXXX. Leave blank to hide.',
    }),
    defineField({
      name: 'statsEyebrow',
      title: 'Eyebrow label',
      type: 'string',
      group: 'stats',
      initialValue: 'What we’ve achieved',
    }),
    defineField({
      name: 'statsHeading',
      title: 'Heading',
      type: 'string',
      group: 'stats',
      initialValue: 'Since 2020',
    }),
    defineField({
      name: 'approachEyebrow',
      title: 'Eyebrow label',
      type: 'string',
      group: 'approach',
      initialValue: 'How we work',
    }),
    defineField({
      name: 'approachHeading',
      title: 'Heading',
      type: 'string',
      group: 'approach',
      initialValue: 'The Diamond Model',
    }),
    defineField({
      name: 'approachBody',
      title: 'Body',
      type: 'text',
      rows: 4,
      group: 'approach',
      initialValue:
        'Four groups, each essential, working the same problem from a different angle. Leave one out and the system stalls.',
    }),
    defineField({
      name: 'ctaHeading',
      title: 'Heading',
      type: 'string',
      group: 'cta',
      initialValue: "Let's build a sanitation market that works",
    }),
    defineField({
      name: 'ctaBody',
      title: 'Body',
      type: 'text',
      rows: 3,
      group: 'cta',
      initialValue:
        'Whether you fund, build, regulate or bank — there is a place for you in this system.',
    }),
    defineField({
      name: 'ctaButtons',
      title: 'Buttons',
      type: 'array',
      group: 'cta',
      of: [{ type: 'ctaButton' }],
      validation: (Rule) => Rule.max(2),
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: {
    prepare: () => ({ title: 'Home Page' }),
  },
});
