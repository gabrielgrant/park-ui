import { HoverCard } from '@ark-ui/qwik/hover-card'
import { createStyleContext } from 'styled-system/jsx'
import { hoverCard } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

const { withRootProvider, withContext } = createStyleContext(hoverCard)

export type RootProps = ComponentProps<typeof Root>
export const Root = withRootProvider(HoverCard.Root)
export const Arrow = withContext(HoverCard.Arrow, 'arrow')
export const ArrowTip = withContext(HoverCard.ArrowTip, 'arrowTip')
export const Content = withContext(HoverCard.Content, 'content')
export const Positioner = withContext(HoverCard.Positioner, 'positioner')
export const Trigger = withContext(HoverCard.Trigger, 'trigger')
