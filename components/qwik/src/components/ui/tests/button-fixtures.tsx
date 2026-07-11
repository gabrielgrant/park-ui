import { component$, useSignal } from '@qwik.dev/core'
import { Button, ButtonGroup } from '../button'

export const ClickCounter = component$(() => {
  const count = useSignal(0)
  return (
    <Button variant="outline" onClick$={() => count.value++}>
      clicks: {count.value}
    </Button>
  )
})

export const GroupedButtons = () => (
  <ButtonGroup variant="outline" size="lg" data-testid="group">
    <Button data-testid="grouped">Grouped</Button>
  </ButtonGroup>
)

export const LoadingButton = () => (
  <Button loading loadingText="Saving…" data-testid="loading">
    Save
  </Button>
)
