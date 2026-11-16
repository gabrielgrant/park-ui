import { button } from 'styled-system/recipes'
import { Tooltip } from '@/components/ui'

export const App = () => {
  return (
    <Tooltip
      showArrow
      content="This is the tooltip content"
      contentProps={{
        style: {
          '--tooltip-bg': 'tomato',
        },
      }}
      triggerProps={{ class: button({ variant: 'outline', size: 'sm' }) }}
    >
      Hover me
    </Tooltip>
  )
}
