import { $, component$, useSignal } from '@qwik.dev/core'
import { button } from 'styled-system/recipes'
import { Tooltip } from '@/components/ui'

export const App = component$(() => {
  const open = useSignal(false)
  return (
    <Tooltip
      content="This is the tooltip content"
      open={open.value}
      onOpenChange$={$((e) => {
        open.value = e.open
      })}
      triggerProps={{ class: button({ variant: 'outline', size: 'sm' }) }}
    >
      {open.value ? 'Hide' : 'Show'} Tooltip
    </Tooltip>
  )
})
