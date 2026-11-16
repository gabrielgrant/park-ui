import { createListCollection } from '@ark-ui/qwik/select'
import { Stack } from 'styled-system/jsx'
import { Select } from '@/components/ui'

export const App = () => {
  const sizes = ['sm', 'md', 'lg'] as const
  return (
    <Stack gap="4">
      {sizes.map((size) => (
        <Select.Root key={size} size={size} collection={frameworks}>
          <Select.HiddenSelect />
          <Select.Label>Label</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select framework" />
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Trigger>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              {frameworks.items.map((framework) => (
                <Select.Item key={framework.value} item={framework}>
                  {framework.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
      ))}
    </Stack>
  )
}

const frameworks = createListCollection({
  items: [
    { label: 'React.js', value: 'react' },
    { label: 'Vue.js', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
  ],
})
