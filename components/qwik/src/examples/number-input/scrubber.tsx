import { InputGroup, NumberInput } from '@/components/ui'

export const App = () => {
  return (
    <NumberInput.Root defaultValue="42">
      <NumberInput.Control />
      <InputGroup
        startElement={
          <NumberInput.Scrubber pointerEvents="auto">
            <ArrowLeftRightIcon />
          </NumberInput.Scrubber>
        }
      >
        <NumberInput.Input />
      </InputGroup>
    </NumberInput.Root>
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

const ArrowLeftRightIcon = () => (
  <svg aria-hidden="true" {...svgProps}>
    <path d="M8 3 4 7l4 4" />
    <path d="M4 7h16" />
    <path d="m16 21 4-4-4-4" />
    <path d="M20 17H4" />
  </svg>
)
