import { Wrap } from 'styled-system/jsx'
import { button } from 'styled-system/recipes'
import { Menu } from '@/components/ui'

export const App = () => {
  const sizes = ['xs', 'sm', 'md', 'lg'] as const

  return (
    <Wrap gap="4">
      {sizes.map((size) => (
        <Menu.Root key={size} size={size}>
          <Menu.Trigger class={button({ variant: 'outline', size })}>
            File
            <Menu.Indicator />
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="new-file">New File</Menu.Item>
              <Menu.Item value="open-file">Open File</Menu.Item>
              <Menu.Separator />
              <Menu.Item value="save">Save</Menu.Item>
              <Menu.Item value="save-as">Save As</Menu.Item>
              <Menu.Item value="recent-files">Recent Files</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      ))}
    </Wrap>
  )
}
