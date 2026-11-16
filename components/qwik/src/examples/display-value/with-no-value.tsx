import { Stack } from 'styled-system/jsx'
import { DisplayValue } from '@/components/ui'

export const App = () => {
  return (
    <Stack gap="0">
      <DisplayValue value={null} />
      <DisplayValue value={undefined} />
      <DisplayValue value="" />
      <DisplayValue value={[]} />
    </Stack>
  )
}
