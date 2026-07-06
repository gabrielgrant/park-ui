import { Checkbox } from '@ark-ui/qwik/checkbox'
import { component$ } from '@qwik.dev/core'

// bare Ark checkbox, no Panda styling involved: isolates SSR-resume issues
// between the Ark/Zag layer and the Panda styling layer
export default component$(() => {
  return (
    <Checkbox.Root data-testid="root">
      <Checkbox.Label data-testid="label">Bare checkbox</Checkbox.Label>
      <Checkbox.Control data-testid="control">
        <Checkbox.Indicator>x</Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.HiddenInput data-testid="input" />
    </Checkbox.Root>
  )
})
