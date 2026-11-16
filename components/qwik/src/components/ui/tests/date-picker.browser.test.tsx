import { parseDate } from '@internationalized/date'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-qwik'
import { ComponentUnderTest } from './date-picker.fixtures'

it('opens via the trigger and picking a day fills the input', async () => {
  const screen = await render(<ComponentUnderTest defaultFocusedValue={parseDate('2024-06-15')} />)
  const root = screen.container as HTMLElement

  await screen.getByTestId('trigger').click()
  await expect.poll(() => root.querySelector('[data-testid="content"]')?.hasAttribute('hidden')).toBe(false)

  // native click (ark PLAN.md Part 5 #0b): locator clicks on cell triggers can be swallowed
  const day = root.querySelector('[data-testid="day-2024-06-15"]') as HTMLElement
  expect(day.getAttribute('class')).toContain('date-picker__tableCellTrigger')
  day.click()

  await expect.element(screen.getByTestId('input')).toHaveValue('06/15/2024')
})
