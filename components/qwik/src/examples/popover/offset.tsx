import { button } from 'styled-system/recipes'
import { Popover, XIcon } from '@/components/ui'

export const App = () => {
  return (
    <Popover.Root positioning={{ offset: { crossAxis: 0, mainAxis: 0 } }}>
      <Popover.Trigger class={button({ variant: 'outline' })}>Open Popover</Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
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
  )
}
