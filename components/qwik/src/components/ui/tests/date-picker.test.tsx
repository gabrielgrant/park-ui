import { parseDate } from '@internationalized/date'
import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './date-picker.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('DatePicker (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const slots: Array<[string, string]> = [
      ['root', 'root'],
      ['label', 'label'],
      ['control', 'control'],
      ['input', 'input'],
      ['trigger', 'trigger'],
      ['clear-trigger', 'clearTrigger'],
      ['positioner', 'positioner'],
      ['content', 'content'],
      ['view', 'view'],
      ['view-control', 'viewControl'],
      ['prev-trigger', 'prevTrigger'],
      ['view-trigger', 'viewTrigger'],
      ['range-text', 'rangeText'],
      ['next-trigger', 'nextTrigger'],
      ['table', 'table'],
      ['table-head', 'tableHead'],
      ['table-header', 'tableHeader'],
      ['table-body', 'tableBody'],
      ['table-row', 'tableRow'],
      ['table-cell', 'tableCell'],
      ['table-cell-trigger', 'tableCellTrigger'],
    ]
    for (const [part, slot] of slots) {
      expect(
        getClasses(document, `[data-scope="date-picker"][data-part="${part}"]`),
        part,
      ).toContain(`date-picker__${slot}`)
    }
  })

  it('renders the day grid from the context', async () => {
    const { document } = await ssrRenderToDom(
      <ComponentUnderTest defaultFocusedValue={parseDate('2024-06-15')} />,
      {
        qwikLoader: true,
      },
    )

    expect(document.querySelectorAll('[data-part="table-header"]').length).toBe(7)
    expect(document.querySelector('[data-testid="day-2024-06-15"]')).toBeTruthy()
  })

  it('reflects a default value in the input', async () => {
    const { document } = await ssrRenderToDom(
      <ComponentUnderTest defaultValue={[parseDate('2024-06-15')]} />,
      {
        qwikLoader: true,
      },
    )

    expect(
      (document.querySelector('[data-testid="input"]') as HTMLInputElement | null)?.value,
    ).toBe('06/15/2024')
  })
})
