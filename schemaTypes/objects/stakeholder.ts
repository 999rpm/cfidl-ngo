import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'stakeholder',
  title: 'Stakeholder',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Community (people)', value: 'community' },
          { title: 'Business (tools)', value: 'business' },
          { title: 'Financier (coins)', value: 'financier' },
          { title: 'Government (institution)', value: 'government' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'icon' },
  },
});
