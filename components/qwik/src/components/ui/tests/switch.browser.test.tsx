import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest, WithIndicators } from './switch.fixtures'

it('toggles when the label is clicked', async () => {
  const screen = await render(<ComponentUnderTest />)
  const input = screen.getByRole('checkbox')
  const control = screen.getByTestId('control')

  await expect.element(input).not.toBeChecked()
  await screen.getByText('Switch').click()
  await expect.element(input).toBeChecked()
  await expect.element(control).toHaveAttribute('data-state', 'checked')
  await expect.element(control).toHaveClass('switch__control')
  await screen.getByText('Switch').click()
  await expect.element(input).not.toBeChecked()
})

it('swaps indicator content as the switch toggles', async () => {
  const screen = await render(<WithIndicators />)
  const indicator = screen.getByTestId('indicator')

  await expect.element(screen.getByTestId('x-icon')).toBeVisible()
  await expect.element(screen.getByTestId('check-icon')).not.toBeVisible()

  await screen.getByText('Indicators').click()

  await expect.element(indicator).toHaveAttribute('data-checked', '')
  await expect.element(screen.getByTestId('check-icon')).toBeVisible()
  await expect.element(screen.getByTestId('x-icon')).not.toBeVisible()
  await expect.element(screen.getByTestId('thumb-indicator')).toHaveAttribute('data-checked', '')
})
