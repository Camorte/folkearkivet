import {defineType} from 'sanity'
import {LeafletInput} from '../components/LeafletInput'

export const mapPointArray = defineType({
  name: 'mapPointArray',
  title: 'Lokasjons punkter',
  type: 'array',
  of: [{type: 'mapPoint'}],
  options: {modal: {type: 'dialog'}},
  components: {
    input: LeafletInput,
  },
})
