import { defineField, defineType } from 'sanity';
import { SparklesIcon } from '@sanity/icons/Sparkles';

export default defineType({
  name: 'approachPage',
  title: 'Approach Page',
  type: 'document',
  icon: SparklesIcon,
  groups: [
    { name: 'intro', title: 'Intro' },
    { name: 'diamond', title: 'Diamond model' },
    { name: 'circular', title: 'Circular model' },
    { name: 'sdgs', title: 'SDGs' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow label',
      type: 'string',
      group: 'intro',
      initialValue: 'Our approach',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'intro',
      initialValue: 'One ecosystem, four levers',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
      group: 'intro',
      initialValue:
        'We work both sides of the sanitation market at once — the households who need a toilet, and the businesses, lenders and regulators who make owning one possible.',
    }),
    defineField({
      name: 'diamondHeading',
      title: 'Section heading',
      type: 'string',
      group: 'diamond',
      initialValue: 'The Diamond Model',
    }),
    defineField({
      name: 'diamondIntro',
      title: 'Section intro',
      type: 'text',
      rows: 3,
      group: 'diamond',
      initialValue:
        'We call it the Diamond Model: four groups, each essential, working the same problem from a different angle. Leave one out and the system stalls.',
    }),
    defineField({
      name: 'diamondStakeholders',
      title: 'Stakeholders',
      type: 'array',
      group: 'diamond',
      of: [{ type: 'stakeholder' }],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'circularHeading',
      title: 'Section heading',
      type: 'string',
      group: 'circular',
      initialValue: 'The Circular Sanitation Model',
    }),
    defineField({
      name: 'circularIntro',
      title: 'Section intro',
      type: 'text',
      rows: 3,
      group: 'circular',
      initialValue:
        "Waste doesn't have to be waste. Handled right, it closes a loop that helps pay for the next round of toilets.",
    }),
    defineField({
      name: 'circularSteps',
      title: 'Steps',
      type: 'array',
      group: 'circular',
      of: [{ type: 'circularStep' }],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'sdgIntro',
      title: 'Intro line',
      type: 'string',
      group: 'sdgs',
      initialValue: 'We contribute to the following Sustainable Development Goals:',
    }),
    defineField({
      name: 'sdgs',
      title: 'SDGs',
      type: 'array',
      group: 'sdgs',
      of: [
        {
          type: 'object',
          name: 'sdg',
          fields: [
            { name: 'number', title: 'SDG number', type: 'number' },
            { name: 'title', title: 'Title', type: 'string' },
          ],
          preview: {
            select: { number: 'number', title: 'title' },
            prepare: ({ number, title }) => ({ title: `${number}. ${title}` }),
          },
        },
      ],
      initialValue: [
        { number: 5, title: 'Gender Equality' },
        { number: 6, title: 'Clean Water & Sanitation' },
        { number: 8, title: 'Decent Work & Economic Growth' },
        { number: 13, title: 'Climate Action' },
      ],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: {
    prepare: () => ({ title: 'Approach Page' }),
  },
});
