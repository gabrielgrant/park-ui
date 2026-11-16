import {
  type VirtualItem,
  Virtualizer,
  elementScroll,
  observeElementOffset,
  observeElementRect,
} from '@tanstack/virtual-core'
import { component$, useSignal, useTask$, useVisibleTask$ } from '@qwik.dev/core'
import { Box, Center } from 'styled-system/jsx'
import { ScrollArea } from '@/components/ui'

export const App = component$(() => {
  const scrollRef = useSignal<HTMLDivElement>()
  const items = useSignal(Array.from({ length: 20 }, (_, i) => `Item #${i + 1}`))
  const isLoading = useSignal(false)
  const virtualItems = useSignal<VirtualItem[]>([])
  const totalSize = useSignal(0)

  const hasMore = items.value.length < 200

  // biome-ignore lint/correctness/noQwikUseVisibleTask: the virtualizer measures the mounted viewport
  useVisibleTask$(({ track, cleanup }) => {
    const count = track(() =>
      items.value.length < 200 ? items.value.length + 1 : items.value.length,
    )

    const rowVirtualizer = new Virtualizer<HTMLDivElement, Element>({
      count,
      getScrollElement: () => scrollRef.value ?? null,
      estimateSize: () => 40,
      overscan: 5,
      gap: 8,
      scrollToFn: elementScroll,
      observeElementRect,
      observeElementOffset,
      initialOffset: () => scrollRef.value?.scrollTop ?? 0,
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

  useTask$(({ track }) => {
    const lastItem = track(() => virtualItems.value.at(-1))
    if (!lastItem || items.value.length >= 200 || isLoading.value) return

    if (lastItem.index >= items.value.length - 1) {
      isLoading.value = true
      setTimeout(() => {
        const prev = items.value
        items.value = [
          ...prev,
          ...Array.from({ length: 20 }, (_, i) => `Item #${prev.length + i + 1}`),
        ]
        isLoading.value = false
      }, 750)
    }
  })

  return (
    <ScrollArea.Root height="72">
      <ScrollArea.Viewport ref={scrollRef}>
        <ScrollArea.Content>
          <Box position="relative" width="full" style={{ height: `${totalSize.value}px` }}>
            {virtualItems.value.map((virtualItem) => {
              const isLoaderRow = virtualItem.index > items.value.length - 1
              const item = items.value[virtualItem.index]

              return (
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
                  {isLoaderRow ? (hasMore ? 'Loading more...' : 'Nothing more to load') : item}
                </Center>
              )
            })}
          </Box>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
})
