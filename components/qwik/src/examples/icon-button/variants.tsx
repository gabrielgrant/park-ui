import { Wrap } from 'styled-system/jsx'
import { IconButton } from '@/components/ui'

export const App = () => {
  return (
    <Wrap gap="4">
      <IconButton variant="solid" aria-label="Search">
        <SearchIcon />
      </IconButton>
      <IconButton variant="surface" aria-label="Search">
        <SearchIcon />
      </IconButton>
      <IconButton variant="subtle" aria-label="Search">
        <SearchIcon />
      </IconButton>
      <IconButton variant="outline" aria-label="Search">
        <SearchIcon />
      </IconButton>
      <IconButton variant="plain" aria-label="Search">
        <SearchIcon />
      </IconButton>
    </Wrap>
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
