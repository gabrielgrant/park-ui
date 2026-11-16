import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest } from './toast.fixtures'

const toastRoot = (screen: { container: Element }) =>
  screen.container.querySelector('[data-scope="toast"][data-part="root"]')

// Must stay this file's FIRST render (ark PLAN.md Part 5 #0q): run after
// another render() of a fixture sharing the module-level toaster, the toast is
// created but no <Toaster> renders it.
it('shows a styled toast from a trigger click and dismisses it via the close trigger', async () => {
  const screen = await render(<ComponentUnderTest />)

  await screen.getByTestId('show-toast').click()
  await expect.poll(() => toastRoot(screen)).toBeTruthy()

  const root = toastRoot(screen) as HTMLElement
  expect(root.getAttribute('class')).toContain('toast__root')
  expect(root.querySelector('[data-part="title"]')?.getAttribute('class')).toContain('toast__title')
  expect(root.querySelector('[data-part="title"]')?.textContent).toBe('Saved')
  expect(root.querySelector('[data-part="description"]')?.textContent).toBe(
    'Your changes have been saved.',
  )
  expect(root.querySelector('svg[data-type="success"]')).toBeTruthy()

  const close = root.querySelector('[data-part="close-trigger"]') as HTMLElement
  expect(close.getAttribute('class')).toContain('toast__closeTrigger')
  close.click()
  await expect.poll(() => toastRoot(screen), { timeout: 5000 }).toBeFalsy()
})
