import { userEvent } from '@vitest/browser/context'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest } from './tabs.fixtures'

it('switches tabs when a trigger is clicked', async () => {
  const screen = await render(<ComponentUnderTest />)

  await expect.element(screen.getByText('React content')).toBeVisible()

  await screen.getByRole('tab', { name: 'Solid' }).click()

  await expect
    .element(screen.getByRole('tab', { name: 'Solid' }))
    .toHaveAttribute('aria-selected', 'true')
  await expect.element(screen.getByText('Solid content')).toBeVisible()
  await expect.element(screen.getByText('React content')).not.toBeVisible()
})

it('moves between tabs with arrow keys', async () => {
  const screen = await render(<ComponentUnderTest />)

  await screen.getByRole('tab', { name: 'React' }).click()
  await userEvent.keyboard('{ArrowRight}')

  await expect.element(screen.getByRole('tab', { name: 'Solid' })).toHaveFocus()
  await expect
    .element(screen.getByRole('tab', { name: 'Solid' }))
    .toHaveAttribute('aria-selected', 'true')
})
