import { styled } from 'styled-system/jsx'
import { type HeadingVariantProps, heading } from 'styled-system/recipes'
import type { ComponentProps, StyledComponent } from 'styled-system/types'

type Props = HeadingVariantProps & { as?: any }

export type HeadingProps = ComponentProps<typeof Heading>
export const Heading = styled('h2', heading) as StyledComponent<'h2', Props>
