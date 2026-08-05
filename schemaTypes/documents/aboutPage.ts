import { defineField, defineType } from 'sanity';
import { UsersIcon } from '@sanity/icons/Users';

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: UsersIcon,
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'team', title: 'Team section' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow label',
      type: 'string',
      group: 'content',
      initialValue: 'Who we are',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
      initialValue: 'A market that works, not a toilet built once',
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission statement',
      type: 'text',
      rows: 3,
      group: 'content',
      initialValue:
        'Everyone deserves safe sanitation and clean water — and the fastest way to get there is by making the whole local market work, not by building toilets one at a time forever.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'focusAreas',
      title: 'Focus areas',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'focusArea',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
          ],
        },
      ],
    }),
    defineField({
      name: 'teamHeading',
      title: 'Heading',
      type: 'string',
      group: 'team',
      initialValue: 'Meet the team',
    }),
    defineField({
      name: 'teamSubheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
      group: 'team',
      initialValue: 'The people coordinating CFIDL programmes on the ground in Bangladesh.',
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: {
    prepare: () => ({ title: 'About Page' }),
  },
});
