import { button } from 'styled-system/recipes'
import { Tooltip } from '@/components/ui'

export const App = () => {
  return (
    <Tooltip
      content="This is the tooltip content"
      interactive
      triggerProps={{ class: button({ variant: 'outline', size: 'sm' }) }}
    >
      Hover me
    </Tooltip>
  )
}
