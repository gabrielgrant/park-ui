import { $, component$, useSignal } from '@qwik.dev/core'
import { button } from 'styled-system/recipes'
import { Dialog, XIcon } from '@/components/ui'

export const App = component$(() => {
  const open = useSignal(false)

  return (
    <Dialog.Root
      open={open.value}
      onOpenChange$={$((e) => {
        open.value = e.open
      })}
    >
      <Dialog.Trigger class={button({ variant: 'outline' })}>Open Dialog</Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Title</Dialog.Title>
            <Dialog.Description>Description</Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>{/* Content */}</Dialog.Body>
          <Dialog.Footer>
            <Dialog.ActionTrigger class={button({ variant: 'outline' })}>
              Cancel
            </Dialog.ActionTrigger>
            <Dialog.ActionTrigger class={button()}>Save</Dialog.ActionTrigger>
          </Dialog.Footer>
          <Dialog.CloseTrigger
            class={button({ variant: 'plain' })}
            colorPalette="gray"
            px="0"
            py="0"
            aria-label="Close"
          >
            <XIcon />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
})
