import { button } from 'styled-system/recipes'
import { Clipboard } from '@/components/ui'

export const App = () => {
  return (
    <Clipboard.Root value="https://park-ui.com">
      <Clipboard.Trigger class={button({ variant: 'surface', size: 'sm' })}>
        <Clipboard.Indicator />
        <Clipboard.CopyText />
      </Clipboard.Trigger>
    </Clipboard.Root>
  )
}
