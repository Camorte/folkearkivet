// schemas/map.ts
import {defineType, defineField} from 'sanity'

export const map = defineType({
  name: 'map',
  title: 'Arkiv kart',
  type: 'document',
  fields: [
    defineField({
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mapTitle',
      title: 'Kart tittel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Innhold',
      type: 'mapPointArray', // Now references your custom array type
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'biography', type: 'biography', title: 'Biografi'}),
    defineField({name: 'contact', type: 'contact', title: 'Kontakt oss'}),
  ],
})
