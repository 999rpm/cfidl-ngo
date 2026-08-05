import { defineField, defineType } from 'sanity';
import { HeartIcon } from '@sanity/icons/Heart';

export default defineType({
  name: 'getInvolvedPage',
  title: 'Get Involved Page',
  type: 'document',
  icon: HeartIcon,
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow label',
      type: 'string',
      group: 'content',
      initialValue: 'Get involved',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
      initialValue: "Let's build a sanitation market that works",
    }),
    defineField({
      name: 'intro',
      title: 'Intro text',
      type: 'text',
      rows: 3,
      group: 'content',
      initialValue:
        'There is a place in this system for funders, businesses, lenders and researchers alike.',
    }),
    defineField({
      name: 'ways',
      title: 'Ways to get involved',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'way',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            { name: 'cta', title: 'Button', type: 'ctaButton' },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
      initialValue: [
        {
          title: 'Fund a programme',
          description:
            'Grants and blended finance let us reach the next district faster. Talk to us about current funding gaps.',
          cta: { label: 'Discuss funding', href: '/contact', style: 'primary' },
        },
        {
          title: 'Partner with us',
          description:
            'Financial institutions, sanitation businesses and local government all plug into the Diamond Model directly.',
          cta: { label: 'Explore partnership', href: '/contact', style: 'secondary' },
        },
        {
          title: 'Share your expertise',
          description:
            'Researchers and technical specialists in WASH, microfinance or circular economy — we want to hear from you.',
          cta: { label: 'Get in touch', href: '/contact', style: 'secondary' },
        },
      ],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: {
    prepare: () => ({ title: 'Get Involved Page' }),
  },
});
