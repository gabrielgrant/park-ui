import { loremIpsum } from 'lorem-ipsum'
import { Box } from 'styled-system/jsx'
import { ScrollArea } from '@/components/ui'

export const App = () => {
  return (
    <ScrollArea.Root height="36">
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <Box
            spaceY="3"
            textStyle="sm"
            dangerouslySetInnerHTML={loremIpsum({ count: 10, format: 'html', units: 'paragraphs' })}
          />
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar />
      <ScrollArea.Corner />
    </ScrollArea.Root>
  )
}
