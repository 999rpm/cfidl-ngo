import { defineField, defineType } from 'sanity';
import { MenuIcon } from '@sanity/icons/Menu';

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'Menu items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navItem',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            { name: 'href', title: 'Link', type: 'string' },
            {
              name: 'children',
              title: 'Dropdown items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'navChild',
                  fields: [
                    { name: 'label', title: 'Label', type: 'string' },
                    { name: 'href', title: 'Link', type: 'string' },
                  ],
                  preview: { select: { title: 'label', subtitle: 'href' } },
                },
              ],
            },
          ],
          preview: {
            select: { title: 'label', subtitle: 'href', children: 'children' },
            prepare: ({ title, subtitle, children }) => ({
              title,
              subtitle: children?.length ? `${children.length} dropdown item(s)` : subtitle,
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Navigation' }),
  },
});
