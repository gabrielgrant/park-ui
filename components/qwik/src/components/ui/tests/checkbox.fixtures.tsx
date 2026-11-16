import * as Checkbox from '../checkbox'

export const ComponentUnderTest = (props: Checkbox.RootProps) => (
  <Checkbox.Root {...props}>
    <Checkbox.HiddenInput />
    <Checkbox.Control data-testid="control">
      <Checkbox.Indicator />
    </Checkbox.Control>
    <Checkbox.Label data-testid="label">Checkbox</Checkbox.Label>
  </Checkbox.Root>
)
