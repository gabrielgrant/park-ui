import { PinInput } from '@ark-ui/qwik/pin-input'
import type { FunctionComponent } from '@qwik.dev/core'
import { createStyleContext } from 'styled-system/jsx'
import { pinInput } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

const { withProvider, withContext } = createStyleContext(pinInput)

const StyledRoot = withProvider(PinInput.Root, 'root', {
  shouldForwardProp: (prop) => prop === 'mask',
})

export type RootProps = Omit<ComponentProps<typeof StyledRoot>, 'mask'> & {
  mask?: boolean | undefined
}
export const Root = StyledRoot as FunctionComponent<RootProps>
export const Control = withContext(PinInput.Control, 'control')
export const HiddenInput = PinInput.HiddenInput
export const Input = withContext(PinInput.Input, 'input')
export const Label = withContext(PinInput.Label, 'label')
