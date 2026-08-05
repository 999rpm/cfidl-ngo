import { defineField, defineType } from 'sanity';
import { NumberIcon } from '@sanity/icons/Number';

export default defineType({
  name: 'stat',
  title: 'Impact Stat',
  type: 'document',
  icon: NumberIcon,
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'number',
      description:
        'The raw number. Formatting (commas, decimals) is handled automatically on the site.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'prefix',
      title: 'Prefix',
      type: 'string',
      description: 'e.g. "€" or "~"',
    }),
    defineField({
      name: 'suffix',
      title: 'Suffix',
      type: 'string',
      description: 'e.g. "+", "M", "tonnes"',
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'group',
      title: 'Group',
      type: 'string',
      options: {
        list: [
          { title: 'Headline (home + impact page hero stats)', value: 'headline' },
          { title: 'Secondary (supporting strip)', value: 'secondary' },
        ],
      },
      initialValue: 'headline',
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'label', value: 'value', suffix: 'suffix', group: 'group' },
    prepare: ({ title, value, suffix, group }) => ({
      title: `${value ?? ''}${suffix ?? ''} — ${title ?? ''}`,
      subtitle: group,
    }),
  },
});
