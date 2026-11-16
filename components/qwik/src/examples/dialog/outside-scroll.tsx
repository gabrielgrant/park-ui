import { loremIpsum } from 'lorem-ipsum'
import { Box } from 'styled-system/jsx'
import { button } from 'styled-system/recipes'
import { Dialog, XIcon } from '@/components/ui'

export const App = () => {
  return (
    <Dialog.Root scrollBehavior="outside">
      <Dialog.Trigger class={button({ variant: 'outline' })}>Open Dialog</Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Title</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body color="fg.muted">
            <Box
              dangerouslySetInnerHTML={loremIpsum({
                count: 10,
                format: 'html',
                units: 'paragraphs',
              })}
            />
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
