import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  preflight: false,
  presets: ['@pandacss/preset-base', '@park-ui/panda-preset'],
  outdir: 'styled-system',
  staticCss: {
    recipes: {
      accordion: [{ size: ['*'] }],
      alert: [{}],
      avatar: [{ size: ['*'] }],
      badge: [{ variant: ['*'], size: ['*'] }],
      button: [{ variant: ['*'], size: ['*'] }],
      card: [{}],
      carousel: [{ size: ['*'] }],
      checkbox: [{ size: ['*'] }],
      code: [{ variant: ['*'], size: ['*'] }],
      combobox: [{ size: ['*'] }],
      dialog: [{}],
      drawer: [{ placement: ['*'] }],
      editable: [{}],
      hoverCard: [{}],
      icon: [{ size: ['*'] }],
      input: [{ size: ['*'] }],
      menu: [{ size: ['*'] }],
      pagination: [{}],
      pinInput: [{ size: ['*'] }],
      popover: [{}],
      numberInput: [{ size: ['*'] }],
      radioGroup: [{ size: ['*'] }],
      radioButtonGroup: [{ size: ['*'], variant: ['*'] }],
      ratingGroup: [{ size: ['*'] }],
      segmentGroup: [{ size: ['*'] }],
      select: [{ size: ['*'], variant: ['*'] }],
      slider: [{ size: ['*'] }],
      splitter: [{ size: ['*'] }],
      switchRecipe: [{ size: ['*'] }],
      table: [{ size: ['*'], variant: ['*'] }],
      tabs: [{ size: ['*'], variant: ['*'] }],
      tagsInput: [{ size: ['*'], variant: ['*'] }],
      textarea: [{ size: ['*'], variant: ['*'] }],
      toggleGroup: [{ size: ['*'], variant: ['*'] }],
      tooltip: [{}],
    },
    css: [
      {
        properties: {
          fontWeight: ['*'],
          textStyle: ['*'],
        },
      },
    ],
  },
})
