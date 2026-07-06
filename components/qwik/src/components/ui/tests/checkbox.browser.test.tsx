import { $ } from '@qwik.dev/core'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest } from './basic'

/**
 * Interaction tests in real Chromium (vitest-browser-qwik wires Qwik's client
 * event system, so the Zag machine starts and processes events). SSR + resume
 * interaction is covered by e2e/checkbox.e2e.mjs against the dev server.
 */
it('toggles checked when the label is clicked', async () => {
  const screen = await render(<ComponentUnderTest data-testid="root" />)
  const checkbox = screen.getByRole('checkbox')

  await expect.element(checkbox).not.toBeChecked()
  await screen.getByText('Checkbox').click()
  await expect.element(checkbox).toBeChecked()
})

it('applies data-state styling on the styled control', async () => {
  const screen = await render(<ComponentUnderTest data-testid="root" />)
  const control = screen.getByTestId('control')

  await expect.element(control).toHaveClass('checkbox__control')
  await expect.element(control).toHaveAttribute('data-state', 'unchecked')
  await screen.getByText('Checkbox').click()
  await expect.element(control).toHaveAttribute('data-state', 'checked')
})

it('invokes onCheckedChange$ through the styled Root', async () => {
  const calls: Array<{ checked: boolean | 'indeterminate' }> = []
  const screen = await render(
    <ComponentUnderTest
      data-testid="root"
      onCheckedChange$={$((details: { checked: boolean | 'indeterminate' }) => {
        calls.push(details)
      })}
    />,
  )

  await screen.getByText('Checkbox').click()
  await expect.poll(() => calls.length).toBe(1)
  expect(calls[0]).toEqual({ checked: true })
})
