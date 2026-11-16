import { Stack } from 'styled-system/jsx'
import { Group, Input, InputAddon } from '@/components/ui'

export const App = () => {
  return (
    <Stack gap="4">
      <Group attached>
        <InputAddon>https://</InputAddon>
        <Input placeholder="yoursite.com" />
      </Group>
      <Group attached>
        <InputAddon>
          <AtSignIcon />
        </InputAddon>
        <Input placeholder="Username" />
      </Group>
      <Group attached>
        <InputAddon>
          <EuroIcon />
        </InputAddon>
        <Input placeholder="0.00" />
        <InputAddon>EUR</InputAddon>
      </Group>
    </Stack>
  )
}

const svgProps = {
  viewBox: '0 0 24 24',
  width: 24,
  height: 24,
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 2,
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
} as const

const AtSignIcon = () => (
  <svg aria-hidden="true" {...svgProps}>
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
  </svg>
)

const EuroIcon = () => (
  <svg aria-hidden="true" {...svgProps}>
    <path d="M4 10h12" />
    <path d="M4 14h9" />
    <path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2" />
  </svg>
)
