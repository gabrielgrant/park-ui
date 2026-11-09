import { existsSync } from 'node:fs'
import { qwikVite } from '@qwik.dev/core/optimizer'
import { playwright } from '@vitest/browser-playwright'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'
import { testSSR } from 'vitest-browser-qwik/ssr-plugin'

// Real-browser interaction tests via vitest-browser-qwik, whose `render`
// wires Qwik's client event system (copied from ark/packages/qwik).
//
// Use a pre-installed Chromium when present (e.g. sandboxes where Playwright's
// browser download is blocked); otherwise fall back to Playwright's managed
// browser so the config stays portable.
const presetChromium = '/opt/pw-browsers/chromium'
const launchOptions = existsSync(presetChromium)
  ? { executablePath: presetChromium, args: ['--no-sandbox', '--disable-setuid-sandbox'] }
  : {}

export default defineConfig({
  plugins: [testSSR(), qwikVite({ devTools: { clickToSource: false } }), tsconfigPaths()],
  // @ark-ui/qwik and @zag-js/qwik ship TypeScript source that the Qwik optimizer
  // must transform. Vite's dependency pre-bundling would skip that.
  optimizeDeps: { exclude: ['@ark-ui/qwik', '@zag-js/qwik'] },
  test: {
    include: ['src/**/*.browser.test.{ts,tsx}'],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright({ launchOptions }),
      instances: [{ browser: 'chromium' }],
    },
  },
})
