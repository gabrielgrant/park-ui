import { page, userEvent } from '@vitest/browser/context'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest } from './slider.fixtures'

// page-scoped locators: vitest-browser-qwik scopes `screen` queries by the
// container's text, which goes stale once the value text changes
it('changes the value with the keyboard', async () => {
  await render(<ComponentUnderTest />)
  const thumb = page.getByRole('slider')

  await expect.element(thumb).toHaveAttribute('aria-valuenow', '40')

  ;(thumb.element() as HTMLElement).focus()
  await userEvent.keyboard('{ArrowRight}')
  await userEvent.keyboard('{ArrowRight}')

  await expect.element(thumb).toHaveAttribute('aria-valuenow', '42')
  await expect.element(page.getByTestId('value-text')).toHaveTextContent('42')

  await userEvent.keyboard('{ArrowLeft}')

  await expect.element(thumb).toHaveAttribute('aria-valuenow', '41')
  await expect.element(thumb).toHaveClass('slider__thumb')
})
