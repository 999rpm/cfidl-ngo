import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import { structure } from './structure';

const projectId =
  process.env.PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || 'placeholder';
const dataset =
  process.env.PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production';

export default defineConfig({
  name: 'cfidl',
  title: 'CFIDL CMS',

  projectId,
  dataset,

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
