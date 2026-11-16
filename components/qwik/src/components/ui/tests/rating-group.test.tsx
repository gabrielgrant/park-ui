import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest, CustomIcon, InlineSvgIcon } from './rating-group.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('RatingGroup (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-part="root"]')).toContain('rating-group__root')
    expect(getClasses(document, '[data-part="label"]')).toContain('rating-group__label')
    expect(getClasses(document, '[data-part="control"]')).toContain('rating-group__control')
    expect(getClasses(document, '[data-part="item"]')).toContain('rating-group__item')
    expect(getClasses(document, '.rating-group__itemIndicator')).toContain(
      'rating-group__itemIndicator--size_md',
    )
  })

  it('renders count items with bg and fg star icons by default', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const items = document.querySelectorAll('[data-part="item"]')
    expect(items.length).toBe(5)
    const indicator = items[0]?.querySelector('.rating-group__itemIndicator')
    const svgs = indicator?.querySelectorAll('svg') ?? []
    expect(svgs.length).toBe(2)
    expect(svgs[0]?.hasAttribute('data-bg')).toBe(true)
    expect(svgs[1]?.hasAttribute('data-fg')).toBe(true)
    expect(svgs[0]?.getAttribute('fill')).toBe('currentColor')
    expect(svgs[0]?.getAttribute('aria-hidden')).toBe('true')
  })

  it('marks indicators up to the value as highlighted', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const indicators = document.querySelectorAll('.rating-group__itemIndicator')
    expect([...indicators].map((el) => el.hasAttribute('data-highlighted'))).toEqual([
      true,
      true,
      true,
      false,
      false,
    ])
    expect([...indicators].map((el) => el.hasAttribute('data-checked'))).toEqual([
      false,
      false,
      true,
      false,
      false,
    ])
  })

  it('marks a half value indicator', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest allowHalf defaultValue={2.5} />, {
      qwikLoader: true,
    })

    const indicators = document.querySelectorAll('.rating-group__itemIndicator')
    expect(indicators[2]?.hasAttribute('data-half')).toBe(true)
    expect(indicators[1]?.hasAttribute('data-half')).toBe(false)
  })

  it('renders a custom icon twice per item', async () => {
    const { document } = await ssrRenderToDom(<CustomIcon />, { qwikLoader: true })

    const hearts =
      document
        .querySelectorAll('[data-part="item"]')[0]
        ?.querySelectorAll('[data-testid="heart"]') ?? []
    expect(hearts.length).toBe(2)
    expect(hearts[0]?.hasAttribute('data-bg')).toBe(true)
    expect(hearts[1]?.hasAttribute('data-fg')).toBe(true)
  })

  it('accepts an inline svg element as icon', async () => {
    const { document } = await ssrRenderToDom(<InlineSvgIcon />, { qwikLoader: true })

    expect(document.querySelectorAll('[data-testid="circle"][data-bg]').length).toBe(3)
    expect(document.querySelectorAll('[data-testid="circle"][data-fg]').length).toBe(3)
  })

  it.each([
    ['component$ icon', CustomIcon],
    ['inline svg icon', InlineSvgIcon],
  ])('resumes SSR state with a %s', async (_name, Fixture) => {
    const { container, document } = await ssrRenderToDom(<Fixture />, { qwikLoader: true })
    const state = document.querySelector('script[type="qwik/state"]')?.textContent
    const rootCount = state ? JSON.parse(state).length / 2 : 0
    const failures: string[] = []
    for (let id = 0; id < rootCount; id++) {
      try {
        container.$getObjectById$(id)
      } catch (error) {
        failures.push(`root ${id}: ${(error as Error).message}`)
      }
    }
    expect(failures).toEqual([])
  })

  it('applies size variant classes', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest size="xl" />, {
      qwikLoader: true,
    })

    expect(getClasses(document, '[data-part="root"]')).toContain('rating-group__root--size_xl')
  })
})
