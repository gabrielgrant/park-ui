import { css } from 'styled-system/css'
import { Avatar, Tooltip } from '@/components/ui'

export const App = () => {
  return (
    <Avatar.Root size="lg">
      <Tooltip
        content="Christian Busch is online"
        triggerProps={{ class: css({ width: 'full', height: 'full', borderRadius: 'inherit' }) }}
      >
        <Avatar.Image src="https://shorturl.at/gaV8r" />
        <Avatar.Fallback name="Christian Busch" />
      </Tooltip>
    </Avatar.Root>
  )
}
