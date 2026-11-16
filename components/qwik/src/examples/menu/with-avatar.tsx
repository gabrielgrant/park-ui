import { Avatar, Menu, UserIcon } from '@/components/ui'

export const App = () => {
  return (
    <Menu.Root positioning={{ placement: 'right-end' }}>
      <Avatar.Root size="lg">
        <Menu.Trigger rounded="full" width="full" height="full">
          <Avatar.Image src="https://avatars.githubusercontent.com/u/1846056?v=4" />
          <Avatar.Fallback name="Christian Busch" />
        </Menu.Trigger>
      </Avatar.Root>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="account">
            <UserIcon />
            Account
          </Menu.Item>
          <Menu.Item value="settings">
            <Settings2Icon />
            Settings
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item value="logout">
            <LogOutIcon />
            Logout
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}

const svgProps = {
  viewBox: '0 0 24 24',
  width: 24,
  height: 24,
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 2,
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
} as const

const Settings2Icon = () => (
  <svg aria-hidden="true" {...svgProps}>
    <path d="M20 7h-9" />
    <path d="M14 17H5" />
    <circle cx="17" cy="17" r="3" />
    <circle cx="7" cy="7" r="3" />
  </svg>
)

const LogOutIcon = () => (
  <svg aria-hidden="true" {...svgProps}>
    <path d="m16 17 5-5-5-5" />
    <path d="M21 12H9" />
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
  </svg>
)
