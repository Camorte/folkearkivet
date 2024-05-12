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
        .child(
          S.documentList()
            .menuItems([
              S.orderingMenuItem({
                title: 'Tittel stigende',
                by: [{field: 'Tittel', direction: 'asc'}],
              }),
              S.orderingMenuItem({
                title: 'Tittel sykende',
                by: [{field: 'title', direction: 'desc'}],
              }),
              S.orderingMenuItem({
                title: 'Kategori stigende',
                by: [{field: 'category', direction: 'asc'}],
              }),
              S.orderingMenuItem({
                title: 'Kategori sykende',
                by: [{field: 'category', direction: 'desc'}],
              }),
              S.orderingMenuItem({
                title: 'Sted stigende',
                by: [{field: 'location', direction: 'asc'}],
              }),
              S.orderingMenuItem({
                title: 'Sted sykende',
                by: [{field: 'location', direction: 'desc'}],
              }),
            ])
            .title('Bidrag')
            .filter('_type == "contribution"'),
        ),
      S.listItem()
        .title('Biografi')
        .schemaType('biography')
        .child(S.document().schemaType('biography').documentId('biography')),
      S.listItem()
        .title('Kontakt')
        .schemaType('contact')
        .child(S.document().schemaType('contact').documentId('contact')),
      S.listItem()
        .title('Program')
        .schemaType('event')
        .child(S.documentList().title('Arrangementer').filter('_type == "event"')),
    ])

export default structure
