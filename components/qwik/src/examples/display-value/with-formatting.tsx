import { Stack } from 'styled-system/jsx'
import { DisplayValue, Span } from '@/components/ui'

export const App = () => {
  return (
    <Stack gap="0">
      <Span>
        <DisplayValue value={new Date()} formatValue={(date) => date.toDateString()} />
      </Span>
      <Span>
        <DisplayValue value={['React', 'Solid']} formatValue={(arr) => arr.join(', ')} />
      </Span>
    </Stack>
  )
}
