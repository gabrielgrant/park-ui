import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest, CustomIndicator } from './alert.fixtures'

describe('Alert (styled, SSR)', () => {
  it('applies slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    const cls = (id: string) =>
      document.querySelector(`[data-testid="${id}"]`)?.getAttribute('class') ?? ''
    for (const slot of ['root', 'indicator', 'content', 'title', 'description']) {
      expect(cls(slot)).toContain(`alert__${slot}`)
    }
    expect(cls('root')).toContain('alert__root--status_error')
    expect(cls('root')).toContain('alert__root--variant_solid')
  })

  it('renders the info icon inside the indicator by default', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    const indicator = document.querySelector('[data-testid="indicator"]')
    expect(indicator?.tagName).toBe('SPAN')
    expect(indicator?.querySelector('svg')).toBeTruthy()
  })

  it('renders custom indicator children instead of the default icon', async () => {
    const { document } = await ssrRenderToDom(<CustomIndicator />, { qwikLoader: true })
    const indicator = document.querySelector('[data-testid="custom-indicator"]')
    expect(indicator?.querySelector('[data-testid="custom-icon"]')).toBeTruthy()
    expect(indicator?.querySelector('svg')).toBeFalsy()
  })
})
