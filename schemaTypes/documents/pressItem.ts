import { defineField, defineType } from 'sanity';
import { BillIcon } from '@sanity/icons/Bill';

export default defineType({
  name: 'pressItem',
  title: 'Press Item',
  type: 'document',
  icon: BillIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Publication / outlet',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'externalUrl',
      title: 'Link',
      type: 'url',
      description: 'Link to the article, PDF, or coverage.',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
    }),
  ],
  orderings: [
    { title: 'Date, new to old', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'source', media: 'thumbnail' },
  },
});
