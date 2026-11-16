import { HStack } from 'styled-system/jsx'
import { SegmentGroup } from '@/components/ui'

export const App = () => {
  return (
    <SegmentGroup.Root defaultValue="table">
      <SegmentGroup.Indicator />
      <SegmentGroup.Items
        items={[
          {
            value: 'table',
            label: (
              <HStack>
                <TableIcon />
                Table
              </HStack>
            ),
          },
          {
            value: 'board',
            label: (
              <HStack>
                <Grid2X2Icon />
                Board
              </HStack>
            ),
          },
          {
            value: 'list',
            label: (
              <HStack>
                <ListIcon />
                List
              </HStack>
            ),
          },
        ]}
      />
    </SegmentGroup.Root>
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

const TableIcon = () => (
  <svg aria-hidden="true" {...lucide}>
    <path d="M12 3v18" />
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M3 9h18" />
    <path d="M3 15h18" />
  </svg>
)

const Grid2X2Icon = () => (
  <svg aria-hidden="true" {...lucide}>
    <path d="M12 3v18" />
    <path d="M3 12h18" />
    <rect x="3" y="3" width="18" height="18" rx="2" />
  </svg>
)

const ListIcon = () => (
  <svg aria-hidden="true" {...lucide}>
    <path d="M3 12h.01" />
    <path d="M3 18h.01" />
    <path d="M3 6h.01" />
    <path d="M8 12h13" />
    <path d="M8 18h13" />
    <path d="M8 6h13" />
  </svg>
)
