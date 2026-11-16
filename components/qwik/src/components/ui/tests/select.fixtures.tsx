import { createListCollection } from '@ark-ui/qwik/select'
import * as Select from '../select'

interface Framework {
  label: string
  value: string
}

const collection = createListCollection<Framework>({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
  ],
})

export const ComponentUnderTest = (props: Omit<Select.RootProps<Framework>, 'collection'>) => (
  <Select.Root collection={collection} {...props}>
    <Select.Label data-testid="label">Framework</Select.Label>
    <Select.Control data-testid="control">
      <Select.Trigger data-testid="trigger">
        <Select.ValueText data-testid="value-text" placeholder="Select a framework" />
        <Select.IndicatorGroup data-testid="indicator-group">
          <Select.Indicator data-testid="indicator" />
        </Select.IndicatorGroup>
      </Select.Trigger>
    </Select.Control>
    <Select.Positioner data-testid="positioner">
      <Select.Content data-testid="content">
        <Select.ItemGroup data-testid="item-group">
          <Select.ItemGroupLabel data-testid="item-group-label">Frameworks</Select.ItemGroupLabel>
          {collection.items.map((item) => (
            <Select.Item key={item.value} item={item} data-testid={`item-${item.value}`}>
              <Select.ItemText data-testid={`item-text-${item.value}`}>
                {item.label}
              </Select.ItemText>
              <Select.ItemIndicator data-testid={`indicator-${item.value}`} />
            </Select.Item>
          ))}
        </Select.ItemGroup>
      </Select.Content>
    </Select.Positioner>
    <Select.HiddenSelect data-testid="hidden-select" />
  </Select.Root>
)
