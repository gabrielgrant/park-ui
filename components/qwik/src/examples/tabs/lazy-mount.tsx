import { component$, useSignal, useVisibleTask$ } from '@qwik.dev/core'
import { Tabs } from '@/components/ui'

export const App = () => {
  return (
    <Tabs.Root lazyMount unmountOnExit defaultValue="tab-1">
      <Tabs.List>
        <Tabs.Trigger value="tab-1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab-2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab-3">Tab 3</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="tab-1">
        Tab 1: Content <TickValue />
      </Tabs.Content>
      <Tabs.Content value="tab-2">
        Tab 2: Content <TickValue />
      </Tabs.Content>
      <Tabs.Content value="tab-3">
        Tab 3: Content <TickValue />
      </Tabs.Content>
    </Tabs.Root>
  )
}

const TickValue = component$(() => {
  const value = useSignal(0)

  // biome-ignore lint/correctness/noQwikUseVisibleTask: the ticker only runs in the browser
  useVisibleTask$(({ cleanup }) => {
    const intervalId = window.setInterval(() => {
      value.value++
    }, 1000)
    cleanup(() => window.clearInterval(intervalId))
  })

  return (
    <span style={{ 'font-weight': 'bold', color: 'tomato', padding: '4px' }}>{value.value}</span>
  )
})
