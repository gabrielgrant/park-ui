import { userEvent } from '@vitest/browser/context'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest } from './rating-group.fixtures'

it('rates when a star is clicked', async () => {
  const screen = await render(<ComponentUnderTest />)
  const root = screen.container as HTMLElement
  const items = () => Array.from(root.querySelectorAll<HTMLElement>('[data-part="item"]'))
  const highlighted = () =>
    Array.from(root.querySelectorAll('.rating-group__itemIndicator')).filter((el) =>
      el.hasAttribute('data-highlighted'),
    ).length

  await expect.poll(highlighted).toBe(3)

  const fourth = items()[3]
  if (!fourth) throw new Error('missing item')
  await userEvent.click(fourth)
  await userEvent.unhover(fourth)

  await expect.poll(() => items()[3]?.getAttribute('data-checked')).toBe('')
  await expect.poll(highlighted).toBe(4)
  await expect.poll(() => root.querySelector<HTMLInputElement>('input')?.value).toBe('4')
})
