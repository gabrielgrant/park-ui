import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest } from './scroll-area.fixtures'

it('tracks the viewport scroll position through the styled parts', async () => {
  const screen = await render(<ComponentUnderTest style={{ width: '200px', height: '200px' }} />)
  const viewport = screen.getByTestId('viewport').element() as HTMLElement

  await expect.element(screen.getByTestId('viewport')).toHaveClass('scroll-area__viewport')
  await expect
    .element(screen.getByTestId('scrollbar'))
    .toHaveAttribute('data-orientation', 'vertical')

  await expect.poll(() => viewport.hasAttribute('data-at-top')).toBe(true)

  viewport.scrollTop = 100
  viewport.dispatchEvent(new Event('scroll', { bubbles: true }))

  await expect.poll(() => viewport.hasAttribute('data-at-top')).toBe(false)
})
