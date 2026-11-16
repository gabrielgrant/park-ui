import * as NumberInput from '../number-input'

export const ComponentUnderTest = (props: NumberInput.RootProps) => (
  <NumberInput.Root defaultValue="42" {...props}>
    <NumberInput.Label>Quantity</NumberInput.Label>
    <NumberInput.Control />
    <NumberInput.Input />
  </NumberInput.Root>
)
