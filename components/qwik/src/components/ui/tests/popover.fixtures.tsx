import * as Popover from '../popover'

export const ComponentUnderTest = (props: Popover.RootProps) => (
  <Popover.Root {...props}>
    <Popover.Trigger data-testid="trigger">Open Popover</Popover.Trigger>
    <Popover.Positioner data-testid="positioner">
      <Popover.Content data-testid="content">
        <Popover.Arrow data-testid="arrow" />
        <Popover.Header data-testid="header">
          <Popover.Title>Popover Title</Popover.Title>
        </Popover.Header>
        <Popover.Body data-testid="body">
          <Popover.Description>Popover Description</Popover.Description>
        </Popover.Body>
        <Popover.Footer data-testid="footer">Footer</Popover.Footer>
        <Popover.CloseTrigger data-testid="close">Close</Popover.CloseTrigger>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
)
