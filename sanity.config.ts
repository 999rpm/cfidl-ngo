import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import { structure } from './structure';

// Reads env vars safely whether this file is loaded by Vite in the browser
// (embedded Studio at /studio, where `process` doesn't exist) or by Node
// (the `sanity` CLI, e.g. `npx sanity deploy`, where `import.meta.env` doesn't exist).
const getEnv = (key: string): string | undefined => {
  if (typeof import.meta !== 'undefined' && import.meta.env?.[key]) {
    return import.meta.env[key];
  }
  if (typeof process !== 'undefined' && process.env?.[key]) {
    return process.env[key];
  }
  return undefined;
};

const projectId =
  getEnv('PUBLIC_SANITY_PROJECT_ID') || getEnv('SANITY_STUDIO_PROJECT_ID') || 'placeholder';
const dataset = getEnv('PUBLIC_SANITY_DATASET') || getEnv('SANITY_STUDIO_DATASET') || 'production';

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
