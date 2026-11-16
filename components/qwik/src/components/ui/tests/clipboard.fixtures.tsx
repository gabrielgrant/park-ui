import * as Clipboard from '../clipboard'

export const ComponentUnderTest = (props: Clipboard.RootProps) => (
  <Clipboard.Root value="https://park-ui.com" {...props}>
    <Clipboard.Label data-testid="label">Document Link</Clipboard.Label>
    <Clipboard.Control data-testid="control">
      <Clipboard.Input data-testid="input" />
      <Clipboard.Trigger data-testid="trigger">
        <Clipboard.Indicator data-testid="indicator" />
        <Clipboard.CopyText data-testid="copy-text" />
      </Clipboard.Trigger>
    </Clipboard.Control>
  </Clipboard.Root>
)
