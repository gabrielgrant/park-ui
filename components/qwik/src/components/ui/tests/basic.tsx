import type { PropsOf } from '@qwik.dev/core'
import * as Checkbox from '../checkbox'

export const ComponentUnderTest = (props: PropsOf<typeof Checkbox.Root>) => (
  <Checkbox.Root {...props}>
    <Checkbox.Label data-testid="label">Checkbox</Checkbox.Label>
    <Checkbox.Control data-testid="control">
      <Checkbox.Indicator data-testid="indicator" />
    </Checkbox.Control>
    <Checkbox.HiddenInput data-testid="input" />
  </Checkbox.Root>
)
