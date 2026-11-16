import { Wrap } from 'styled-system/jsx'
import { Icon } from '@/components/ui'

export const App = () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
  return (
    <Wrap gap="4">
      {sizes.map((size) => (
        <Icon
          key={size}
          size={size}
          color="colorPalette.solid.bg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z" />
        </Icon>
      ))}
    </Wrap>
  )
}
