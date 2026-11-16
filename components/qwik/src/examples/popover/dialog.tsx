import { button } from 'styled-system/recipes'
import { Dialog, Popover, XIcon } from '@/components/ui'

export const App = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger class={button({ variant: 'outline' })}>Open Dialog</Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger
            class={button({ variant: 'plain' })}
            colorPalette="gray"
            px="0"
            py="0"
            aria-label="Close"
          >
            <XIcon />
          </Dialog.CloseTrigger>
          <Dialog.Header>
            <Dialog.Title>Popover in Dialog</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            This popover is inside a dialog. Click the button below to open the
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.ActionTrigger class={button({ variant: 'outline' })}>
              Close
            </Dialog.ActionTrigger>
            <Popover.Root>
              <Popover.Trigger class={button()}>Open Popover</Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Arrow />
                  <Popover.Body>
                    <Popover.Title>Title</Popover.Title>
                    <Popover.Description>Description</Popover.Description>
                  </Popover.Body>
                  <Popover.CloseTrigger
                    class={button({ variant: 'plain' })}
                    colorPalette="gray"
                    px="0"
                    py="0"
                    aria-label="Close"
                  >
                    <XIcon />
                  </Popover.CloseTrigger>
                </Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
