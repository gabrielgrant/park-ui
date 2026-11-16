import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest } from './accordion.fixtures'

it('expands an item on trigger click and collapses the previous one', async () => {
  const screen = await render(<ComponentUnderTest />)
  const root = screen.container as HTMLElement
  const expanded = (item: string) =>
    root.querySelector(`[data-testid="trigger-${item}"]`)?.getAttribute('aria-expanded')
  const hidden = (item: string) =>
    root.querySelector(`[data-testid="content-${item}"]`)?.hasAttribute('hidden')

  expect(expanded('React')).toBe('false')
  expect(hidden('React')).toBe(true)

  await screen.getByTestId('trigger-React').click()
  await expect.poll(() => expanded('React')).toBe('true')
  await expect.poll(() => hidden('React')).toBe(false)
  await expect.element(screen.getByTestId('trigger-React')).toHaveClass('accordion__itemTrigger')

  await screen.getByTestId('trigger-Solid').click()
  await expect.poll(() => expanded('Solid')).toBe('true')
  await expect.poll(() => expanded('React')).toBe('false')
  await expect.poll(() => hidden('React'), { timeout: 3000 }).toBe(true)
})
