import { userEvent } from '@vitest/browser/context'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest } from './dialog.fixtures'

// unmountOnExit (the wrapper default) is overridden: closing an unmountOnExit
// presence in @ark-ui/qwik throws an unhandled Qwik cursor `insertBefore`
// NotFoundError (reproduces on the raw ark Dialog; ark bug, not the wrapper).
const contentState = (screen: { container: Element }) =>
  (screen.container as HTMLElement)
    .querySelector('[data-testid="content"]')
    ?.getAttribute('data-state')

it('opens on trigger click and closes on close-trigger click', async () => {
  const screen = await render(<ComponentUnderTest unmountOnExit={false} />)

  expect(contentState(screen)).toBeUndefined()

  await screen.getByTestId('trigger').click()
  await expect.poll(() => contentState(screen)).toBe('open')
  await expect.element(screen.getByTestId('content')).toHaveClass('dialog__content')

  await screen.getByTestId('close').click()
  await expect.poll(() => contentState(screen)).toBe('closed')
})

it('closes on Escape', async () => {
  const screen = await render(<ComponentUnderTest unmountOnExit={false} />)

  await screen.getByTestId('trigger').click()
  await expect.poll(() => contentState(screen)).toBe('open')

  await userEvent.keyboard('{Escape}')
  await expect.poll(() => contentState(screen)).toBe('closed')
})

it('closes via ActionTrigger', async () => {
  const screen = await render(<ComponentUnderTest unmountOnExit={false} />)

  await screen.getByTestId('trigger').click()
  await expect.poll(() => contentState(screen)).toBe('open')

  await screen.getByTestId('action').click()
  await expect.poll(() => contentState(screen)).toBe('closed')
})
