import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './slider.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('Slider (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-part="root"]')).toContain('slider__root')
    expect(getClasses(document, '[data-part="label"]')).toContain('slider__label')
    expect(getClasses(document, '[data-part="control"]')).toContain('slider__control')
    expect(getClasses(document, '[data-part="track"]')).toContain('slider__track')
    expect(getClasses(document, '[data-part="range"]')).toContain('slider__range')
    expect(getClasses(document, '[data-part="thumb"]')).toContain('slider__thumb')
    expect(getClasses(document, '[data-part="value-text"]')).toContain('slider__valueText')
    expect(getClasses(document, '[data-part="marker-group"]')).toContain('slider__markerGroup')
    expect(getClasses(document, '[data-part="marker"]')).toContain('slider__marker')
    expect(getClasses(document, '.slider__markerIndicator')).toContain(
      'slider__markerIndicator--size_md',
    )
  })

  it('renders one thumb per value with a hidden input', async () => {
    const single = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    expect(single.document.querySelectorAll('[data-part="thumb"]').length).toBe(1)
    expect(
      single.document.querySelector('[data-part="thumb"]')?.getAttribute('aria-valuenow'),
    ).toBe('40')
    expect(single.document.querySelectorAll('[data-part="thumb"] input').length).toBe(1)

    const range = await ssrRenderToDom(<ComponentUnderTest defaultValue={[20, 60]} />, {
      qwikLoader: true,
    })
    const thumbs = range.document.querySelectorAll('[data-part="thumb"]')
    expect([...thumbs].map((thumb) => thumb.getAttribute('aria-valuenow'))).toEqual(['20', '60'])
  })

  it('renders marks with optional labels', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const markers = document.querySelectorAll('[data-part="marker"]')
    expect(markers.length).toBe(2)
    expect(markers[0]?.querySelector('span')).toBeFalsy()
    expect(markers[1]?.textContent).toBe('75%')
  })

  it('applies size variant classes', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest size="lg" />, {
      qwikLoader: true,
    })

    expect(getClasses(document, '[data-part="root"]')).toContain('slider__root--size_lg')
  })
})
