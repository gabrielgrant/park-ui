import { button } from 'styled-system/recipes'
import { Button, Field, Input, Popover, Textarea, XIcon } from '@/components/ui'

export const App = () => {
  return (
    <Popover.Root>
      <Popover.Trigger class={button({ variant: 'outline' })}>Open Popover</Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Arrow />
          <Popover.Header>
            <Popover.Title>Report an issue</Popover.Title>
            <Popover.Description>Please fill out the form below.</Popover.Description>
          </Popover.Header>
          <Popover.Body gap="4">
            <Field.Root>
              <Field.Label>Title</Field.Label>
              <Input placeholder="A descriptive title " />
            </Field.Root>
            <Field.Root>
              <Field.Label>Description</Field.Label>
              <Textarea autoresize placeholder="Describe the issue" />
            </Field.Root>
          </Popover.Body>
          <Popover.Footer>
            <Button width="full">Save</Button>
          </Popover.Footer>
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
