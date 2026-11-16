import * as Dialog from '../dialog'

export const ComponentUnderTest = (props: Dialog.RootProps) => (
  <Dialog.Root {...props}>
    <Dialog.Trigger data-testid="trigger">Open Dialog</Dialog.Trigger>
    <Dialog.Backdrop data-testid="backdrop" />
    <Dialog.Positioner data-testid="positioner">
      <Dialog.Content data-testid="content">
        <Dialog.Header data-testid="header">
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>Dialog Description</Dialog.Description>
        </Dialog.Header>
        <Dialog.Body data-testid="body">Body</Dialog.Body>
        <Dialog.Footer data-testid="footer">
          <Dialog.ActionTrigger data-testid="action">Cancel</Dialog.ActionTrigger>
        </Dialog.Footer>
        <Dialog.CloseTrigger data-testid="close">Close</Dialog.CloseTrigger>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
)
