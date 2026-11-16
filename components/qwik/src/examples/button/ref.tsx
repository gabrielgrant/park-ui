import { component$, useSignal } from '@qwik.dev/core'
import { Button } from '@/components/ui'

export const App = component$(() => {
  const ref = useSignal<HTMLButtonElement>()
  return <Button ref={ref}>Click me</Button>
})
