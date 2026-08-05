import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'circularStep',
  title: 'Circular model step',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Collected (truck)', value: 'collected' },
          { title: 'Treated (recycle)', value: 'treated' },
          { title: 'Soil (sprout)', value: 'soil' },
          { title: 'Reinvested (coins)', value: 'reinvested' },
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
