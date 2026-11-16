import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import * as Avatar from '../avatar'
import { ComponentUnderTest } from './avatar.fixtures'

const getClasses = (document: Document, selector: string) =>
  (document.querySelector(selector)?.getAttribute('class') ?? '').split(/\s+/)

describe('Avatar (styled, SSR)', () => {
  it('applies recipe slot classes to every part', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(getClasses(document, '[data-scope="avatar"][data-part="root"]')).toContain(
      'avatar__root',
    )
    expect(getClasses(document, '[data-testid="image"]')).toContain('avatar__image')
    expect(getClasses(document, '[data-testid="fallback"]')).toContain('avatar__fallback')
  })

  it('applies default and explicit variant classes', async () => {
    const defaults = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    const root = '[data-scope="avatar"][data-part="root"]'
    expect(getClasses(defaults.document, root)).toContain('avatar__root--size_md')

    const custom = await ssrRenderToDom(
      <ComponentUnderTest size="lg" variant="outline" shape="square" />,
      {
        qwikLoader: true,
      },
    )
    expect(getClasses(custom.document, root)).toContain('avatar__root--size_lg')
    expect(getClasses(custom.document, root)).toContain('avatar__root--variant_outline')
    expect(getClasses(custom.document, root)).toContain('avatar__root--shape_square')
  })

  it('sets image defaults', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    const image = document.querySelector('[data-testid="image"]')

    expect(image?.getAttribute('draggable')).toBe('false')
    expect(image?.getAttribute('referrerpolicy')).toBe('no-referrer')
  })

  it('derives initials from the name', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    expect(document.querySelector('[data-testid="fallback"]')?.textContent).toBe('CB')
  })

  it('renders the user icon without a name and children when given', async () => {
    const { document } = await ssrRenderToDom(
      <>
        <Avatar.Root>
          <Avatar.Fallback data-testid="icon-fallback" />
        </Avatar.Root>
        <Avatar.Root>
          <Avatar.Fallback data-testid="children-fallback" name="Ignored Name">
            +3
          </Avatar.Fallback>
        </Avatar.Root>
      </>,
      { qwikLoader: true },
    )

    expect(document.querySelector('[data-testid="icon-fallback"] svg')).toBeTruthy()
    expect(document.querySelector('[data-testid="children-fallback"]')?.textContent).toBe('+3')
  })
})
