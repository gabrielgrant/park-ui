import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest } from './file-upload.fixtures'

it('lists an accepted file with size and removes it via the delete trigger', async () => {
  const screen = await render(<ComponentUnderTest />)
  const root = screen.container as HTMLElement

  const input = screen.getByTestId('hidden-input').element() as HTMLInputElement
  const dataTransfer = new DataTransfer()
  dataTransfer.items.add(new File(['hello world'], 'test.txt', { type: 'text/plain' }))
  input.files = dataTransfer.files
  input.dispatchEvent(new Event('input', { bubbles: true }))

  await expect.poll(() => root.querySelector('[data-part="item"]')).toBeTruthy()
  const item = root.querySelector('[data-part="item"]') as HTMLElement
  expect(item.getAttribute('class')).toContain('file-upload__item')
  expect(item.querySelector('[data-part="item-name"]')?.textContent).toBe('test.txt')
  expect(item.querySelector('[data-part="item-size-text"]')).toBeTruthy()
  expect(item.querySelector('[data-part="item-preview"] svg')).toBeTruthy()
  await expect.element(screen.getByTestId('file-text')).toHaveTextContent('test.txt')
  await expect.element(screen.getByTestId('file-text')).not.toHaveAttribute('data-placeholder')

  ;(item.querySelector('[data-part="item-delete-trigger"]') as HTMLElement).click()
  await expect.poll(() => root.querySelector('[data-part="item"]')).toBeFalsy()
  await expect.element(screen.getByTestId('file-text')).toHaveTextContent('Select file(s)')
})
