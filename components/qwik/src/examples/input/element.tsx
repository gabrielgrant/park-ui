import { Stack } from 'styled-system/jsx'
import { InfoIcon, Input, InputGroup, UserIcon } from '@/components/ui'

export const App = () => {
  return (
    <Stack gap="4">
      <InputGroup startElement={<UserIcon />}>
        <Input placeholder="Username" />
      </InputGroup>

      <InputGroup endElement={<EuroIcon />}>
        <Input placeholder="0.00" />
      </InputGroup>

      <InputGroup startElement={<EuroIcon />} endElement={<InfoIcon />}>
        <Input placeholder="0.00" />
      </InputGroup>
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

const EuroIcon = () => (
  <svg aria-hidden="true" {...svgProps}>
    <path d="M4 10h12" />
    <path d="M4 14h9" />
    <path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2" />
  </svg>
)
