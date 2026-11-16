import { button } from 'styled-system/recipes'
import { Dialog, Field, Input, XIcon } from '@/components/ui'

export const App = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger class={button({ variant: 'outline' })}>Open Dialog</Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Title</Dialog.Title>
            <Dialog.Description>Description</Dialog.Description>
          </Dialog.Header>
          <Dialog.Body gap="4">
            <Field.Root>
              <Field.Label>First Name</Field.Label>
              <Input placeholder="First Name" />
            </Field.Root>
            <Field.Root>
              <Field.Label>Last Name</Field.Label>
              <Input data-autofocus placeholder="Last Name" />
            </Field.Root>
          </Dialog.Body>
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
}
