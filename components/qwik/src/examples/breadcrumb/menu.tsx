import { button } from 'styled-system/recipes'
import { Breadcrumb, EllipsisIcon, Menu } from '@/components/ui'

export const App = () => {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <BreadcrumbMenu
            items={[
              { label: 'Overview', value: 'overview' },
              { label: 'Styling', value: 'Styling' },
              { label: 'Theming', value: 'theming' },
            ]}
          />
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>Breadcrumb</Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
}

interface BreadcrumbMenuItemProps {
  items: Array<{ label: string; value: string }>
}

const BreadcrumbMenu = (props: BreadcrumbMenuItemProps) => {
  return (
    <Menu.Root size="sm">
      <Menu.Trigger
        class={button({ size: 'xs', variant: 'plain' })}
        px="0"
        py="0"
        h="1lh"
        colorPalette="gray"
      >
        <EllipsisIcon />
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          {props.items.map((item) => (
            <Menu.Item key={item.value} value={item.value}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}
