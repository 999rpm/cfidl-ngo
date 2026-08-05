import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'socialLinks',
  title: 'Social links',
  type: 'object',
  fields: [
    defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
    defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'x', title: 'X (Twitter) URL', type: 'url' }),
    defineField({ name: 'youtube', title: 'YouTube URL', type: 'url' }),
    defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
  ],
});
