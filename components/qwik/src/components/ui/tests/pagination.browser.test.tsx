import { page, userEvent } from '@vitest/browser/context'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest } from './pagination.fixtures'

it('moves the selected page with next and page clicks', async () => {
  const screen = await render(<ComponentUnderTest />)
  const root = screen.container as HTMLElement
  const current = () => root.querySelector('[data-part="item"][aria-current="page"]')
  const item = (text: string) =>
    [...root.querySelectorAll<HTMLElement>('[data-part="item"]')].find((node) => node.textContent === text)

  await expect.poll(() => current()?.textContent).toBe('1')

  await page.getByTestId('next-trigger').click()
  await expect.poll(() => current()?.textContent).toBe('2')
  await expect.poll(() => current()?.getAttribute('class')).toContain('button--variant_solid')

  await userEvent.click(item('4') as HTMLElement)
  await expect.poll(() => current()?.textContent).toBe('4')
  await expect.poll(() => item('2')?.getAttribute('class')).toContain('button--variant_outline')
})
