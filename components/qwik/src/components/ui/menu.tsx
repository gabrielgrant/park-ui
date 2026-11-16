import { Menu, useMenuItemContext } from '@ark-ui/qwik/menu'
import { component$ } from '@qwik.dev/core'
import { createStyleContext } from 'styled-system/jsx'
import { menu } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { CheckIcon, ChevronDownIcon } from './icons'

const { withRootProvider, withContext } = createStyleContext(menu)

export type RootProps = ComponentProps<typeof Root>
export const Root = withRootProvider(Menu.Root, {
  defaultProps: { unmountOnExit: true, lazyMount: true },
})
export const Arrow = withContext(Menu.Arrow, 'arrow')
export const ArrowTip = withContext(Menu.ArrowTip, 'arrowTip')
export const CheckboxItem = withContext(Menu.CheckboxItem, 'item')
export const Content = withContext(Menu.Content, 'content')
export const ContextTrigger = withContext(Menu.ContextTrigger, 'contextTrigger')
export const Indicator = withContext(Menu.Indicator, 'indicator', {
  defaultProps: { children: <ChevronDownIcon /> },
})
export const Item = withContext(Menu.Item, 'item')
export const ItemGroup = withContext(Menu.ItemGroup, 'itemGroup')
export const ItemGroupLabel = withContext(Menu.ItemGroupLabel, 'itemGroupLabel')
export const ItemText = withContext(Menu.ItemText, 'itemText')
export const Positioner = withContext(Menu.Positioner, 'positioner')
export const RadioItem = withContext(Menu.RadioItem, 'item')
export const RadioItemGroup = withContext(Menu.RadioItemGroup, 'itemGroup')
export const Separator = withContext(Menu.Separator, 'separator')
export const Trigger = withContext(Menu.Trigger, 'trigger')
export const TriggerItem = withContext(Menu.TriggerItem, 'item')

export type { MenuSelectionDetails as SelectionDetails } from '@ark-ui/qwik/menu'

const StyledItemIndicator = withContext(Menu.ItemIndicator, 'itemIndicator')

export const ItemIndicator = component$<HTMLStyledProps<'div'>>((props) => {
  const item = useMenuItemContext()

  return item?.checked ? (
    <StyledItemIndicator {...props}>
      <CheckIcon />
    </StyledItemIndicator>
  ) : (
    <svg aria-hidden="true" />
  )
})
