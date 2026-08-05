import { defineField, defineType } from 'sanity';
import { TagIcon } from '@sanity/icons/Tag';

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
});
