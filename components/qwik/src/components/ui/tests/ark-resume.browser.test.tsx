import { expect, it } from 'vitest'
import { renderSSR } from 'vitest-browser-qwik'
import { ArkOnly } from './ssr-resume-fixtures'

// SKIPPED: renderSSR + the zag adapter's wake *replay* throws Q24 / hangs in
// the vitest harness — ark PLAN.md Part 5 #1 (same skip as ark's own
// checkbox-ssr.browser.test.tsx). The resume-deserialization bug this used to
// catch (R21) is now guarded headlessly by ssr-resume.test.tsx.
it.skip('raw ark checkbox toggles after SSR + resume', async () => {
  const screen = await renderSSR(<ArkOnly />)
  const control = screen.getByTestId('a-control')

  await expect.element(control).toHaveAttribute('data-state', 'unchecked')
  await screen.getByText('ArkOnly').click()
  await expect.element(control).toHaveAttribute('data-state', 'checked')
})
