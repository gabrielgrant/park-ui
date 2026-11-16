import { Badge } from '../badge'
import { StarIcon } from '../icons'

export const ComponentUnderTest = () => (
  <Badge variant="solid" size="lg" colorPalette="green" data-testid="badge">
    <StarIcon /> New
  </Badge>
)
