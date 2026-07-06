import { $, component$, useSignal } from '@qwik.dev/core'
import { Checkbox } from '@/components/ui'

export default component$(() => {
  const size = useSignal<'sm' | 'md' | 'lg'>('md')
  const changes = useSignal(0)
  return (
    <main style="padding: 2rem">
      <Checkbox.Root size={size.value} data-testid="root" onCheckedChange$={$(() => changes.value++)}>
        <Checkbox.Label data-testid="label">Accept terms</Checkbox.Label>
        <Checkbox.Control data-testid="control">
          <Checkbox.Indicator data-testid="indicator" />
        </Checkbox.Control>
        <Checkbox.HiddenInput data-testid="input" />
      </Checkbox.Root>

      <output data-testid="changes">{changes.value}</output>

      <button data-testid="grow" onClick$={() => (size.value = 'lg')}>
        grow
      </button>
    </main>
  )
})
