import {defineArrayMember, defineField, defineType} from 'sanity'

export const event = defineType({
  title: 'Artikkel',
  name: 'event',
  type: 'document',
  fields: [
    defineField({
      title: 'Tittel',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Tilleggsinfo',
      name: 'info',
      type: 'string',
    }),
    defineField({
      title: 'Beskrivelse',
      name: 'description',
      type: 'text',
    }),
    defineField({
      title: 'Innhold',
      description: 'What is this article about?',
      name: 'content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
        }),
        defineArrayMember({
          type: 'image',
          fields: [
            {
              name: 'imageCaption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'imageAlt',
              type: 'string',
              title: 'Image alt. text',
            },
          ],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'URL slug',
      name: 'eventSlug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
