import {defineType, defineField, defineArrayMember} from 'sanity'

export const example = defineType({
  title: 'Some Document Type',
  name: 'exampleDocumentType',
  type: 'document',
  fields: [
    defineField({
      title: 'String array',
      name: 'strings',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
  ],
})
