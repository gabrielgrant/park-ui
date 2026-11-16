import { ScrollArea } from '@ark-ui/qwik/scroll-area'
import { createStyleContext } from 'styled-system/jsx'
import { scrollArea } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

const { withProvider, withContext } = createStyleContext(scrollArea)

export type RootProps = ComponentProps<typeof Root>
export type ContentProps = ComponentProps<typeof Content>

export const Root = withProvider(ScrollArea.Root, 'root')
export const Content = withContext(ScrollArea.Content, 'content')
export const Corner = withContext(ScrollArea.Corner, 'corner')
export const Thumb = withContext(ScrollArea.Thumb, 'thumb')
export const Scrollbar = withContext(ScrollArea.Scrollbar, 'scrollbar', {
  defaultProps: { children: <Thumb /> },
})
export const Viewport = withContext(ScrollArea.Viewport, 'viewport')
