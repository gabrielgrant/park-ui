import { page, userEvent } from '@vitest/browser/context'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { FilterableCombobox } from './combobox.fixtures'

it('filters while typing and picks an item', async () => {
  const screen = await render(<FilterableCombobox />)
  const root = screen.container as HTMLElement

  await screen.getByTestId('input').click()
  await userEvent.keyboard('sol')

  await expect.poll(() => root.querySelector('[data-testid="item-solid"]')).toBeTruthy()
  await expect.poll(() => root.querySelector('[data-testid="item-react"]')).toBeFalsy()

  await page.getByTestId('item-solid').click()

  await expect.element(page.getByTestId('input')).toHaveValue('Solid')
  await expect.poll(() => root.querySelector('[data-testid="content"]')?.getAttribute('data-state')).toBe('closed')
})

it('shows the empty state when nothing matches', async () => {
  const screen = await render(<FilterableCombobox />)
  const root = screen.container as HTMLElement
  const empty = () => root.querySelector('[data-testid="empty"]')

  await screen.getByTestId('input').click()
  await userEvent.keyboard('zzz')

  await expect.poll(() => empty()?.hasAttribute('hidden')).toBe(false)
  expect(empty()?.getAttribute('class')).toContain('combobox__empty')
})
