import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'ctaButton',
  title: 'Button',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description: 'An internal path (e.g. /impact) or a full URL (e.g. https://...)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Primary (filled)', value: 'primary' },
          { title: 'Secondary (outline)', value: 'secondary' },
          { title: 'Ghost (text only)', value: 'ghost' },
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' },
  },
});
