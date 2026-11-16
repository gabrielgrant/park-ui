import { button } from 'styled-system/recipes'
import { Dialog, XIcon } from '@/components/ui'

export const App = () => {
  return (
    <Dialog.Root role="alertdialog">
      <Dialog.Trigger class={button({ variant: 'outline' })}>Open Dialog</Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Are you sure?</Dialog.Title>
            <Dialog.Description>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our systems.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.ActionTrigger class={button({ variant: 'outline' })} colorPalette="gray">
              Cancel
            </Dialog.ActionTrigger>
            <Dialog.ActionTrigger class={button()} colorPalette="red">
              Delete
            </Dialog.ActionTrigger>
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
}
