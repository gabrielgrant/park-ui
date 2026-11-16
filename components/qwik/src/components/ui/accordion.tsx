import { Accordion } from '@ark-ui/qwik/accordion'
import { ark } from '@ark-ui/qwik/factory'
import { createStyleContext } from 'styled-system/jsx'
import { accordion } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'
import { ChevronDownIcon } from './icons'

const { withProvider, withContext } = createStyleContext(accordion)

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider(Accordion.Root, 'root')
export const Item = withContext(Accordion.Item, 'item')
export const ItemContent = withContext(Accordion.ItemContent, 'itemContent')
export const ItemIndicator = withContext(Accordion.ItemIndicator, 'itemIndicator', {
  defaultProps: { children: <ChevronDownIcon /> },
})
export const ItemTrigger = withContext(Accordion.ItemTrigger, 'itemTrigger')
export const ItemBody = withContext(ark.div, 'itemBody')
