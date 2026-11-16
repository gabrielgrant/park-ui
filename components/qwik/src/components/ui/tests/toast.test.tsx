import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { ComponentUnderTest } from './toast.fixtures'

describe('Toaster (styled, SSR)', () => {
  it('renders the empty toast group with the park-ui placement', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const group = document.querySelector('[data-scope="toast"][data-part="group"]')
    expect(group).toBeTruthy()
    expect(group?.getAttribute('data-placement')).toBe('bottom-end')
    expect(document.querySelector('[data-part="root"]')).toBeFalsy()
  })

  it('applies style props to the group', async () => {
    const { document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })

    const group = document.querySelector('[data-scope="toast"][data-part="group"]')
    expect(group?.getAttribute('class')).toMatch(/inset-x_4/)
  })
})
