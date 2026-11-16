import { userEvent } from '@vitest/browser/context'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest } from './splitter.fixtures'

it('resizes panels via ArrowRight on the resize trigger', async () => {
  const screen = await render(<ComponentUnderTest />)
  const trigger = screen.getByTestId('resize-trigger')

  const before = trigger.element().getAttribute('aria-valuenow')
  expect(before).toBeTruthy()

  await trigger.click()
  await userEvent.keyboard('{ArrowRight}')

  await expect.poll(() => trigger.element().getAttribute('aria-valuenow')).not.toBe(before)
  await expect.element(trigger).toHaveClass('splitter__resizeTrigger')
})
