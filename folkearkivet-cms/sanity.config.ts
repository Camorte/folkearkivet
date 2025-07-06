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

  schema: {
    types: schemaTypes,
  },
})
