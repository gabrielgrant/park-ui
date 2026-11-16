import * as Collapsible from '../collapsible'

export const ComponentUnderTest = (props: Collapsible.RootProps) => (
  <Collapsible.Root {...props}>
    <Collapsible.Trigger data-testid="trigger">Toggle</Collapsible.Trigger>
    <Collapsible.Indicator data-testid="indicator">{'>'}</Collapsible.Indicator>
    <Collapsible.Content data-testid="content">Collapsible content</Collapsible.Content>
  </Collapsible.Root>
)
