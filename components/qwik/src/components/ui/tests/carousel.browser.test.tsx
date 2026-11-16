import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest } from './carousel.fixtures'

it('next and prev triggers change the active slide', async () => {
  const screen = await render(<ComponentUnderTest />)
  const root = screen.container as HTMLElement
  const currentIndex = () =>
    Array.from(root.querySelectorAll('[data-part="indicator"]')).findIndex((el) => el.hasAttribute('data-current'))

  await expect.poll(currentIndex).toBe(0)
  await expect.element(screen.getByTestId('item-0')).not.toHaveAttribute('aria-hidden', 'true')

  await screen.getByTestId('next-trigger').click()
  await expect.poll(currentIndex).toBe(1)
  await expect.element(screen.getByTestId('item-0')).toHaveAttribute('aria-hidden', 'true')
  await expect.element(screen.getByTestId('item-0')).toHaveClass('carousel__item')

  await screen.getByTestId('prev-trigger').click()
  await expect.poll(currentIndex).toBe(0)
})
