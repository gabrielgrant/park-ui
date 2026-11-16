import type { Assign } from '@ark-ui/qwik'
import { ark } from '@ark-ui/qwik/factory'
import {
  type CollectionItem,
  Select,
  type SelectRootProps,
  useSelectContext,
  useSelectItemContext,
} from '@ark-ui/qwik/select'
import { type PropsOf, Slot, component$ } from '@qwik.dev/core'
import { createStyleContext } from 'styled-system/jsx'
import { type SelectVariantProps, select } from 'styled-system/recipes'
import type { HTMLStyledProps } from 'styled-system/types'
import { CheckIcon, ChevronsUpDownIcon } from './icons'

const { withProvider, withContext } = createStyleContext(select)

type StyleProps = SelectVariantProps & HTMLStyledProps<'div'>

export type RootProps<T extends CollectionItem> = Assign<SelectRootProps<T>, StyleProps>

export const Root = withProvider(Select.Root, 'root') as Select.RootComponent<StyleProps>

export const ClearTrigger = withContext(Select.ClearTrigger, 'clearTrigger')
export const Content = withContext(Select.Content, 'content')
export const Control = withContext(Select.Control, 'control')
export const IndicatorGroup = withContext(ark.span, 'indicatorGroup')
export const Item = withContext(Select.Item, 'item')
export const ItemGroup = withContext(Select.ItemGroup, 'itemGroup')
export const ItemGroupLabel = withContext(Select.ItemGroupLabel, 'itemGroupLabel')
export const ItemText = withContext(Select.ItemText, 'itemText')
export const Label = withContext(Select.Label, 'label')
export const List = withContext(Select.List, 'list')
export const Positioner = withContext(Select.Positioner, 'positioner')
export const Trigger = withContext(Select.Trigger, 'trigger')
export const ValueText = withContext(Select.ValueText, 'valueText')

const IndicatorSpan = component$<PropsOf<'span'>>((props) => {
  const api = useSelectContext()
  const indicatorProps = { ...(api?.getIndicatorProps() as PropsOf<'span'> | undefined), ...props }

  return (
    <span {...indicatorProps}>
      <Slot />
    </span>
  )
})

export const Indicator = withContext(IndicatorSpan, 'indicator', {
  defaultProps: { children: <ChevronsUpDownIcon /> },
})
export const HiddenSelect = Select.HiddenSelect

export type { SelectValueChangeDetails as ValueChangeDetails } from '@ark-ui/qwik/select'

const StyledItemIndicator = withContext(Select.ItemIndicator, 'itemIndicator')

export const ItemIndicator = component$<HTMLStyledProps<'div'>>((props) => {
  const item = useSelectItemContext()

  return item?.selected ? (
    <StyledItemIndicator {...props}>
      <CheckIcon />
    </StyledItemIndicator>
  ) : (
    <svg aria-hidden="true" />
  )
})
