import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest } from './collapsible.fixtures'

it('expands and collapses on trigger click', async () => {
  const screen = await render(<ComponentUnderTest />)
  const root = screen.container as HTMLElement
  const expanded = () =>
    root.querySelector('[data-testid="trigger"]')?.getAttribute('aria-expanded')
  const hidden = () => root.querySelector('[data-testid="content"]')?.hasAttribute('hidden')

  expect(expanded()).toBe('false')
  expect(hidden()).toBe(true)

  await screen.getByText('Toggle').click()
  await expect.poll(expanded).toBe('true')
  await expect.poll(hidden).toBe(false)
  await expect.element(screen.getByTestId('content')).toHaveClass('collapsible__content')

  await screen.getByText('Toggle').click()
  await expect.poll(expanded).toBe('false')
  await expect.poll(hidden, { timeout: 3000 }).toBe(true)
})
