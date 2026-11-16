import { ark } from '@ark-ui/qwik/factory'
import { Combobox, useComboboxContext, useComboboxItemContext } from '@ark-ui/qwik/combobox'
import { type PropsOf, Slot, component$ } from '@qwik.dev/core'
import { createStyleContext } from 'styled-system/jsx'
import { type ComboboxVariantProps, combobox } from 'styled-system/recipes'
import type { HTMLStyledProps } from 'styled-system/types'
import { CheckIcon, ChevronsUpDownIcon, XIcon } from './icons'

const { withProvider, withContext } = createStyleContext(combobox)

export type RootProps = HTMLStyledProps<'div'> & ComboboxVariantProps

export const Root = withProvider(Combobox.Root, 'root', {
  defaultProps: { positioning: { sameWidth: false } },
}) as Combobox.RootComponent<RootProps>

export const ClearTrigger = withContext(Combobox.ClearTrigger, 'clearTrigger', {
  defaultProps: { children: <XIcon /> },
})
export const Content = withContext(Combobox.Content, 'content')
export const Control = withContext(Combobox.Control, 'control')
export const IndicatorGroup = withContext(ark.div, 'indicatorGroup')
export const Input = withContext(Combobox.Input, 'input')
export const Item = withContext(Combobox.Item, 'item')
export const ItemGroup = withContext(Combobox.ItemGroup, 'itemGroup')
export const ItemGroupLabel = withContext(Combobox.ItemGroupLabel, 'itemGroupLabel')
export const ItemText = withContext(Combobox.ItemText, 'itemText')
export const Label = withContext(Combobox.Label, 'label')
export const List = withContext(Combobox.List, 'list')
export const Positioner = withContext(Combobox.Positioner, 'positioner')
export const Trigger = withContext(Combobox.Trigger, 'trigger', {
  defaultProps: { children: <ChevronsUpDownIcon /> },
})

export type {
  ComboboxInputValueChangeDetails as InputValueChangeDetails,
  ComboboxValueChangeDetails as ValueChangeDetails,
} from '@ark-ui/qwik/combobox'

const EmptyBase = component$<PropsOf<'div'>>((props) => {
  const size = useComboboxContext()?.collection?.size
  const emptyProps = {
    'data-scope': 'combobox',
    'data-part': 'empty',
    role: 'presentation',
    hidden: size === undefined || size > 0,
    ...props,
  }

  return (
    <div {...emptyProps}>
      <Slot />
    </div>
  )
})

export const Empty = withContext(EmptyBase, 'empty')

const StyledItemIndicator = withContext(Combobox.ItemIndicator, 'itemIndicator')

export const ItemIndicator = component$<HTMLStyledProps<'div'>>((props) => {
  const item = useComboboxItemContext()

  return item?.selected ? (
    <StyledItemIndicator {...props}>
      <CheckIcon />
    </StyledItemIndicator>
  ) : (
    <svg aria-hidden="true" />
  )
})
