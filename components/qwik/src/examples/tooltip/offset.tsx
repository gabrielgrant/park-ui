import { button } from 'styled-system/recipes'
import { Tooltip } from '@/components/ui'

export const App = () => {
  return (
    <Tooltip
      content="This is the tooltip content"
      positioning={{ offset: { mainAxis: 24, crossAxis: 24 } }}
      triggerProps={{ class: button({ variant: 'outline', size: 'sm' }) }}
    >
      Hover me
    </Tooltip>
  )
}
