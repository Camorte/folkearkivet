import {defineType, defineField} from 'sanity'

export const mainCategory = defineType({
  title: 'Hovedkategori',
  name: 'mainCategory',
  type: 'document',
  fields: [
    defineField({
      title: 'Navn',
      name: 'name',
      type: 'string',
      initialValue: 'All categories',
    }),
    defineField({
      title: 'Bilde',
      name: 'image',
      type: 'image',
      options: {
        metadata: [
          'blurhash',
          'lqip',
          'palette',
          'exif',
          'location',
        ],
      },
    }),
  ],
})

export const category = defineType({
  title: 'Kategori',
  name: 'category',
  type: 'document',
  fields: [
    defineField({
      title: 'Bilde',
      name: 'image',
      type: 'image',
      options: {
        metadata: [
          'blurhash',
          'lqip',
          'palette',
          'exif',
          'location',
        ],
      },
    }),
    defineField({title: 'Navn', name: 'name', type: 'string'}),
  ],
})