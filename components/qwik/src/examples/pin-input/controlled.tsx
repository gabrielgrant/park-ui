import { component$, useSignal } from '@qwik.dev/core'
import { PinInput } from '@/components/ui'

export const App = component$(() => {
  const value = useSignal(['', '', '', ''])
  return (
    <PinInput.Root
      value={value.value}
      onValueChange$={(e) => {
        value.value = e.value
      }}
    >
      <PinInput.HiddenInput />
      <PinInput.Control>
        <PinInput.Input index={0} />
        <PinInput.Input index={1} />
        <PinInput.Input index={2} />
        <PinInput.Input index={3} />
      </PinInput.Control>
    </PinInput.Root>
  )
})
