import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest } from './toggle-group.fixtures'

it('moves the pressed item in single mode', async () => {
  const screen = await render(<ComponentUnderTest />)
  const bold = screen.getByRole('radio', { name: 'Toggle Bold' })
  const italic = screen.getByRole('radio', { name: 'Toggle Italic' })

  await expect.element(bold).toHaveAttribute('data-state', 'on')

  await italic.click()

  await expect.element(italic).toHaveAttribute('data-state', 'on')
  await expect.element(bold).toHaveAttribute('data-state', 'off')
  await expect.element(italic).toHaveClass('toggle-group__item')
})

it('toggles items independently in multiple mode', async () => {
  const screen = await render(<ComponentUnderTest multiple />)
  const bold = screen.getByRole('button', { name: 'Toggle Bold' })
  const underline = screen.getByRole('button', { name: 'Toggle Underline' })

  await underline.click()

  await expect.element(underline).toHaveAttribute('data-state', 'on')
  await expect.element(bold).toHaveAttribute('data-state', 'on')

  await bold.click()

  await expect.element(bold).toHaveAttribute('data-state', 'off')
})
