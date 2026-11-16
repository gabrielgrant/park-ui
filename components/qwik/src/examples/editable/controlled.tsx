import { component$, useSignal } from '@qwik.dev/core'
import { Editable } from '@/components/ui'

export const App = component$(() => {
  const name = useSignal('')
  return (
    <Editable.Root
      value={name.value}
      onValueChange$={(e) => {
        name.value = e.value
      }}
      placeholder="Click to edit"
    >
      <Editable.Preview />
      <Editable.Input />
    </Editable.Root>
  )
})
