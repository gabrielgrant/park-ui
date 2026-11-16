import { button } from 'styled-system/recipes'
import { Button, Drawer, XIcon } from '@/components/ui'

export const App = () => {
  return (
    <Drawer.Root>
      <Drawer.Trigger class={button()}>Open Drawer</Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.CloseTrigger
            class={button({ variant: 'plain' })}
            colorPalette="gray"
            px="0"
            py="0"
            aria-label="Close"
          >
            <XIcon />
          </Drawer.CloseTrigger>
          <Drawer.Header>
            <Drawer.Title>Title</Drawer.Title>
            <Drawer.Description>Description</Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>{/* Content */}</Drawer.Body>
          <Drawer.Footer gap="3">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  )
}
