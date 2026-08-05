import { defineField, defineType } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons/Envelope';

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: EnvelopeIcon,
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow label',
      type: 'string',
      group: 'content',
      initialValue: 'Get in touch',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
      initialValue: "Let's talk",
    }),
    defineField({
      name: 'intro',
      title: 'Intro text',
      type: 'text',
      rows: 3,
      group: 'content',
      initialValue:
        'Questions about our programmes, press enquiries, partnership ideas — this is the fastest way to reach us.',
    }),
    defineField({
      name: 'formSubjects',
      title: 'Subject options',
      description: 'Shown in the contact form dropdown.',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      initialValue: [
        'General enquiry',
        'Partnership / funding',
        'Press / media',
        'Careers',
        'Something else',
      ],
    }),
    defineField({
      name: 'mapLatitude',
      title: 'Map latitude',
      type: 'number',
      group: 'content',
      description: 'Set both latitude and longitude to show an embedded map on the Contact page.',
    }),
    defineField({
      name: 'mapLongitude',
      title: 'Map longitude',
      type: 'number',
      group: 'content',
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: {
    prepare: () => ({ title: 'Contact Page' }),
  },
});
