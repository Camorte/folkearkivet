import {defineType, defineField} from 'sanity'

export const mapPoint = defineType({
  name: 'mapPoint',
  title: 'Lokasjons punkt',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Tittel',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      type: 'number',
      title: 'Årstall',
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: 'detail',
      type: 'string',
      title: 'Beskrivelse',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Lokasjon',
      type: 'geopoint',
    }),
  ],
})
