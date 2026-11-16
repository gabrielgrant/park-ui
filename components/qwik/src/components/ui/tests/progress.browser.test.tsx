import { page } from '@vitest/browser/context'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ControlledProgress } from './progress.fixtures'

// page-scoped locators: vitest-browser-qwik scopes `screen` queries by the
// container's text, which goes stale once the value text changes
it('updates the value text when a controlled value changes', async () => {
  await render(<ControlledProgress />)

  await expect.element(page.getByTestId('value-text')).toHaveTextContent('20%')

  await page.getByText('increase').click()

  await expect.element(page.getByTestId('value-text')).toHaveTextContent('30%')
  await expect.element(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '30')
  await expect
    .poll(() => page.getByTestId('range').element().getAttribute('style'))
    .toContain('30%')
})
