import { parseColor } from '@ark-ui/qwik/color-picker'
import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './color-picker.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('ColorPicker (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const slots: Array<[string, string]> = [
      ['root', 'root'],
      ['label', 'label'],
      ['control', 'control'],
      ['channel-input', 'channelInput'],
      ['value-text', 'valueText'],
      ['trigger', 'trigger'],
      ['positioner', 'positioner'],
      ['content', 'content'],
      ['format-trigger', 'formatTrigger'],
      ['format-select', 'formatSelect'],
      ['area', 'area'],
      ['area-background', 'areaBackground'],
      ['area-thumb', 'areaThumb'],
      ['channel-slider', 'channelSlider'],
      ['channel-slider-track', 'channelSliderTrack'],
      ['channel-slider-thumb', 'channelSliderThumb'],
      ['transparency-grid', 'transparencyGrid'],
      ['swatch-group', 'swatchGroup'],
      ['swatch-trigger', 'swatchTrigger'],
      ['swatch-indicator', 'swatchIndicator'],
      ['view', 'view'],
      ['eye-dropper-trigger', 'eyeDropperTrigger'],
    ]
    for (const [part, slot] of slots) {
      expect(getClasses(document, `[data-scope="color-picker"][data-part="${part}"]`), part).toContain(
        `color-picker__${slot}`,
      )
    }
  })

  it('styles swatches inside swatch triggers', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-part="swatch-trigger"] [data-part="swatch"]')).toContain('color-picker__swatch')
  })

  it('renders a transparency grid inside the trigger', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const grid = document.querySelector('[data-part="trigger"] [data-part="transparency-grid"]')
    expect(grid?.getAttribute('class')).toContain('color-picker__transparencyGrid')
  })

  it('reflects the default value through SSR', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(document.querySelector('[data-testid="value-text"]')?.textContent).toBe('rgba(235, 94, 65, 1)')
    expect((document.querySelector('[data-testid="hex-input"]') as HTMLInputElement | null)?.value).toBe('#EB5E41')
  })

  it('accepts a controlled Color value', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest value={parseColor('#0000ff')} />, {
      qwikLoader: true,
    })

    expect((document.querySelector('[data-testid="hex-input"]') as HTMLInputElement | null)?.value).toBe('#0000FF')
  })

  it('merges a user class after the slot classes', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest class="custom-root" />, { qwikLoader: true })

    const classes = getClasses(document, '[data-scope="color-picker"][data-part="root"]')
    expect(classes).toContain('color-picker__root')
    expect(classes).toContain('custom-root')
  })
})
