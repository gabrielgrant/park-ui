import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './tabs.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('Tabs (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-part="root"]')).toContain('tabs__root')
    expect(getClasses(document, '[data-part="list"]')).toContain('tabs__list')
    expect(getClasses(document, '[data-part="trigger"]')).toContain('tabs__trigger')
    expect(getClasses(document, '[data-part="content"]')).toContain('tabs__content')
    expect(getClasses(document, '[data-part="indicator"]')).toContain('tabs__indicator')
  })

  it('applies default and changed variant classes', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    expect(getClasses(document, '[data-part="list"]')).toContain('tabs__list--variant_line')
    expect(getClasses(document, '[data-part="root"]')).toContain('tabs__root--size_md')

    const changed = await ssrRenderToDom(
      <ComponentUnderTest variant="enclosed" size="lg" fitted />,
      {
        qwikLoader: true,
      },
    )
    expect(getClasses(changed.document, '[data-part="list"]')).toContain(
      'tabs__list--variant_enclosed',
    )
    expect(getClasses(changed.document, '[data-part="root"]')).toContain('tabs__root--size_lg')
    expect(getClasses(changed.document, '[data-part="root"]')).toContain('tabs__root--fitted_true')
  })

  it('selects the default tab', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const triggers = document.querySelectorAll('[data-part="trigger"]')
    expect(triggers[0]?.getAttribute('aria-selected')).toBe('true')
    expect(triggers[1]?.getAttribute('aria-selected')).toBe('false')
    const contents = document.querySelectorAll('[data-part="content"]')
    expect(contents[0]?.hasAttribute('hidden')).toBe(false)
    expect(contents[1]?.hasAttribute('hidden')).toBe(true)
  })
})
