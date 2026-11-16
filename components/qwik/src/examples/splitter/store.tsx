import { $, component$, useSignal } from '@qwik.dev/core'
import { Stack } from 'styled-system/jsx'
import { Button, Splitter } from '@/components/ui'

export const App = component$(() => {
  const size = useSignal([25, 75])
  const isCollapsed = size.value[0] <= 5

  return (
    <Stack gap="4" alignItems="start">
      <Button
        onClick$={() => {
          size.value = isCollapsed ? [25, 75] : [5, 95]
        }}
        size="xs"
        variant="surface"
      >
        {isCollapsed ? 'Expand' : 'Collapse'} Panel A
      </Button>
      <Splitter.Root
        size={size.value}
        onResize$={$((details) => {
          size.value = details.size
        })}
        panels={[
          { id: 'a', collapsible: true, collapsedSize: 5, minSize: 25, maxSize: 25 },
          { id: 'b', minSize: 50 },
        ]}
      >
        <Splitter.Panel id="a">A</Splitter.Panel>
        <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
        <Splitter.Panel id="b">B</Splitter.Panel>
      </Splitter.Root>
    </Stack>
  )
})
