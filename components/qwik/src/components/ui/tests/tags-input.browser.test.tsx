import { page, userEvent } from '@vitest/browser/context'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest } from './tags-input.fixtures'

const tagTexts = (root: HTMLElement) =>
  [...root.querySelectorAll('[data-part="item-text"]')].map((node) => node.textContent)

it('adds a tag on enter and removes one via its delete trigger', async () => {
  const screen = await render(<ComponentUnderTest />)
  const root = screen.container as HTMLElement

  await page.getByTestId('input').click()
  await userEvent.keyboard('Qwik{Enter}')

  await expect.poll(() => tagTexts(root)).toEqual(['React', 'Solid', 'Vue', 'Qwik'])
  await expect.element(page.getByTestId('input')).toHaveValue('')

  const deleteSolid = root.querySelectorAll('[data-part="item-delete-trigger"]')[1] as HTMLElement
  await userEvent.click(deleteSolid)

  await expect.poll(() => tagTexts(root)).toEqual(['React', 'Vue', 'Qwik'])
  expect(root.querySelector('[data-testid="item"]')?.getAttribute('class')).toContain(
    'tags-input__item',
  )
})
