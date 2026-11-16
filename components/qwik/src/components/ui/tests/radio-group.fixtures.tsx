import * as RadioGroup from '../radio-group'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]

export const ComponentUnderTest = (props: RadioGroup.RootProps) => (
  <RadioGroup.Root defaultValue="react" {...props}>
    <RadioGroup.Label>Framework</RadioGroup.Label>
    <RadioGroup.Indicator />
    {items.map((item) => (
      <RadioGroup.Item key={item.value} value={item.value} data-testid={`item-${item.value}`}>
        <RadioGroup.ItemHiddenInput />
        <RadioGroup.ItemControl />
        <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
      </RadioGroup.Item>
    ))}
  </RadioGroup.Root>
)
