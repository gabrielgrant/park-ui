import { component$, useSignal } from '@qwik.dev/core'
import { Stack } from 'styled-system/jsx'
import { Button, Skeleton, Text } from '@/components/ui'

export const App = component$(() => {
  const loading = useSignal(true)

  return (
    <Stack align="flex-start" gap="4">
      <Skeleton loading={loading.value}>
        <Text>Park UI rocks 🚀</Text>
      </Skeleton>
      <Button
        variant="surface"
        onClick$={() => {
          loading.value = !loading.value
        }}
      >
        Toggle
      </Button>
    </Stack>
  )
})
