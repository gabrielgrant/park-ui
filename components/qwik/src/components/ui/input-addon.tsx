import { ark } from '@ark-ui/qwik/factory'
import { styled } from 'styled-system/jsx'
import { inputAddon } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

export type InputAddonProps = ComponentProps<typeof InputAddon>
export const InputAddon = styled(ark.div, inputAddon)
