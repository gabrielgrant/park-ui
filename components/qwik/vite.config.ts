import { qwikVite } from '@qwik.dev/core/optimizer'
import { qwikRouter } from '@qwik.dev/router/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

// Drives both the dev playground (`bun run dev`, a tiny Qwik router app under
// dev/) and the headless vitest suite. Browser interaction tests live in
// vitest.browser.config.ts.
export default defineConfig({
  plugins: [
    qwikRouter({ routesDir: 'dev/routes' }),
    qwikVite({ devTools: { clickToSource: false } }),
    tsconfigPaths(),
  ],
  // @ark-ui/qwik and @zag-js/qwik ship TypeScript source that the Qwik optimizer
  // must transform. Vite's dependency pre-bundling would skip that.
  optimizeDeps: { exclude: ['@ark-ui/qwik', '@zag-js/qwik'] },
  test: {
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/*.browser.test.{ts,tsx}'],
  },
})
