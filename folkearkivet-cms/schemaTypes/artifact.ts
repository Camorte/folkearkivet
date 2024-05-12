import {defineType, defineField} from 'sanity'

export const artifact = defineType({
  title: 'Bidrag',
  name: 'contribution',
  type: 'document',
  fields: [
    defineField({title: 'Image', name: 'image', type: 'image'}),
    defineField({title: 'Title', name: 'title', type: 'string'}),
    defineField({title: 'Description', name: 'description', type: 'text'}),
  ],
})
