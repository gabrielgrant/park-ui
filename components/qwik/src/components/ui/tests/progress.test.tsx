import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { Circular, ComponentUnderTest } from './progress.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('Progress (styled, SSR)', () => {
  it('applies recipe slot classes to linear parts', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-part="root"]')).toContain('progress__root')
    expect(getClasses(document, '[data-part="label"]')).toContain('progress__label')
    expect(getClasses(document, '[data-part="track"]')).toContain('progress__track')
    expect(getClasses(document, '[data-part="range"]')).toContain('progress__range')
    expect(getClasses(document, '[data-part="value-text"]')).toContain('progress__valueText')
  })

  it('applies recipe slot classes to circular parts', async () => {
    const { document } = await ssrRenderToDom(<Circular />, { qwikLoader: true })

    expect(getClasses(document, '[data-part="circle"]')).toContain('progress__circle')
    expect(getClasses(document, '[data-part="circle-track"]')).toContain('progress__circleTrack')
    expect(getClasses(document, '[data-part="circle-range"]')).toContain('progress__circleRange')
    expect(getClasses(document, '[data-part="view"]')).toContain('progress__view')
  })

  it('renders the value text and range width from the value', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(document.querySelector('[data-part="value-text"]')?.textContent).toBe('42%')
    expect(document.querySelector('[data-part="range"]')?.getAttribute('style')).toContain('42%')
  })

  it('applies variant classes', async () => {
    const { document } = await ssrRenderToDom(
      <ComponentUnderTest variant="subtle" shape="full" size="lg" striped animated />,
      { qwikLoader: true },
    )

    const classes = getClasses(document, '[data-part="track"]')
    expect(classes).toContain('progress__track--variant_subtle')
    expect(classes).toContain('progress__track--shape_full')
    expect(getClasses(document, '[data-part="root"]')).toContain('progress__root--size_lg')
    expect(getClasses(document, '[data-part="range"]')).toContain('progress__range--striped_true')
    expect(getClasses(document, '[data-part="range"]')).toContain('progress__range--animated_true')
  })

  it('renders indeterminate state for a null value', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest value={null} />, {
      qwikLoader: true,
    })

    expect(document.querySelector('[data-part="root"]')?.getAttribute('data-state')).toBe(
      'indeterminate',
    )
  })
})
