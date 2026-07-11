import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'
import { GroupedButtons, LoadingButton } from './button-fixtures'

describe('Button (styled, SSR)', () => {
  it('propagates group variant props through context', async () => {
    const { document } = await ssrRenderToDom(<GroupedButtons />, { qwikLoader: true })

    const classes = document.querySelector('[data-testid="grouped"]')?.getAttribute('class') ?? ''
    expect(classes).toContain('button--variant_outline')
    expect(classes).toContain('button--size_lg')
  })

  it('renders loading state with spinner, text and disabled', async () => {
    const { document } = await ssrRenderToDom(<LoadingButton />, { qwikLoader: true })

    const buttonEl = document.querySelector('[data-testid="loading"]')
    expect(buttonEl?.hasAttribute('disabled')).toBe(true)
    expect(buttonEl?.hasAttribute('data-loading')).toBe(true)
    expect(buttonEl?.textContent).toContain('Saving…')
    expect(buttonEl?.querySelector('[class*="spinner"]')).toBeTruthy()
  })
})
