import {defineType, defineField} from 'sanity'

export const mapPoint = defineType({
  name: 'mapPoint',
  title: 'Map Point',
  type: 'object',
  fields: [
    defineField({
      name: 'location',
      title: 'Location',
      type: 'geopoint',
    }),
    defineField({name: 'title', type: 'string', title: 'Title'}),
    defineField({name: 'detail', type: 'string', title: 'Detail'}),
  ],
})
