import { defineConfig } from 'tsdown'

/**
 * Standalone build config (used outside the DSH monorepo).
 *
 * Mirrors the monorepo's `clientBundle` output layout so the published
 * `package.json` `exports` map keeps resolving:
 *   src/index.ts        -> lib/index.js
 *   src/invariant.ts    -> lib/invariant.js
 *   src/client/index.ts -> lib/client.js
 *
 * CSS is inlined into the JS bundles and injected at runtime (matching the
 * original hand-built artifact). All `@deepseek-ai/*` packages, cordis and
 * react/react-dom stay external — they are provided by the host DSH runtime.
 */
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    invariant: 'src/invariant.ts',
    client: 'src/client/index.ts',
  },
  outDir: 'lib',
  format: ['esm'],
  // Use the self-contained standalone tsconfig. The project's root tsconfig.json
  // `extends ../../../tsconfig.base.client.json` (monorepo-only) and references
  // sibling monorepo packages, so it cannot be used outside the monorepo.
  tsconfig: './tsconfig.standalone.json',
  // No dts here — tsconfig.standalone.json (tsc) emits lib/types/*.d.ts.
  dts: false,
  css: { inject: true },
  deps: {
    neverBundle: (id) =>
      /^@deepseek-ai\//.test(id) ||
      id === 'react' ||
      id === 'react-dom' ||
      id.startsWith('react/'),
  },
})
