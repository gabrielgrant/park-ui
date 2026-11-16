import * as Drawer from '../drawer'

export const ComponentUnderTest = (props: Drawer.RootProps) => (
  <Drawer.Root {...props}>
    <Drawer.Trigger data-testid="trigger">Open Drawer</Drawer.Trigger>
    <Drawer.Backdrop data-testid="backdrop" />
    <Drawer.Positioner data-testid="positioner">
      <Drawer.Content data-testid="content">
        <Drawer.CloseTrigger data-testid="close">Close</Drawer.CloseTrigger>
        <Drawer.Header data-testid="header">
          <Drawer.Title>Drawer Title</Drawer.Title>
          <Drawer.Description>Drawer Description</Drawer.Description>
        </Drawer.Header>
        <Drawer.Body data-testid="body">Body</Drawer.Body>
        <Drawer.Footer data-testid="footer">Footer</Drawer.Footer>
      </Drawer.Content>
    </Drawer.Positioner>
  </Drawer.Root>
)
