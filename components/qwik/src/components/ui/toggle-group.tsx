import { ToggleGroup } from '@ark-ui/qwik/toggle-group'
import { createStyleContext } from 'styled-system/jsx'
import { toggleGroup } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

const { withProvider, withContext } = createStyleContext(toggleGroup)

export type RootProps = ComponentProps<typeof Root>

export const Root = withProvider(ToggleGroup.Root, 'root')
export const Item = withContext(ToggleGroup.Item, 'item')
