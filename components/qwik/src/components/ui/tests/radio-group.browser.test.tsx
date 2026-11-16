import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest } from './radio-group.fixtures'

it('selects an item when its text is clicked', async () => {
  const screen = await render(<ComponentUnderTest />)

  await expect.element(screen.getByTestId('item-react')).toHaveAttribute('data-state', 'checked')

  await screen.getByText('Solid').click()

  await expect.element(screen.getByTestId('item-solid')).toHaveAttribute('data-state', 'checked')
  await expect.element(screen.getByTestId('item-react')).toHaveAttribute('data-state', 'unchecked')
  await expect.element(screen.getByRole('radio', { name: 'Solid' })).toBeChecked()
  await expect.element(screen.getByTestId('item-solid')).toHaveClass('radio-group__item')
})
