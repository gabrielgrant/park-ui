import {
  type VirtualItem,
  Virtualizer,
  elementScroll,
  observeElementOffset,
  observeElementRect,
} from '@tanstack/virtual-core'
import { component$, useSignal, useVisibleTask$ } from '@qwik.dev/core'
import { Box, Center } from 'styled-system/jsx'
import { ScrollArea } from '@/components/ui'

export const App = component$(() => {
  const scrollRef = useSignal<HTMLDivElement>()
  const virtualItems = useSignal<VirtualItem[]>([])
  const totalSize = useSignal(0)

  // biome-ignore lint/correctness/noQwikUseVisibleTask: the virtualizer measures the mounted viewport
  useVisibleTask$(({ cleanup }) => {
    const rowVirtualizer = new Virtualizer<HTMLDivElement, Element>({
      count: 200,
      getScrollElement: () => scrollRef.value ?? null,
      estimateSize: () => 40,
      gap: 8,
      scrollToFn: elementScroll,
      observeElementRect,
      observeElementOffset,
      onChange: (instance) => {
        virtualItems.value = instance.getVirtualItems()
        totalSize.value = instance.getTotalSize()
      },
    })
    cleanup(rowVirtualizer._didMount())
    rowVirtualizer._willUpdate()
    virtualItems.value = rowVirtualizer.getVirtualItems()
    totalSize.value = rowVirtualizer.getTotalSize()
  })

  return (
    <ScrollArea.Root height="72">
      <ScrollArea.Viewport ref={scrollRef}>
        <ScrollArea.Content>
          <Box position="relative" width="full" style={{ height: `${totalSize.value}px` }}>
            {virtualItems.value.map((virtualItem) => (
              <Center
                key={virtualItem.key as string}
                bg="gray.subtle.bg"
                position="absolute"
                inset="0"
                style={{
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                Item #{virtualItem.index}
              </Center>
            ))}
          </Box>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
})
