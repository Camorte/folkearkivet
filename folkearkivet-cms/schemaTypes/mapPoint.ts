import {defineType, defineField} from 'sanity'

export const mapPoint = defineType({
  name: 'mapPoint',
  title: 'Lokasjons punkt',
  type: 'object',
  fields: [
    defineField({
      name: 'location',
      title: 'Lokasjon',
      type: 'geopoint',
    }),
    defineField({name: 'title', type: 'string', title: 'Tittel'}),
    defineField({name: 'detail', type: 'string', title: 'Beskrivelse'}),
  ],
})
