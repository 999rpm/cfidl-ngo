import { defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons/Cog';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'orgName',
      title: 'Organisation name (short)',
      type: 'string',
      description: 'Used in the header, nav and most on-screen mentions, e.g. "CFIDL".',
      initialValue: 'CFIDL',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'legalName',
      title: 'Full legal name',
      type: 'string',
      description:
        'Used in the footer copyright line and formal/legal contexts, e.g. "Collective for Inclusive Development Ltd".',
      initialValue: 'Collective for Inclusive Development Ltd',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short phrase used in the browser tab and footer.',
      initialValue: 'Inclusive finance for safer sanitation in Bangladesh',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo (light version for dark backgrounds)',
      type: 'image',
      description: 'Used on the dark header/footer. Falls back to the main logo if left empty.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
    defineField({
      name: 'email',
      title: 'Contact email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Contact phone',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Office address',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'socialLinks',
    }),
    defineField({
      name: 'newsletterHeading',
      title: 'Newsletter sign-up heading',
      type: 'string',
      initialValue: 'Stay up to date',
    }),
    defineField({
      name: 'newsletterSubheading',
      title: 'Newsletter sign-up subheading',
      type: 'string',
      initialValue: "One email a month. No spam, ever — you're free to unsubscribe any time.",
    }),
    defineField({
      name: 'footerNote',
      title: 'Footer note',
      type: 'string',
      description: 'e.g. a short line about registration status or programme partners.',
    }),
    defineField({
      name: 'partners',
      title: 'Partner / funder logos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'partner',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'logo', title: 'Logo', type: 'image' },
            { name: 'url', title: 'Website', type: 'url' },
          ],
          preview: { select: { title: 'name', media: 'logo' } },
        },
      ],
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
});
