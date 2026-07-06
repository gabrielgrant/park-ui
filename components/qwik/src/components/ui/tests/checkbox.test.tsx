import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import * as Checkbox from '../checkbox'
import { ComponentUnderTest } from './basic'

/**
 * Headless SSR checks for the PC1/PC3 contract (see PLAN.md Part 2.1):
 * recipe classes on every slot, variant recompute, unstyled, class merge.
 * Interaction (PC2/PC4) is covered by the browser suite and e2e script.
 */
const render = async (jsx: unknown) => {
  const { document } = await ssrRenderToDom(jsx, { qwikLoader: true })
  return document as Document
}

const classOf = (document: Document, testid: string) =>
  document.querySelector(`[data-testid="${testid}"]`)?.getAttribute('class') ?? ''

describe('Checkbox (styled)', () => {
  it('renders recipe classes on every slot', async () => {
    const document = await render(<ComponentUnderTest data-testid="root" />)

    expect(classOf(document, 'root')).toContain('checkbox__root')
    expect(classOf(document, 'label')).toContain('checkbox__label')
    expect(classOf(document, 'control')).toContain('checkbox__control')
    // Indicator is a plain component$ + styled.svg (no slot class), like react/solid
    expect(classOf(document, 'indicator')).toContain('fill_none')
  })

  it('variant props change the class set on all slots', async () => {
    const document = await render(<ComponentUnderTest data-testid="root" size="lg" />)

    expect(classOf(document, 'root')).toContain('checkbox__root--size_lg')
    expect(classOf(document, 'label')).toContain('checkbox__label--size_lg')
    expect(classOf(document, 'control')).toContain('checkbox__control--size_lg')
  })

  it('unstyled removes recipe classes, user class merges', async () => {
    const document = await render(
      <Checkbox.Root data-testid="root">
        <Checkbox.Label data-testid="label" unstyled class="bare">
          Checkbox
        </Checkbox.Label>
      </Checkbox.Root>,
    )

    expect(classOf(document, 'label')).not.toContain('checkbox__label')
    expect(classOf(document, 'label')).toContain('bare')
  })

  it('user class merges after the recipe classes', async () => {
    const document = await render(<ComponentUnderTest data-testid="root" class="custom" />)

    const cls = classOf(document, 'root')
    expect(cls).toContain('checkbox__root')
    expect(cls.indexOf('checkbox__root')).toBeLessThan(cls.indexOf('custom'))
  })

  it('reflects the initial data-state on parts', async () => {
    const document = await render(<ComponentUnderTest data-testid="root" />)

    expect(document.querySelector('[data-testid="control"]')?.getAttribute('data-state')).toBe('unchecked')
  })

  it('reflects a controlled checked prop through SSR', async () => {
    const document = await render(<ComponentUnderTest data-testid="root" checked />)

    expect(document.querySelector('[data-testid="control"]')?.getAttribute('data-state')).toBe('checked')
  })
})
