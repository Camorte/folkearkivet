import {defineType, defineField} from 'sanity'

export const contribution = defineType({
  title: 'Bidrag',
  name: 'contribution',
  type: 'document',
  fields: [
    defineField({
      title: 'Bilde',
      name: 'image',
      type: 'image',
      options: {
        metadata: [
          'blurhash', // Default: included
          'lqip', // Default: included
          'palette', // Default: included
          'exif', // Default: not included
          'location', // Default: not included
        ],
      },
    }),
    defineField({title: 'Tittel', name: 'title', type: 'string'}),
    defineField({title: 'Kategori', name: 'category', type: 'string'}),
    defineField({title: 'Sted', name: 'location', type: 'string'}),
    defineField({title: 'Beksrivelse', name: 'description', type: 'text'}),
  ],
})
