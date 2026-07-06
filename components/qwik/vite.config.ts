import { qwikVite } from '@qwik.dev/core/optimizer'
import { qwikRouter } from '@qwik.dev/router/vite'
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

// Drives both the dev playground (`bun run dev`, a tiny Qwik router app under
// dev/) and the headless vitest suite. Browser interaction tests live in
// vitest.browser.config.ts.
export default defineConfig({
  plugins: [
    qwikRouter({ routesDir: 'dev/routes' }),
    qwikVite({ devTools: { clickToSource: false } }),
    tsconfigPaths(),
  ],
  test: {
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/*.browser.test.{ts,tsx}'],
  },
})
