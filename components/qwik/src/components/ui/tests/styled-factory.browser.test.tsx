import { component$, useSignal } from '@qwik.dev/core'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { styled } from 'styled-system/jsx'

// The generated qwik `styled` factory is an inline-component wrapper — the
// shape ark's PLAN.md R1 found to drop trusted events when it re-spreads
// props onto an inner element. This is the direct browser check (PC2 for the
// factory itself, independent of createStyleContext).
const Counter = component$(() => {
  const count = useSignal(0)
  return (
    <styled.button bg="gray.3" px="4" py="2" onClick$={() => count.value++}>
      count: {count.value}
    </styled.button>
  )
})

it('delivers trusted click events through styled.<tag>', async () => {
  const screen = await render(<Counter />)

  await expect.element(screen.getByRole('button')).toHaveTextContent('count: 0')
  await screen.getByRole('button').click()
  await expect.element(screen.getByRole('button')).toHaveTextContent('count: 1')
  await screen.getByRole('button').click()
  await expect.element(screen.getByRole('button')).toHaveTextContent('count: 2')
})

const WrappedCounter = component$(() => {
  const count = useSignal(0)
  return (
    <styled.div data-testid="hit-area" p="4" onClick$={() => count.value++}>
      hits: {count.value}
    </styled.div>
  )
})

it('delivers trusted click events on a styled non-interactive element', async () => {
  const screen = await render(<WrappedCounter />)

  await screen.getByTestId('hit-area').click()
  await expect.element(screen.getByTestId('hit-area')).toHaveTextContent('hits: 1')
})
