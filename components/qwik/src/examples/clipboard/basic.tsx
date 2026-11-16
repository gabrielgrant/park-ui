import { button } from 'styled-system/recipes'
import { Clipboard } from '@/components/ui'

export const App = () => {
  return (
    <Clipboard.Root value="https://park-ui.com">
      <Clipboard.Trigger class={button({ variant: 'surface', size: 'sm' })} px="0" py="0">
        <Clipboard.Indicator />
      </Clipboard.Trigger>
    </Clipboard.Root>
  )
}
