import { $, component$, useSignal } from '@qwik.dev/core'
import { Switch } from '@/components/ui'

export const App = component$(() => {
  const checked = useSignal(false)
  return (
    <Switch.Root
      checked={checked.value}
      onCheckedChange$={$((e) => {
        checked.value = e.checked
      })}
    >
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Label</Switch.Label>
      <Switch.HiddenInput />
    </Switch.Root>
  )
})
