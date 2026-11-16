import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest } from './number-input.fixtures'

it('increments and decrements through the default triggers', async () => {
  const screen = await render(<ComponentUnderTest />)
  const input = screen.getByRole('spinbutton')

  await expect.element(input).toHaveValue('42')
  await screen.getByRole('button', { name: 'increment value' }).click()
  await expect.element(input).toHaveValue('43')
  await screen.getByRole('button', { name: 'decrease value' }).click()
  await screen.getByRole('button', { name: 'decrease value' }).click()
  await expect.element(input).toHaveValue('41')
})
