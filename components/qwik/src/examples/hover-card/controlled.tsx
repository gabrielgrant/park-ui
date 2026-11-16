import { $, component$, useSignal } from '@qwik.dev/core'
import { HStack, Stack } from 'styled-system/jsx'
import { link } from 'styled-system/recipes'
import { Avatar, HoverCard, Icon, Text } from '@/components/ui'

export const App = component$(() => {
  const open = useSignal(false)

  return (
    <HoverCard.Root
      open={open.value}
      onOpenChange$={$((e) => {
        open.value = e.open
      })}
    >
      <HoverCard.Trigger class={link()}>@grizzly_codes</HoverCard.Trigger>
      <HoverCard.Positioner>
        <HoverCard.Content>
          <HoverCard.Arrow>
            <HoverCard.ArrowTip />
          </HoverCard.Arrow>
          <Stack gap="4" direction="row">
            <Avatar.Root size="lg">
              <Avatar.Image src="https://avatars.githubusercontent.com/u/1846056?v=4" />
              <Avatar.Fallback name="Christian Busch" />
            </Avatar.Root>
            <Stack gap="3">
              <Stack gap="1">
                <Text fontWeight="semibold">@grizzly_codes</Text>
                <Text color="fg.muted">Principal Software Engineer working at Pyck.ai</Text>
              </Stack>
              <HStack gap="1" color="fg.subtle">
                <Icon size="sm">
                  <MapPinIcon />
                </Icon>
                <Text textStyle="xs">Joined Oktober 2025</Text>
              </HStack>
            </Stack>
          </Stack>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard.Root>
  )
})

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)
