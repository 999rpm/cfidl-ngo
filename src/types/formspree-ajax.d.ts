// @formspree/ajax's "browser" field (which bundlers use for client <script>
// code) points at an IIFE build with no matching .d.ts, so we import the
// real ESM entry point directly (see ContactForm.astro). This re-exports
// the package's own official types onto that deep import path.
declare module '@formspree/ajax/dist/index.mjs' {
  export * from '@formspree/ajax';
}
