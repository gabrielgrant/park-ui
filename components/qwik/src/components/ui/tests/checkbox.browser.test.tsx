import { component$, useSignal } from '@qwik.dev/core'
import { expect, it } from 'vitest'
import { render, renderSSR } from 'vitest-browser-qwik'
import * as Checkbox from '../checkbox'
import { ComponentUnderTest } from './checkbox.fixtures'

// PC2 in its strongest form: server-rendered HTML, resumed in the browser,
// then interacted with. SKIPPED for the same harness wake-replay issue as
// ark-resume.browser.test.tsx (ark PLAN.md Part 5 #1); it passes but leaves
// an unhandled Q24 that fails the run. Resume is guarded by ssr-resume.test.tsx.
it.skip('toggles after SSR + resume', async () => {
  const screen = await renderSSR(<ComponentUnderTest />)
  const checkbox = screen.getByRole('checkbox')
  const control = screen.getByTestId('control')

  await expect.element(control).toHaveClass('checkbox__control')
  await expect.element(checkbox).not.toBeChecked()

  await screen.getByText('Checkbox').click()

  await expect.element(checkbox).toBeChecked()
  await expect.element(control, { timeout: 2000 }).toHaveAttribute('data-state', 'checked')
  await expect.element(control).toHaveClass('checkbox__control')
})

// PC2: trusted events reach the machine through the styled wrappers
it('toggles checked when the label is clicked', async () => {
  const screen = await render(<ComponentUnderTest />)
  const checkbox = screen.getByRole('checkbox')

  await expect.element(checkbox).not.toBeChecked()
  await screen.getByText('Checkbox').click()
  await expect.element(checkbox).toBeChecked()
  await screen.getByText('Checkbox').click()
  await expect.element(checkbox).not.toBeChecked()
})

it('keeps recipe classes while data-state flips', async () => {
  const screen = await render(<ComponentUnderTest />)
  const control = screen.getByTestId('control')

  await expect.element(control).toHaveAttribute('data-state', 'unchecked')
  await expect.element(control).toHaveClass('checkbox__control')

  await screen.getByText('Checkbox').click()

  await expect.element(control).toHaveAttribute('data-state', 'checked')
  await expect.element(control).toHaveClass('checkbox__control')
})

// PC4: variant-prop changes recompute slot classes client-side
const VariantToggle = component$(() => {
  const large = useSignal(false)
  return (
    <>
      <button
        type="button"
        onClick$={() => {
          large.value = !large.value
        }}
      >
        toggle size
      </button>
      <Checkbox.Root size={large.value ? 'lg' : 'sm'}>
        <Checkbox.HiddenInput />
        <Checkbox.Control data-testid="control">
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Label>Sized</Checkbox.Label>
      </Checkbox.Root>
    </>
  )
})

it('recomputes slot classes when a variant prop changes client-side', async () => {
  const screen = await render(<VariantToggle />)
  const root = screen.getByText('Sized').element().closest('[data-part="root"]')

  expect(root?.getAttribute('class')).toContain('checkbox__root--size_sm')

  await screen.getByText('toggle size').click()

  await expect.poll(() => root?.getAttribute('class')).toContain('checkbox__root--size_lg')
})
