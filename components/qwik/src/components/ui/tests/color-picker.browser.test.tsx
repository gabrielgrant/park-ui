import { userEvent } from '@vitest/browser/context'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest } from './color-picker.fixtures'

it('opens via the trigger and picking a swatch changes the value', async () => {
  const screen = await render(<ComponentUnderTest />)
  const root = screen.container as HTMLElement

  await screen.getByTestId('trigger').click()
  await expect
    .poll(() => root.querySelector('[data-testid="content"]')?.hasAttribute('hidden'))
    .toBe(false)

  ;(root.querySelector('[data-testid="swatch-blue"]') as HTMLElement).click()

  await expect.element(screen.getByTestId('hex-input')).toHaveValue('#0000FF')
})

it('typing into the hex channel input updates the value text', async () => {
  const screen = await render(<ComponentUnderTest />)
  const input = screen.getByTestId('hex-input').element() as HTMLInputElement

  input.focus()
  await userEvent.keyboard('{Control>}a{/Control}#00ff00{Enter}')

  await expect.element(screen.getByTestId('value-text')).toHaveTextContent('rgba(0, 255, 0, 1)')
})
