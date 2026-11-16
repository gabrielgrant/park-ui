import { expect, it } from 'vitest'
import { renderSSR } from 'vitest-browser-qwik'
import { StyleOnly } from './ssr-resume-fixtures'

// The panda style layer survives SSR + resume: slot classes computed on the
// server are present, and the style context deserializes without errors.
// One renderSSR per file: a second SSR container in the same document trips
// Q24 under @qwik.dev/core rc.4.
it('style context over plain elements survives SSR + resume', async () => {
  const screen = await renderSSR(<StyleOnly />)

  await expect.element(screen.getByTestId('b-root')).toHaveClass('checkbox__root--size_sm')
  await expect.element(screen.getByTestId('b-label')).toHaveClass('checkbox__label')
})
