import { $, component$, useSignal } from '@qwik.dev/core'
import { RatingGroup } from '@/components/ui'

export const App = component$(() => {
  const value = useSignal(3)
  return (
    <RatingGroup.Root
      count={5}
      value={value.value}
      onValueChange$={$((e) => {
        value.value = e.value
      })}
    >
      <RatingGroup.HiddenInput />
      <RatingGroup.Control />
    </RatingGroup.Root>
  )
})
