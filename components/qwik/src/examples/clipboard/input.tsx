import { button, input } from 'styled-system/recipes'
import { Clipboard, InputGroup } from '@/components/ui'

export const App = () => {
  return (
    <Clipboard.Root value="https://park-ui.com">
      <Clipboard.Label textStyle="label">Document Link</Clipboard.Label>
      <InputGroup endElement={<ClipboardIconButton />}>
        <Clipboard.Input class={input()} />
      </InputGroup>
    </Clipboard.Root>
  )
}

const ClipboardIconButton = () => {
  return (
    <Clipboard.Trigger class={button({ variant: 'surface', size: 'xs' })} px="0" py="0" me="-2">
      <Clipboard.Indicator />
    </Clipboard.Trigger>
  )
}
