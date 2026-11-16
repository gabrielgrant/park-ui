import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './tags-input.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('TagsInput (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-scope="tags-input"][data-part="root"]')).toContain(
      'tags-input__root',
    )
    expect(getClasses(document, '[data-testid="label"]')).toContain('tags-input__label')
    expect(getClasses(document, '[data-testid="control"]')).toContain('tags-input__control')
    expect(getClasses(document, '[data-testid="input"]')).toContain('tags-input__input')
    expect(getClasses(document, '[data-testid="clear-trigger"]')).toContain(
      'tags-input__clearTrigger',
    )
    expect(getClasses(document, '[data-testid="item"]')).toContain('tags-input__item')
    expect(getClasses(document, '[data-part="item-preview"]')).toContain('tags-input__itemPreview')
    expect(getClasses(document, '[data-part="item-text"]')).toContain('tags-input__itemText')
    expect(getClasses(document, '[data-part="item-delete-trigger"]')).toContain(
      'tags-input__itemDeleteTrigger',
    )
    expect(getClasses(document, '[data-part="item-input"]')).toContain('tags-input__itemInput')
  })

  it('applies default and explicit variant classes', async () => {
    const defaults = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    expect(getClasses(defaults.document, '[data-testid="control"]')).toContain(
      'tags-input__control--size_md',
    )
    expect(getClasses(defaults.document, '[data-testid="control"]')).toContain(
      'tags-input__control--variant_outline',
    )

    const custom = await ssrRenderToDom(<ComponentUnderTest size="lg" variant="subtle" />, {
      qwikLoader: true,
    })
    expect(getClasses(custom.document, '[data-testid="control"]')).toContain(
      'tags-input__control--size_lg',
    )
    expect(getClasses(custom.document, '[data-testid="control"]')).toContain(
      'tags-input__control--variant_subtle',
    )
  })

  it('renders one item per value with a delete icon', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const texts = [...document.querySelectorAll('[data-part="item-text"]')].map(
      (node) => node.textContent,
    )
    expect(texts).toEqual(['React', 'Solid', 'Vue'])
    expect(document.querySelectorAll('[data-part="item-delete-trigger"] svg').length).toBe(3)
    expect(document.querySelector('[data-testid="clear-trigger"] svg')).toBeTruthy()
  })
})
