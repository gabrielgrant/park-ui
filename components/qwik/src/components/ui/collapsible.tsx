import { Collapsible } from '@ark-ui/qwik/collapsible'
import { createStyleContext } from 'styled-system/jsx'
import { collapsible } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

const { withProvider, withContext } = createStyleContext(collapsible)

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider(Collapsible.Root, 'root')
export const Content = withContext(Collapsible.Content, 'content')
export const Indicator = withContext(Collapsible.Indicator, 'indicator')
export const Trigger = withContext(Collapsible.Trigger, 'trigger')
