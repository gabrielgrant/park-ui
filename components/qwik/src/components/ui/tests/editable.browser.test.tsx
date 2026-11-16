import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { page } from 'vitest/browser'
import { CommitEditable } from './editable.fixtures'

// queries go through `page`: `screen` is scoped by the container's initial
// text, which stops matching once the preview text changes
it('edits and submits a new value', async () => {
  await render(<CommitEditable />)
  const preview = page.getByText('Hello')

  await page.getByRole('button', { name: 'edit', exact: true }).last().click()
  const input = page.getByRole('textbox', { name: 'Name' })
  await expect.element(input).toBeVisible()

  await input.fill('World')
  await page.getByRole('button', { name: 'submit' }).click()

  await expect.element(page.getByTestId('committed')).toHaveTextContent('World')
  await expect
    .element(page.getByText('World', { exact: true }).first())
    .toHaveClass('editable__preview')
  await expect.element(preview).not.toBeInTheDocument()
})
