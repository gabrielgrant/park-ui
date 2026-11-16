import type { PropsOf } from '@qwik.dev/core'
import { Wrap } from 'styled-system/jsx'
import { Button } from '@/components/ui'

const CircleDotIcon = (props: PropsOf<'svg'>) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="1" />
  </svg>
)

export const App = () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const

  return (
    <Wrap gap="4">
      {sizes.map((size) => (
        <Button key={size} size={size}>
          Button <CircleDotIcon />
        </Button>
      ))}
    </Wrap>
  )
}
