import * as ScrollArea from '../scroll-area'

export const ComponentUnderTest = (props: Partial<ScrollArea.RootProps>) => (
  <ScrollArea.Root data-testid="root" height="36" {...props}>
    <ScrollArea.Viewport data-testid="viewport">
      <ScrollArea.Content data-testid="content">
        {Array.from({ length: 50 }, (_, index) => (
          <p key={index}>Row {index}</p>
        ))}
      </ScrollArea.Content>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar data-testid="scrollbar" />
    <ScrollArea.Corner data-testid="corner" />
  </ScrollArea.Root>
)
