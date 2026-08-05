import { defineField, defineType } from 'sanity';
import { DocumentsIcon } from '@sanity/icons/Documents';

export default defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Newsletter', value: 'newsletter' },
          { title: 'Report', value: 'report' },
          { title: 'Factsheet', value: 'factsheet' },
          { title: 'Toolkit', value: 'toolkit' },
        ],
      },
      initialValue: 'newsletter',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'file',
      title: 'PDF file',
      type: 'file',
      description: 'Upload a PDF, or leave blank and use the external link field instead.',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External link',
      type: 'url',
      description: 'Use this for newsletters hosted elsewhere (e.g. Canva, Mailchimp archive).',
    }),
  ],
  orderings: [
    { title: 'Date, new to old', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'type', media: 'coverImage' },
  },
});
