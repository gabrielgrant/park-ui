import { component$, useSignal } from '@qwik.dev/core'
import { Text } from '@/components/ui'

export const App = component$(() => {
  const ref = useSignal<HTMLParagraphElement>()
  return <Text ref={ref}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
})
