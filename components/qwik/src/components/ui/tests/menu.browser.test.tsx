import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { CheckboxMenu, SelectionLog } from './menu.fixtures'

const contentState = (root: HTMLElement) => root.querySelector('[data-testid="content"]')?.getAttribute('data-state')

it('opens on trigger click, selects an item and closes', async () => {
  const screen = await render(<SelectionLog />)
  const root = screen.container as HTMLElement

  await screen.getByTestId('trigger').click()
  await expect.poll(() => contentState(root)).toBe('open')
  expect(root.querySelector('[data-testid="content"]')?.getAttribute('class')).toContain('menu__content')

  await screen.getByTestId('item-open').click()
  await expect.poll(() => contentState(root) ?? 'closed').toBe('closed')
  await expect.poll(() => root.querySelector('[data-testid="selected"]')?.textContent).toBe('open')
})

it('toggles the item indicator of a checkbox item', async () => {
  const screen = await render(<CheckboxMenu />)
  const root = screen.container as HTMLElement

  await expect.poll(() => root.querySelector('[data-testid="indicator-notifications"]')).toBeTruthy()
  expect(root.querySelector('[data-testid="indicator-dark-mode"]')).toBeFalsy()

  await screen.getByTestId('item-dark-mode').click()

  await expect.poll(() => root.querySelector('[data-testid="indicator-dark-mode"]')).toBeTruthy()
  await expect
    .poll(() => root.querySelector('[data-testid="item-dark-mode"]')?.getAttribute('data-state'))
    .toBe('checked')
})
