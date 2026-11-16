import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest } from './select.fixtures'

const contentState = (root: HTMLElement) => root.querySelector('[data-testid="content"]')?.getAttribute('data-state')

it('opens on trigger click, chooses an option and shows its check icon', async () => {
  const screen = await render(<ComponentUnderTest />)
  const root = screen.container as HTMLElement

  expect(contentState(root)).toBe('closed')

  await screen.getByTestId('trigger').click()
  await expect.poll(() => contentState(root)).toBe('open')

  await screen.getByTestId('item-solid').click()
  await expect.poll(() => contentState(root)).toBe('closed')

  await expect.poll(() => root.querySelector('[data-testid="value-text"]')?.textContent).toBe('Solid')
  await expect.poll(() => root.querySelector('[data-testid="indicator-solid"] svg')).toBeTruthy()
  expect(root.querySelector('[data-testid="trigger"]')?.getAttribute('class')).toContain('select__trigger')
})
