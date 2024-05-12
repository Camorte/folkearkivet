// @ts-ignore
import {StructureBuilder, StructureToolOptions} from 'sanity/lib/structure'

const structure: StructureToolOptions = (S: StructureBuilder) =>
  S.list()
    .title('Folkearkivet')
    .items([
      S.listItem()
        .title('Artikler')
        .schemaType('article')
        .child(S.documentList().title('Future projects').filter('_type == "article"')),
      S.listItem()
        .title('Bidrag')
        .schemaType('contribution')
        .child(S.documentList().title('Future projects').filter('_type == "contribution"')),
      S.listItem()
        .title('Biografi')
        .schemaType('biography')
        .child(S.document().schemaType('biography').documentId('biography')),
      S.listItem()
        .title('Kontakt')
        .schemaType('contact')
        .child(S.document().schemaType('contact').documentId('contact')),
    ])

export default structure
