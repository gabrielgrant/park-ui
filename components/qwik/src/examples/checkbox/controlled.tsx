import { component$, useSignal } from '@qwik.dev/core'
import { Checkbox } from '@/components/ui'

export const App = component$(() => {
  const checked = useSignal<Checkbox.CheckedState>(false)

  return (
    <Checkbox.Root
      checked={checked.value}
      onCheckedChange$={(e) => {
        checked.value = e.checked
      }}
    >
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Label>Label</Checkbox.Label>
    </Checkbox.Root>
  )
})
