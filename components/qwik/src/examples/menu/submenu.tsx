import { button } from 'styled-system/recipes'
import { ChevronRightIcon, Menu } from '@/components/ui'

export const App = () => {
  return (
    <Menu.Root>
      <Menu.Trigger class={button({ variant: 'outline' })} colorPalette="gray">
        Tools
        <Menu.Indicator />
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="find-files">Find Files</Menu.Item>
          <Menu.Item value="search-replace">Search & Replace</Menu.Item>
          <Menu.Item value="compare-files">Compare Files</Menu.Item>
          <Menu.Root>
            <Menu.TriggerItem justifyContent="space-between">
              Git
              <ChevronRightIcon />
            </Menu.TriggerItem>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="git-status">Status</Menu.Item>
                <Menu.Item value="git-commit">Commit Changes</Menu.Item>
                <Menu.Item value="git-history">View History</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
          <Menu.Item value="terminal">Open Terminal</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}
