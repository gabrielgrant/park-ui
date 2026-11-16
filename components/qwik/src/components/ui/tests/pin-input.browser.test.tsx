import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { userEvent } from 'vitest/browser'
import { CompletePinInput } from './pin-input.fixtures'

it('fills the inputs while typing and reports completion', async () => {
  const screen = await render(<CompletePinInput />)
  const inputs = screen.getByRole('textbox')

  await inputs.first().click()
  await userEvent.keyboard('1234')

  await expect.element(inputs.nth(0)).toHaveValue('1')
  await expect.element(inputs.nth(3)).toHaveValue('4')
  await expect.element(screen.getByTestId('completed')).toHaveTextContent('1234')
  await expect.element(inputs.nth(0)).toHaveClass('pin-input__input')
})
