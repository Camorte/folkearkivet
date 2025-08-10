import {defineType, defineField} from 'sanity'

export const specialCategory = defineType({
  title: 'Spesialkategori',
  name: 'specialCategory',
  type: 'document',
  fields: [
    defineField({
      title: 'Bilde',
      name: 'image',
      type: 'image',
      options: {
        metadata: ['blurhash', 'lqip', 'palette', 'exif', 'location'],
      },
    }),
    defineField({title: 'Navn', name: 'name', type: 'string'}),
  ],
})
