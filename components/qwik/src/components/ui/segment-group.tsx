import { SegmentGroup } from '@ark-ui/qwik/segment-group'
import type { JSXOutput } from '@qwik.dev/core'
import { createStyleContext } from 'styled-system/jsx'
import { segmentGroup } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

const { withProvider, withContext } = createStyleContext(segmentGroup)

export type RootProps = ComponentProps<typeof Root>

export const Root = withProvider(SegmentGroup.Root, 'root', {
  defaultProps: { orientation: 'horizontal' },
  forwardProps: ['orientation'],
})
export const Indicator = withContext(SegmentGroup.Indicator, 'indicator')
export const Item = withContext(SegmentGroup.Item, 'item')
export const ItemControl = withContext(SegmentGroup.ItemControl, 'itemControl')
export const ItemHiddenInput = SegmentGroup.ItemHiddenInput
export const ItemText = withContext(SegmentGroup.ItemText, 'itemText')
export const Label = withContext(SegmentGroup.Label, 'label')

interface Item {
  value: string
  label: JSXOutput
  disabled?: boolean | undefined
}

type ItemProps = ComponentProps<typeof Item>

export interface ItemsProps extends Omit<ItemProps, 'value'> {
  items: Array<string | Item>
}

export const Items = (props: ItemsProps) => {
  const { items, ...itemProps } = props

  return (
    <>
      {normalize(items).map((item) => (
        <Item key={item.value} value={item.value} disabled={item.disabled} {...itemProps}>
          <ItemText>{item.label}</ItemText>
          <ItemHiddenInput />
        </Item>
      ))}
    </>
  )
}

const normalize = (items: Array<string | Item>): Item[] =>
  items.map((item) => (typeof item === 'string' ? { value: item, label: item } : item))
