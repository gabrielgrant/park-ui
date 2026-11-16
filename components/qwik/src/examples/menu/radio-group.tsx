import { $, component$, useSignal } from '@qwik.dev/core'
import { button } from 'styled-system/recipes'
import { Menu } from '@/components/ui'

export const App = component$(() => {
  const items = [
    { label: 'Name (A-Z)', value: 'name' },
    { label: 'Date Created', value: 'date' },
    { label: 'Size', value: 'size' },
  ]

  const value = useSignal('name')

  return (
    <Menu.Root
      onSelect$={$((details: Menu.SelectionDetails) => {
        value.value = details.value
      })}
    >
      <Menu.Trigger class={button({ variant: 'surface' })}>
        Sort By
        <Menu.Indicator />
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.RadioItemGroup value={value.value}>
            {items.map((item) => (
              <Menu.RadioItem key={item.value} value={item.value}>
                {item.label}
                <Menu.ItemIndicator />
              </Menu.RadioItem>
            ))}
          </Menu.RadioItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
})
