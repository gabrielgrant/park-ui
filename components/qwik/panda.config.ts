import { type Config, defineConfig, type Preset } from '@pandacss/dev'
import { plugin as parkPlugin, preset as parkPreset } from '@park-ui/preset'
import pluginQwik from 'pandacss-plugin-qwik'

// @park-ui/preset is typed against the Panda 1 used by the other frameworks.
// The objects themselves work unchanged under Panda 2.
const preset = parkPreset as unknown as Preset
const plugin = parkPlugin as unknown as NonNullable<Config['plugins']>[number]

export default defineConfig({
  presets: [preset],
  preflight: true,
  include: ['./src/**/*.{ts,tsx}', './dev/**/*.{ts,tsx}'],
  jsxFramework: 'qwik',
  plugins: [plugin, pluginQwik()],
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
