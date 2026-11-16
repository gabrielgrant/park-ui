import { component$, useSignal } from '@qwik.dev/core'
import { Input } from '@/components/ui'

export const App = component$(() => {
  const ref = useSignal<HTMLInputElement>()
  return <Input ref={ref} />
})
