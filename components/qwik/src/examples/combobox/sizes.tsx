import { createListCollection } from '@ark-ui/qwik/combobox'
import { $, component$, useSignal } from '@qwik.dev/core'
import { Stack } from 'styled-system/jsx'
import { Combobox } from '@/components/ui'

export const App = component$(() => {
  const items = useSignal(frameworks)
  const collection = createListCollection({ items: items.value })

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

  return (
    <Stack gap="4">
      {sizes.map((size) => (
        <Combobox.Root
          key={size}
          size={size}
          collection={collection}
          onInputValueChange$={$((e: Combobox.InputValueChangeDetails) => {
            const query = e.inputValue.toLowerCase()
            items.value = frameworks.filter((item) => item.label.toLowerCase().includes(query))
          })}
        >
          <Combobox.Label>Framework</Combobox.Label>
          <Combobox.Control>
            <Combobox.Input placeholder="Type to search" />
            <Combobox.IndicatorGroup>
              <Combobox.ClearTrigger />
              <Combobox.Trigger />
            </Combobox.IndicatorGroup>
          </Combobox.Control>
          <Combobox.Positioner>
            <Combobox.Content>
              <Combobox.Empty>No items found</Combobox.Empty>
              {collection.items.map((item) => (
                <Combobox.Item key={item.value} item={item}>
                  {item.label}
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </Combobox.Content>
          </Combobox.Positioner>
        </Combobox.Root>
      ))}
    </Stack>
  )
})

const frameworks = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Preact', value: 'preact' },
  { label: 'Qwik', value: 'qwik' },
  { label: 'Lit', value: 'lit' },
  { label: 'Alpine.js', value: 'alpinejs' },
  { label: 'Ember', value: 'ember' },
  { label: 'Next.js', value: 'nextjs' },
]
