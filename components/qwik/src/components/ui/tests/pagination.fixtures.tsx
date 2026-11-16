import { ChevronRightIcon } from '../icons'
import * as Pagination from '../pagination'

export const ComponentUnderTest = (props: Pagination.RootProps) => (
  <Pagination.Root count={20} pageSize={2} defaultPage={1} {...props}>
    <Pagination.PrevTrigger data-testid="prev-trigger">Previous</Pagination.PrevTrigger>
    <Pagination.Items size="sm" />
    <Pagination.NextTrigger data-testid="next-trigger" aria-label="Next page">
      <ChevronRightIcon />
    </Pagination.NextTrigger>
  </Pagination.Root>
)
