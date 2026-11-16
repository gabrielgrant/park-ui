import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest } from './segment-group.fixtures'

it('selects a segment when it is clicked', async () => {
  const screen = await render(<ComponentUnderTest />)
  const item = (label: string) => screen.getByText(label).element().closest('[data-part="item"]')

  expect(item('React')?.getAttribute('data-state')).toBe('checked')

  await screen.getByText('Solid').click()

  await expect.poll(() => item('Solid')?.getAttribute('data-state')).toBe('checked')
  expect(item('React')?.getAttribute('data-state')).toBe('unchecked')
  await expect.element(screen.getByRole('radio', { name: 'Solid' })).toBeChecked()
})

it('does not select a disabled segment', async () => {
  const screen = await render(<ComponentUnderTest />)
  const item = (label: string) => screen.getByText(label).element().closest('[data-part="item"]')

  await screen.getByText('Svelte').click({ force: true })

  await expect.poll(() => item('React')?.getAttribute('data-state')).toBe('checked')
  expect(item('Svelte')?.getAttribute('data-state')).toBe('unchecked')
})
