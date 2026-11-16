/// <reference types="vite/client" />
import type { Component } from '@qwik.dev/core'
import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { expect, it } from 'vitest'

const modules = import.meta.glob<{ App?: Component }>(
  '../../../examples/{menu,select,combobox,tags-input,pagination,avatar,clipboard}/*.tsx',
  { eager: true },
)

it.each(Object.entries(modules))('%s', async (_path, mod) => {
  const App = mod.App as Component
  expect(App).toBeTruthy()
  const { container, document } = await ssrRenderToDom(<App />, { qwikLoader: true })
  const state = document.querySelector('script[type="qwik/state"]')?.textContent
  const rootCount = state ? JSON.parse(state).length / 2 : 0
  for (let id = 0; id < rootCount; id++) container.$getObjectById$(id)
})
