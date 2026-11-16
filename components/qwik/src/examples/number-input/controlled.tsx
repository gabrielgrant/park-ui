import { $, component$, useSignal } from '@qwik.dev/core'
import { NumberInput } from '@/components/ui'

export const App = component$(() => {
  const value = useSignal('10')
  return (
    <NumberInput.Root
      value={value.value}
      onValueChange$={$((e) => {
        value.value = e.value
      })}
    >
      <NumberInput.Control />
      <NumberInput.Input />
    </NumberInput.Root>
  )
})
