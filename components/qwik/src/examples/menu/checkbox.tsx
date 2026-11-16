import { $, component$, useSignal } from '@qwik.dev/core'
import { button } from 'styled-system/recipes'
import { Menu } from '@/components/ui'

export const App = component$(() => {
  const items = [
    { title: 'Enable Notifications', value: 'notifications' },
    { title: 'Dark Mode', value: 'dark-mode' },
    { title: 'Show Tooltips', value: 'tooltips' },
  ]

  const checked = useSignal(['notifications'])

  return (
    <Menu.Root
      onSelect$={$((details: Menu.SelectionDetails) => {
        checked.value = checked.value.includes(details.value)
          ? checked.value.filter((value) => value !== details.value)
          : [...checked.value, details.value]
      })}
    >
      <Menu.Trigger class={button({ variant: 'surface' })}>
        Settings
        <Menu.Indicator />
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          {items.map(({ title, value }) => (
            <Menu.CheckboxItem key={value} value={value} checked={checked.value.includes(value)}>
              {title}
              <Menu.ItemIndicator />
            </Menu.CheckboxItem>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
})
