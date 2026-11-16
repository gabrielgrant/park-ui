import { RatingGroup, useRatingGroupContext, useRatingGroupItemContext } from '@ark-ui/qwik/rating-group'
import { type JSXNode, type JSXOutput, component$, jsx } from '@qwik.dev/core'
import { createStyleContext } from 'styled-system/jsx'
import { ratingGroup } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { StarIcon } from './icons'

const { withProvider, withContext } = createStyleContext(ratingGroup)

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider(RatingGroup.Root, 'root')
export const Item = withContext(RatingGroup.Item, 'item')
export const Label = withContext(RatingGroup.Label, 'label')

export const HiddenInput = RatingGroup.HiddenInput

export type {
  RatingGroupHoverChangeDetails as HoverChangeDetails,
  RatingGroupValueChangeDetails as ValueChangeDetails,
} from '@ark-ui/qwik/rating-group'

export interface ItemIndicatorProps extends HTMLStyledProps<'span'> {
  icon?: JSXOutput | undefined
}

const StyledItemIndicator = withContext('span', 'itemIndicator')

const isJSXNode = (value: unknown): value is JSXNode =>
  typeof value === 'object' && value !== null && 'type' in value && 'props' in value

const cloneIcon = (icon: JSXOutput, type: string) => {
  if (!icon) return null
  const props = { [`data-${type}`]: '', 'aria-hidden': true, fill: 'currentColor' }
  if (isJSXNode(icon)) {
    return jsx(icon.type as string, { ...icon.props, children: icon.children, ...props })
  }
  return icon
}

export const ItemIndicator = component$<ItemIndicatorProps>((props) => {
  const { icon, ...rest } = props
  const item = useRatingGroupItemContext()
  const iconNode = icon ?? <StarIcon />
  const stateProps = {
    'data-highlighted': item?.highlighted ? '' : undefined,
    'data-checked': item?.checked ? '' : undefined,
    'data-half': item?.half ? '' : undefined,
  }

  return (
    <StyledItemIndicator {...rest} {...stateProps}>
      {cloneIcon(iconNode, 'bg')}
      {cloneIcon(iconNode, 'fg')}
    </StyledItemIndicator>
  )
})

export interface ItemsProps extends Omit<ComponentProps<typeof Item>, 'index'> {
  icon?: JSXOutput | undefined
}

export const Items = component$<ItemsProps>((props) => {
  const { icon, ...rest } = props
  const api = useRatingGroupContext()

  return (
    <>
      {(api?.items ?? []).map((index) => (
        <Item key={index} index={index} {...rest}>
          <ItemIndicator icon={icon} />
        </Item>
      ))}
    </>
  )
})

const StyledControl = withContext(RatingGroup.Control, 'control')
export type ControlProps = ComponentProps<typeof StyledControl>
export const Control = (props: ControlProps) => {
  const { children, ...rest } = props
  return <StyledControl {...rest}>{children ?? <Items />}</StyledControl>
}
