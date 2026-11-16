import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './loader.fixtures'

const render = async () =>
  (await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })).document

describe('Loader (SSR)', () => {
  it('renders only the children in a contents span when no text or spinner is given', async () => {
    const document = await render()
    const loader = document.querySelector('[data-testid="default-loader"]')
    expect(loader?.tagName).toBe('SPAN')
    expect(loader?.getAttribute('class')).toContain('d_contents')
    expect(loader?.querySelector('[data-testid="default-child"]')).toBeTruthy()
    expect(loader?.querySelector('.spinner')).toBeFalsy()
  })

  it('renders the bare children when not visible', async () => {
    const document = await render()
    const wrapper = document.querySelector('[data-testid="hidden"]')
    expect(wrapper?.firstElementChild?.getAttribute('data-testid')).toBe('hidden-child')
    expect(wrapper?.querySelector('.spinner')).toBeFalsy()
  })

  it('replaces children with spinner and text, honoring placement', async () => {
    const document = await render()
    const start = document.querySelector('[data-testid="text-start"] > span')
    expect(start?.querySelector('[data-testid="text-child"]')).toBeFalsy()
    expect(start?.textContent).toBe('Loading...')
    const startHtml = start?.innerHTML ?? ''
    expect(startHtml.indexOf('class="spinner')).toBeLessThan(startHtml.indexOf('Loading...'))
    expect(startHtml.indexOf('class="spinner')).toBeGreaterThanOrEqual(0)

    const end = document.querySelector('[data-testid="text-end"] > span')
    const html = end?.innerHTML ?? ''
    expect(html.indexOf('Loading...')).toBeGreaterThanOrEqual(0)
    expect(html.indexOf('Loading...')).toBeLessThan(html.indexOf('class="spinner'))
  })

  it('centers a custom spinner over visually hidden children', async () => {
    const document = await render()
    const root = document.querySelector('[data-testid="custom-spinner"] > span')
    const center = root?.querySelector('.absolute-center')
    expect(center?.querySelector('[data-testid="my-spinner"]')).toBeTruthy()
    const hidden = root?.querySelector('[data-testid="custom-child"]')?.parentElement
    expect(hidden?.getAttribute('class')).toContain('vis_hidden')
  })
})
