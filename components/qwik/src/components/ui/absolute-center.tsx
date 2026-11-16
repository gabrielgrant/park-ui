import { ark } from '@ark-ui/qwik/factory'
import { styled } from 'styled-system/jsx'
import { absoluteCenter } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

export type AbsoluteCenterProps = ComponentProps<typeof AbsoluteCenter>
export const AbsoluteCenter = styled(ark.div, absoluteCenter)
