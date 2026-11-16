import { $, component$, useSignal } from '@qwik.dev/core'
import * as Menu from '../menu'

export const ComponentUnderTest = (props: Menu.RootProps) => (
  <Menu.Root {...props}>
    <Menu.Trigger data-testid="trigger">
      File
      <Menu.Indicator data-testid="indicator" />
    </Menu.Trigger>
    <Menu.Positioner data-testid="positioner">
      <Menu.Content data-testid="content">
        <Menu.ItemGroup data-testid="item-group">
          <Menu.ItemGroupLabel data-testid="item-group-label">File</Menu.ItemGroupLabel>
          <Menu.Item value="new-file" data-testid="item-new-file">
            New File
          </Menu.Item>
          <Menu.Item value="open" data-testid="item-open">
            Open
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.Separator data-testid="separator" />
        <Menu.Item value="save" data-testid="item-save">
          Save
        </Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)

export const CheckboxMenu = component$(() => {
  const checked = useSignal<string[]>(['notifications'])
  const items = [
    { title: 'Enable Notifications', value: 'notifications' },
    { title: 'Dark Mode', value: 'dark-mode' },
  ]

  return (
    <Menu.Root
      defaultOpen
      closeOnSelect={false}
      onSelect$={$((details: Menu.SelectionDetails) => {
        checked.value = checked.value.includes(details.value)
          ? checked.value.filter((value) => value !== details.value)
          : [...checked.value, details.value]
      })}
    >
      <Menu.Trigger data-testid="trigger">Settings</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content data-testid="content">
          {items.map(({ title, value }) => (
            <Menu.CheckboxItem
              key={value}
              value={value}
              checked={checked.value.includes(value)}
              data-testid={`item-${value}`}
            >
              {title}
              <Menu.ItemIndicator data-testid={`indicator-${value}`} />
            </Menu.CheckboxItem>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
})

// unmountOnExit is switched off: unmounting the content on close throws a Qwik
// `insertBefore` NotFoundError in @ark-ui/qwik (reproduces with a raw Menu).
export const SelectionLog = component$(() => {
  const selected = useSignal('')

  return (
    <div>
      <span data-testid="selected">{selected.value}</span>
      <Menu.Root
        unmountOnExit={false}
        onSelect$={$((details: Menu.SelectionDetails) => {
          selected.value = details.value
        })}
      >
        <Menu.Trigger data-testid="trigger">
          File
          <Menu.Indicator />
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content data-testid="content">
            <Menu.Item value="new-file" data-testid="item-new-file">
              New File
            </Menu.Item>
            <Menu.Item value="open" data-testid="item-open">
              Open
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </div>
  )
})
