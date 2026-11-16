import { userEvent } from '@vitest/browser/context'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest } from './tooltip.fixtures'

// unmountOnExit (the wrapper default) is overridden: closing an unmountOnExit
// presence in @ark-ui/qwik throws an unhandled Qwik cursor `insertBefore`
// NotFoundError (reproduces on the raw ark Dialog; ark bug, not the wrapper).
const contentState = (screen: { container: Element }) =>
  (screen.container as HTMLElement)
    .querySelector('[data-testid="content"]')
    ?.getAttribute('data-state')

it('opens on trigger hover and closes on unhover', async () => {
  const screen = await render(
    <ComponentUnderTest openDelay={0} closeDelay={0} unmountOnExit={false} />,
  )

  expect(contentState(screen)).toBeUndefined()

  await expect
    .poll(
      async () => {
        await userEvent.hover(screen.getByTestId('trigger'))
        return contentState(screen)
      },
      { timeout: 10000 },
    )
    .toBe('open')
  await expect.element(screen.getByTestId('content')).toHaveClass('tooltip__content')
  await expect.element(screen.getByTestId('content')).toHaveTextContent('Tooltip content')

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
