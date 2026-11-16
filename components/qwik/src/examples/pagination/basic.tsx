import { button } from 'styled-system/recipes'
import { ButtonGroup, ChevronRightIcon, Pagination } from '@/components/ui'

export const App = () => {
  return (
    <Pagination.Root count={20} pageSize={2} defaultPage={1}>
      <ButtonGroup variant="outline" size="sm">
        <Pagination.PrevTrigger
          class={button({ variant: 'outline', size: 'sm' })}
          colorPalette="gray"
          px="0"
          py="0"
        >
          <ChevronLeftIcon />
        </Pagination.PrevTrigger>
        <Pagination.Items />
        <Pagination.NextTrigger
          class={button({ variant: 'outline', size: 'sm' })}
          colorPalette="gray"
          px="0"
          py="0"
        >
          <ChevronRightIcon />
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  )
}

const ChevronLeftIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    stroke-width={2}
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
)
