import * as Tabs from '../tabs'

export const ComponentUnderTest = (props: Tabs.RootProps) => (
  <Tabs.Root defaultValue="react" {...props}>
    <Tabs.List>
      <Tabs.Trigger value="react">React</Tabs.Trigger>
      <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
      <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
      <Tabs.Indicator />
    </Tabs.List>
    <Tabs.Content value="react">React content</Tabs.Content>
    <Tabs.Content value="solid">Solid content</Tabs.Content>
    <Tabs.Content value="vue">Vue content</Tabs.Content>
  </Tabs.Root>
)
