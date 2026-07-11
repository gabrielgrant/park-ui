import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ClickCounter, GroupedButtons } from './button-fixtures'

// user QRL handlers travel: Button component$ prop -> styled inline wrapper
// -> host <button> element
it('delivers user onClick$ through the Button chain', async () => {
  const screen = await render(<ClickCounter />)

  await expect.element(screen.getByRole('button')).toHaveTextContent('clicks: 0')
  await screen.getByRole('button').click()
  await expect.element(screen.getByRole('button')).toHaveTextContent('clicks: 1')
})

it('applies group variant context in the browser', async () => {
  const screen = await render(<GroupedButtons />)

  await expect.element(screen.getByTestId('grouped')).toHaveClass('button--variant_outline')
  await expect.element(screen.getByTestId('grouped')).toHaveClass('button--size_lg')
})
