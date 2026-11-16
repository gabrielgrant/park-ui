import { page } from '@vitest/browser/context'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest } from './clipboard.fixtures'

it('enters the copied state and swaps the indicators on trigger click', async () => {
  const screen = await render(<ComponentUnderTest />)
  const root = screen.container as HTMLElement
  const trigger = page.getByTestId('trigger')

  await expect.element(trigger).not.toHaveAttribute('data-copied')
  const copyText = () =>
    (root.querySelector('[data-testid="copy-text"]') as HTMLElement | null)?.innerText
  expect(copyText()).toBe('Copy')

  await trigger.click()

  await expect.element(trigger).toHaveAttribute('data-copied', '')
  await expect.element(page.getByTestId('control')).toHaveAttribute('data-copied', '')
  await expect.poll(copyText).toBe('Copied')
  await expect.poll(() => root.querySelectorAll('[data-testid="indicator"] svg').length).toBe(2)
  expect(trigger.element().getAttribute('class')).toContain('clipboard__trigger')
})
