import { qwikVite } from '@qwik.dev/core/optimizer'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [qwikVite(), tsconfigPaths()],
  resolve: {
    // the linked @ark-ui/qwik + @zag-js checkouts each see their own copy of
    // @qwik.dev/core; force a single runtime instance
    dedupe: ['@qwik.dev/core'],
  },
  optimizeDeps: {
    // these ship Qwik $() QRLs as TS source — esbuild pre-bundling would
    // bypass the Qwik optimizer and break serialization at runtime
    exclude: ['@ark-ui/qwik', '@zag-js/qwik'],
  },
  test: {
    globals: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/*.browser.test.{ts,tsx}'],
  },
})
