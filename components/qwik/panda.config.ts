import { defineConfig } from '@pandacss/dev'
import { plugin, preset } from '@park-ui/preset'

export default defineConfig({
  presets: [preset],
  preflight: true,
  include: ['./src/**/*.{ts,tsx}', './dev/**/*.{ts,tsx}'],
  jsxFramework: 'qwikv2',
  plugins: [plugin],
  globalCss: {
    extend: {
      html: {
        colorPalette: 'neutral',
      },
    },
  },
  staticCss: {
    recipes: '*',
  },
})
