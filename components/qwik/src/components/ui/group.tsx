import { ark } from '@ark-ui/qwik/factory'
import { styled } from 'styled-system/jsx'
import { group } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

export type GroupProps = ComponentProps<typeof Group>
export const Group = styled(ark.div, group)
