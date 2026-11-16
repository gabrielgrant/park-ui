import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest } from './radio-card-group.fixtures'

it('selects a card when it is clicked', async () => {
  const screen = await render(<ComponentUnderTest />)

  await screen.getByText('Vue').click()

  await expect.element(screen.getByTestId('item-vue')).toHaveAttribute('data-state', 'checked')
  await expect.element(screen.getByTestId('item-react')).toHaveAttribute('data-state', 'unchecked')
  await expect.element(screen.getByRole('radio', { name: 'Vue' })).toBeChecked()
  await expect.element(screen.getByTestId('item-vue')).toHaveClass('radio-card-group__item')
})
