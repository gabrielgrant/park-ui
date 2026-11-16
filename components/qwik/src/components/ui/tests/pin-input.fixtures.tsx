import { $, component$, useSignal } from '@qwik.dev/core'
import * as PinInput from '../pin-input'

export const ComponentUnderTest = (props: PinInput.RootProps) => (
  <PinInput.Root {...props}>
    <PinInput.Label>Pin</PinInput.Label>
    <PinInput.HiddenInput />
    <PinInput.Control>
      <PinInput.Input index={0} />
      <PinInput.Input index={1} />
      <PinInput.Input index={2} />
      <PinInput.Input index={3} />
    </PinInput.Control>
  </PinInput.Root>
)

export const CompletePinInput = component$(() => {
  const completed = useSignal('')
  return (
    <>
      <PinInput.Root
        onValueComplete$={$((details) => {
          completed.value = details.valueAsString
        })}
      >
        <PinInput.Label>Pin</PinInput.Label>
        <PinInput.HiddenInput />
        <PinInput.Control>
          <PinInput.Input index={0} />
          <PinInput.Input index={1} />
          <PinInput.Input index={2} />
          <PinInput.Input index={3} />
        </PinInput.Control>
      </PinInput.Root>
      <output data-testid="completed">{completed.value}</output>
    </>
  )
})
