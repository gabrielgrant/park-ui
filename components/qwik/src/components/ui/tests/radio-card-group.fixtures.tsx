import * as RadioCardGroup from '../radio-card-group'

const items = [
  { value: 'react', title: 'React' },
  { value: 'solid', title: 'Solid' },
  { value: 'vue', title: 'Vue' },
]

export const ComponentUnderTest = (props: RadioCardGroup.RootProps) => (
  <RadioCardGroup.Root defaultValue="react" {...props}>
    <RadioCardGroup.Label>Select framework</RadioCardGroup.Label>
    {items.map((item) => (
      <RadioCardGroup.Item key={item.value} value={item.value} data-testid={`item-${item.value}`}>
        <RadioCardGroup.ItemHiddenInput />
        <RadioCardGroup.ItemText>{item.title}</RadioCardGroup.ItemText>
        <RadioCardGroup.ItemControl />
      </RadioCardGroup.Item>
    ))}
  </RadioCardGroup.Root>
)
