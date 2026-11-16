import { ark } from '@ark-ui/qwik/factory'
import { createStyleContext } from 'styled-system/jsx'
import { breadcrumb } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'
import { ChevronRightIcon } from './icons'

const { withProvider, withContext } = createStyleContext(breadcrumb)

export type RootProps = ComponentProps<typeof Root>

export const Root = withProvider(ark.nav, 'root', {
  defaultProps: { 'aria-label': 'breadcrumb' },
})
export const List = withContext(ark.ol, 'list')
export const Item = withContext(ark.li, 'item')
export const Link = withContext(ark.a, 'link')
export const Ellipsis = withContext(ark.li, 'ellipsis', {
  defaultProps: {
    role: 'presentation',
    'aria-hidden': true,
    children: '...',
  },
})

type SeparatorProps = ComponentProps<typeof StyledSeparator>
const StyledSeparator = withContext(ark.li, 'separator', {
  defaultProps: { 'aria-hidden': true },
})

export const Separator = (props: SeparatorProps) => {
  const { children, ...rest } = props
  return <StyledSeparator {...rest}>{children ?? <ChevronRightIcon />}</StyledSeparator>
}
