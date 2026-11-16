import { component$, useSignal } from '@qwik.dev/core'
import { Textarea } from '@/components/ui'

export const App = component$(() => {
  const ref = useSignal<HTMLTextAreaElement>()
  return <Textarea ref={ref} />
})
