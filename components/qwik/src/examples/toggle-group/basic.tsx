import { button, group } from 'styled-system/recipes'
import { ToggleGroup } from '@/components/ui'

export const App = () => {
  const itemClass = button({ variant: 'outline' })

  return (
    <ToggleGroup.Root defaultValue={['left']} class={group({ attached: true })}>
      <ToggleGroup.Item value="left" aria-label="Align Left" class={itemClass} px="0" py="0">
        <AlignLeftIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="center" aria-label="Align Center" class={itemClass} px="0" py="0">
        <AlignCenterIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="right" aria-label="Align Right" class={itemClass} px="0" py="0">
        <AlignRightIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="justify" aria-label="Align Justify" class={itemClass} px="0" py="0">
        <AlignJustifyIcon />
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

const AlignLeftIcon = () => (
  <svg aria-hidden="true" {...lucide}>
    <path d="M15 12H3" />
    <path d="M17 18H3" />
    <path d="M21 6H3" />
  </svg>
)

const AlignCenterIcon = () => (
  <svg aria-hidden="true" {...lucide}>
    <path d="M17 12H7" />
    <path d="M19 18H5" />
    <path d="M21 6H3" />
  </svg>
)

const AlignRightIcon = () => (
  <svg aria-hidden="true" {...lucide}>
    <path d="M21 12H9" />
    <path d="M21 18H7" />
    <path d="M21 6H3" />
  </svg>
)

const AlignJustifyIcon = () => (
  <svg aria-hidden="true" {...lucide}>
    <path d="M3 12h18" />
    <path d="M3 18h18" />
    <path d="M3 6h18" />
  </svg>
)
