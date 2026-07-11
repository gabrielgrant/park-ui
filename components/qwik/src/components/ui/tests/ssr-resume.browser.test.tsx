import { expect, it } from 'vitest'
import { renderSSR } from 'vitest-browser-qwik'
import { ArkOnly, StyleOnly } from './ssr-resume-fixtures'

// The panda style layer survives SSR + resume: slot classes computed on the
// server are present, and the style context deserializes without errors.
it('style context over plain elements survives SSR + resume', async () => {
  const screen = await renderSSR(<StyleOnly />)

  await expect.element(screen.getByTestId('b-root')).toHaveClass('checkbox__root--size_sm')
  await expect.element(screen.getByTestId('b-label')).toHaveClass('checkbox__label')
})

// KNOWN UPSTREAM BUG (ark/zag layer, zero panda involvement): machine
// interaction after SSR + resume fails — the zag qwik adapter's wake path
// crashes during state deserialization (`isSerializableObject` TypeError in
// @qwik.dev/core inflate) and the machine never re-renders its parts.
// Reproduced in the ark repo's own harness with this same test shape.
// SKIPPED (not it.fails) because the crashed Qwik container's error loop
// wedges the vitest runner and poisons subsequent test files. Un-skip when
// the upstream fix lands. See components/qwik/PLAN.md Part 7 decision log.
it.skip('KNOWN BUG: raw ark checkbox toggles after SSR + resume', async () => {
  const screen = await renderSSR(<ArkOnly />)
  const control = screen.getByTestId('a-control')

  await expect.element(control).toHaveAttribute('data-state', 'unchecked')
  await screen.getByText('ArkOnly').click()
  await expect.element(control, { timeout: 2000 }).toHaveAttribute('data-state', 'checked')
})
