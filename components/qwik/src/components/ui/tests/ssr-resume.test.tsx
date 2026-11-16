/// <reference types="vite/client" />
import type { Component } from '@qwik.dev/core'
import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { describe, expect, it } from 'vitest'

// Every value a styled component leaves in SSR state must deserialize when the
// client resumes; a failure means it renders on the server but never wakes.
// Uses the same path the browser runs on resume (DomContainer.$getObjectById$).
// Mirrors ark's src/tests/ssr-resume.test.tsx (ark PLAN.md R21).
const fixtures = import.meta.glob<{ ComponentUnderTest?: Component }>('./*.fixtures.tsx', { eager: true })

const cases = Object.entries(fixtures)
  .filter(([, mod]) => mod.ComponentUnderTest)
  .map(([path, mod]) => [path.replace('./', '').replace('.fixtures.tsx', ''), mod.ComponentUnderTest as Component] as const)

describe('SSR state resumes', () => {
  it('finds component fixtures', () => {
    expect(cases.length).toBeGreaterThan(0)
  })

  it.each(cases)('%s', async (_name, ComponentUnderTest) => {
    const { container, document } = await ssrRenderToDom(<ComponentUnderTest />, { qwikLoader: true })
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
})
