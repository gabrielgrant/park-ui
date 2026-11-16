import { ssrRenderToDom } from '@qwik.dev/core/testing'
import { it } from 'vitest'
import { Avatar, Menu } from '@/components/ui'

it('a: trigger inside avatar, no positioner', async () => {
  await ssrRenderToDom(
    <Menu.Root>
      <Avatar.Root size="lg">
        <Menu.Trigger>
          <Avatar.Fallback name="Christian Busch" />
        </Menu.Trigger>
      </Avatar.Root>
    </Menu.Root>,
    { qwikLoader: true },
  )
})
it('b: avatar inside trigger', async () => {
  await ssrRenderToDom(
    <Menu.Root>
      <Menu.Trigger>
        <Avatar.Root size="lg">
          <Avatar.Fallback name="Christian Busch" />
        </Avatar.Root>
      </Menu.Trigger>
    </Menu.Root>,
    { qwikLoader: true },
  )
})
it('c: avatar inside span', async () => {
  await ssrRenderToDom(
    <button type="button">
      <Avatar.Root size="lg">
        <Avatar.Fallback name="Christian Busch" />
      </Avatar.Root>
    </button>,
    { qwikLoader: true },
  )
})
