import { button, group } from 'styled-system/recipes'
import { ToggleGroup } from '@/components/ui'

export const App = () => {
  const itemClass = button({ variant: 'outline' })

  return (
    <ToggleGroup.Root
      defaultValue={['bold', 'underline']}
      multiple
      class={group({ attached: true })}
    >
      <ToggleGroup.Item value="bold" aria-label="Toggle Bold" class={itemClass} px="0" py="0">
        <BoldIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="italic" aria-label="Toggle Italic" class={itemClass} px="0" py="0">
        <ItalicIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="underline"
        aria-label="Toggle Underline"
        class={itemClass}
        px="0"
        py="0"
      >
        <UnderlineIcon />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}

const lucide = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 2,
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
} as const

const BoldIcon = () => (
  <svg aria-hidden="true" {...lucide}>
    <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
  </svg>
)

const ItalicIcon = () => (
  <svg aria-hidden="true" {...lucide}>
    <line x1="19" x2="10" y1="4" y2="4" />
    <line x1="14" x2="5" y1="20" y2="20" />
    <line x1="15" x2="9" y1="4" y2="20" />
  </svg>
)

const UnderlineIcon = () => (
  <svg aria-hidden="true" {...lucide}>
    <path d="M6 4v6a6 6 0 0 0 12 0V4" />
    <line x1="4" x2="20" y1="20" y2="20" />
  </svg>
)
