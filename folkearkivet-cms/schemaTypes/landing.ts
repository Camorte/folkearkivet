import {defineField, defineType} from 'sanity'

export const landing = defineType({
  title: 'Landingsside',
  name: 'landing',
  type: 'document',
  fields: [
    defineField({
      title: 'Event referanse',
      name: 'eventRef',
      type: 'reference',
      to: [{type: 'event'}],
    }),
  ],
})
