import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import {
  ComponentUnderTest,
  SkeletonLoaded,
  SkeletonTextDefault,
  SkeletonTextSingle,
} from './skeleton.fixtures'

describe('Skeleton (styled, SSR)', () => {
  it('applies recipe, variant and circle classes', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    const circle = document.querySelector('[data-testid="circle"]')?.getAttribute('class') ?? ''
    expect(circle).toContain('skeleton--circle_true')
    expect(circle).toContain('skeleton--loading_true')

    const block = document.querySelector('[data-testid="block"]')?.getAttribute('class') ?? ''
    expect(block).toContain('skeleton--variant_shine')
    expect(block).not.toContain('skeleton--circle_true')
  })

  it('renders noOfLines skeleton lines inside a stack', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
    const root = document.querySelector('#text-root')
    const lines = document.querySelectorAll('[data-testid="line"]')
    expect(root).toBeTruthy()
    expect(root?.getAttribute('class')).toContain('gap_3')
    expect(lines).toHaveLength(2)
    expect(lines[0].getAttribute('class')).toContain('skeleton')
    expect(lines[0].getAttribute('class')).toContain('last:max-w_80%')
  })

  it('defaults SkeletonText to 3 lines and uses full width for a single line', async () => {
    const def = await ssrRenderToDom(<SkeletonTextDefault />, { qwikLoader: true })
    expect(def.document.querySelectorAll('[data-testid="default-root"] .skeleton')).toHaveLength(3)

    const single = await ssrRenderToDom(<SkeletonTextSingle />, { qwikLoader: true })
    const lines = single.document.querySelectorAll('[data-testid="single-root"] .skeleton')
    expect(lines).toHaveLength(1)
    expect(lines[0].getAttribute('class')).toContain('max-w_100%')
  })

  it('applies the loading=false variant', async () => {
    const { document } = await ssrRenderToDom(<SkeletonLoaded />, { qwikLoader: true })
    const el = document.querySelector('[data-testid="loaded"]')
    expect(el?.getAttribute('class')).toContain('skeleton--loading_false')
    expect(el?.textContent).toBe('content')
  })
})
