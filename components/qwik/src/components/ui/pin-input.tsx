import { PinInput } from '@ark-ui/qwik/pin-input'
import { createStyleContext } from 'styled-system/jsx'
import { pinInput } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

const { withProvider, withContext } = createStyleContext(pinInput)

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider(PinInput.Root, 'root', {
  shouldForwardProp: (prop) => prop === 'mask',
})
export const Control = withContext(PinInput.Control, 'control')
export const HiddenInput = PinInput.HiddenInput
export const Input = withContext(PinInput.Input, 'input')
export const Label = withContext(PinInput.Label, 'label')
