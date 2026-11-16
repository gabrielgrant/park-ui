import { Pagination, usePaginationContext } from '@ark-ui/qwik/pagination'
import { type JSXOutput, component$ } from '@qwik.dev/core'
import { createStyleContext } from 'styled-system/jsx'
import { pagination } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'
import { IconButton, type IconButtonProps } from './icon-button'
import { EllipsisIcon } from './icons'

const { withProvider, withContext } = createStyleContext(pagination)

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider(Pagination.Root, 'root')
export const Item = withContext(Pagination.Item, 'item')
export const Ellipsis = withContext(Pagination.Ellipsis, 'ellipsis')
export const PrevTrigger = withContext(Pagination.PrevTrigger, 'prevTrigger')
export const NextTrigger = withContext(Pagination.NextTrigger, 'nextTrigger')

export type { PaginationPageChangeDetails as PageChangeDetails } from '@ark-ui/qwik/pagination'

export interface PaginationItemsProps extends Omit<IconButtonProps, 'as' | 'type' | 'value'> {
  ellipsis?: JSXOutput
}

export const Items = component$<PaginationItemsProps>((props) => {
  const { ellipsis, ...rest } = props
  const api = usePaginationContext()

  return (
    <>
      {api?.pages.map((page, index) => {
        if (page.type === 'ellipsis') {
          return (
            <Ellipsis key={`ellipsis-${index}`} index={index}>
              {ellipsis ?? (
                <IconButton as="span" colorPalette="gray">
                  <EllipsisIcon />
                </IconButton>
              )}
            </Ellipsis>
          )
        }

        const pageProps = {
          as: Pagination.Item,
          type: 'page',
          value: page.value,
          ...rest,
          ...(api.page === page.value ? { variant: 'solid' } : { variant: 'outline', colorPalette: 'gray' }),
        } as IconButtonProps

        return (
          <IconButton key={page.value} {...pageProps}>
            {page.value}
          </IconButton>
        )
      })}
    </>
  )
})
