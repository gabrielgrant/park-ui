import { Checkbox as ArkCheckbox } from '@ark-ui/qwik/checkbox'
import { createStyleContext } from 'styled-system/jsx'
import { checkbox } from 'styled-system/recipes'

export const ArkOnly = () => (
  <ArkCheckbox.Root>
    <ArkCheckbox.HiddenInput />
    <ArkCheckbox.Control data-testid="a-control">✓</ArkCheckbox.Control>
    <ArkCheckbox.Label>ArkOnly</ArkCheckbox.Label>
  </ArkCheckbox.Root>
)

const { withProvider, withContext } = createStyleContext(checkbox)
const Root = withProvider('div', 'root')
const Label = withContext('span', 'label')

export const StyleOnly = () => (
  <Root data-testid="b-root" size="sm">
    <Label data-testid="b-label">StyleOnly</Label>
  </Root>
)
