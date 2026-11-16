import { Wrap } from 'styled-system/jsx'
import { button } from 'styled-system/recipes'
import { Button, Drawer, XIcon } from '@/components/ui'

export const App = () => {
  const placements = ['bottom', 'top', 'start', 'end'] as const
  return (
    <Wrap gap="4">
      {placements.map((placement) => (
        <Drawer.Root key={placement} placement={placement}>
          <Drawer.Trigger class={button({ variant: 'outline' })}>Open ({placement})</Drawer.Trigger>
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
      ))}
    </Wrap>
  )
}
