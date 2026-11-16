import { userEvent } from '@vitest/browser/context'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest } from './hover-card.fixtures'

const contentState = (screen: { container: Element }) =>
  (screen.container as HTMLElement)
    .querySelector('[data-testid="content"]')
    ?.getAttribute('data-state')

it('opens on trigger hover and closes on unhover', async () => {
  const screen = await render(<ComponentUnderTest openDelay={0} closeDelay={0} />)

  expect(contentState(screen)).toBe('closed')

  await expect
    .poll(
      async () => {
        await userEvent.hover(screen.getByTestId('trigger'))
        return contentState(screen)
      },
      { timeout: 10000 },
    )
    .toBe('open')
  await expect.element(screen.getByTestId('content')).toHaveClass('hover-card__content')

  await expect
    .poll(
      async () => {
        await userEvent.unhover(screen.getByTestId('trigger'))
        return contentState(screen)
      },
      { timeout: 10000 },
    )
    .toBe('closed')
})
