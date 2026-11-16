import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { qwikVite } from '@qwik.dev/core/optimizer'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { testSSR } from 'vitest-browser-qwik/ssr-plugin'

// Real-browser interaction tests via vitest-browser-qwik, whose `render` wires
// Qwik's client + event system (headless vitest cannot exercise interaction —
// the machine stays in SSR mode; see ark PLAN.md R5).
//
// Use a pre-installed Chromium when present (e.g. sandboxes where Playwright's
// browser download is blocked); otherwise fall back to Playwright's managed
// browser so the config stays portable.
const findPresetChromium = (root = '/opt/pw-browsers') => {
  if (!existsSync(root)) return undefined
  for (const dir of readdirSync(root).filter((d) => /^chromium-\d+$/.test(d))) {
    for (const sub of ['chrome-linux64/chrome', 'chrome-linux/chrome']) {
      const candidate = join(root, dir, sub)
      if (existsSync(candidate)) return candidate
    }
  }
  return undefined
}
const presetChromium = findPresetChromium()
const launchOptions = presetChromium
  ? { executablePath: presetChromium, args: ['--no-sandbox', '--disable-setuid-sandbox'] }
  : {}

export default defineConfig({
  // per-run overrides let several suites run side by side in one checkout
  cacheDir: process.env.VITE_CACHE_DIR ?? 'node_modules/.vite',
  plugins: [testSSR(), qwikVite(), tsconfigPaths()],
  resolve: {
    dedupe: ['@qwik.dev/core'],
  },
  optimizeDeps: {
    // these ship Qwik $() QRLs as TS source — esbuild pre-bundling would
    // bypass the Qwik optimizer and break serialization at runtime
    exclude: ['@ark-ui/qwik', '@zag-js/qwik'],
  },
  server: {
    fs: {
      // the linked @ark-ui/qwik + @zag-js checkouts live outside the package
      // root; QRL segment requests hit them via /@fs/ URLs
      allow: ['/'],
    },
  },
  test: {
    include: ['src/**/*.browser.test.{ts,tsx}'],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright({ launchOptions }),
      api: { port: Number(process.env.VITEST_BROWSER_PORT) || 63315 },
      instances: [{ browser: 'chromium' }],
    },
  },
})
