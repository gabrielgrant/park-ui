import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './splitter.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('Splitter (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-testid="root"]')).toContain('splitter__root')
    expect(getClasses(document, '[data-testid="panel-a"]')).toContain('splitter__panel')
    expect(getClasses(document, '[data-testid="panel-b"]')).toContain('splitter__panel')
    expect(getClasses(document, '[data-testid="resize-trigger"]')).toContain(
      'splitter__resizeTrigger',
    )
  })

  it('reflects orientation through SSR', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest orientation="vertical" />, {
      qwikLoader: true,
    })

    expect(document.querySelector('[data-testid="root"]')?.getAttribute('data-orientation')).toBe(
      'vertical',
    )
  })

  it('applies style props alongside the slot class', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest minH="64" />, {
      qwikLoader: true,
    })

    const classes = getClasses(document, '[data-testid="root"]')
    expect(classes).toContain('splitter__root')
    expect(classes).toContain('min-h_64')
  })
})
