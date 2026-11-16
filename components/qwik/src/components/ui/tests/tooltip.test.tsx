import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { expect, it } from 'vitest'
import { Button } from '../button'
import { Tooltip } from '../tooltip'

it('exp', async () => {
  const { document } = await ssrRenderToDom(<Tooltip content="Hi"><Button>Hover</Button></Tooltip>, { qwikLoader: true })
  console.log(document.body.innerHTML)
  expect(1).toBe(1)
})
