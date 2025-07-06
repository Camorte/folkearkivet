import {defineConfig, definePlugin, InputProps} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import structure from './structure'

import {LeafletInput} from './components/LeafletInput'
import {ComponentType} from 'react'

export default defineConfig({
  name: 'default',
  title: 'folkearkivet',

  projectId: 's06ly51d',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],
  document: {
    actions: (prev, context) => {
      // Only add the action for documents of type "movie"
      // for other types return the current array of actions as is
      return context.schemaType === 'map' ||
        context.schemaType === 'landing' ||
        context.schemaType === 'contact' ||
        context.schemaType === 'biography'
        ? [...prev.filter((action) => action.action !== 'duplicate' && action.action !== 'delete')]
        : prev
    },
    newDocumentOptions: (prev, {currentUser, creationContext}) => {
      if (creationContext.type === 'global') {
        // Hide the creation of "settings" documents if the context is global
        return prev.filter(
          (templateItem) =>
            templateItem.templateId != 'map' &&
            templateItem.templateId != 'landing' &&
            templateItem.templateId != 'contact' &&
            templateItem.templateId != 'biography',
        )
      }
      return prev
    },
  },
  schema: {
    types: schemaTypes,
  },
})
