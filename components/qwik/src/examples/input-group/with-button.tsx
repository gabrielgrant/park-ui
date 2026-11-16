import { IconButton, Input, InputGroup } from '@/components/ui'

export const App = () => {
  return (
    <InputGroup
      endElement={
        <IconButton variant="surface" size="xs" colorPalette="gray">
          <SearchIcon />
        </IconButton>
      }
    >
      <Input placeholder="Search" />
    </InputGroup>
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

const SearchIcon = () => (
  <svg aria-hidden="true" {...svgProps}>
    <path d="m21 21-4.34-4.34" />
    <circle cx="11" cy="11" r="8" />
  </svg>
)
