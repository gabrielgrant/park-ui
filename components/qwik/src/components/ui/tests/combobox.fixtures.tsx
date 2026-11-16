import { createListCollection } from '@ark-ui/qwik/combobox'
import { $, component$, useSignal } from '@qwik.dev/core'
import * as Combobox from '../combobox'

interface Framework {
  label: string
  value: string
}

const frameworks: Framework[] = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
]

const collection = createListCollection<Framework>({ items: frameworks })

export const ComponentUnderTest = (props: Omit<Combobox.RootProps, 'collection'>) => (
  <Combobox.Root collection={collection} {...props}>
    <Combobox.Label data-testid="label">Framework</Combobox.Label>
    <Combobox.Control data-testid="control">
      <Combobox.Input data-testid="input" placeholder="Type to search" />
      <Combobox.IndicatorGroup data-testid="indicator-group">
        <Combobox.ClearTrigger data-testid="clear-trigger" />
        <Combobox.Trigger data-testid="trigger" />
      </Combobox.IndicatorGroup>
    </Combobox.Control>
    <Combobox.Positioner data-testid="positioner">
      <Combobox.Content data-testid="content">
        <Combobox.Empty data-testid="empty">No items found</Combobox.Empty>
        <Combobox.ItemGroup data-testid="item-group">
          <Combobox.ItemGroupLabel data-testid="item-group-label">Frameworks</Combobox.ItemGroupLabel>
          {collection.items.map((item) => (
            <Combobox.Item key={item.value} item={item} data-testid={`item-${item.value}`}>
              <Combobox.ItemText data-testid={`item-text-${item.value}`}>{item.label}</Combobox.ItemText>
              <Combobox.ItemIndicator data-testid={`indicator-${item.value}`} />
            </Combobox.Item>
          ))}
        </Combobox.ItemGroup>
      </Combobox.Content>
    </Combobox.Positioner>
  </Combobox.Root>
)

export const FilterableCombobox = component$(() => {
  const items = useSignal<Framework[]>(frameworks)
  const filtered = createListCollection<Framework>({ items: items.value })

  return (
    <Combobox.Root
      collection={filtered}
      onInputValueChange$={$((details: Combobox.InputValueChangeDetails) => {
        const query = details.inputValue.toLowerCase()
        items.value = frameworks.filter((item) => item.label.toLowerCase().includes(query))
      })}
    >
      <Combobox.Label>Framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input data-testid="input" placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger data-testid="trigger" />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content data-testid="content">
          <Combobox.Empty data-testid="empty">No items found</Combobox.Empty>
          {items.value.map((item) => (
            <Combobox.Item key={item.value} item={item} data-testid={`item-${item.value}`}>
              {item.label}
              <Combobox.ItemIndicator data-testid={`indicator-${item.value}`} />
            </Combobox.Item>
          ))}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  )
})
