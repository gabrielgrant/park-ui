import { button } from 'styled-system/recipes'
import { Tooltip } from '@/components/ui'

export const App = () => {
  return (
    <Tooltip
      content="This is the tooltip content"
      closeDelay={0}
      openDelay={0}
      triggerProps={{ class: button({ variant: 'outline', size: 'sm' }) }}
    >
      Delay (open: 0ms, close: 0ms)
    </Tooltip>
  )
}
