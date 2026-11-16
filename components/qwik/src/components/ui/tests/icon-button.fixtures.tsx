import { IconButton } from '../icon-button'
import { StarIcon } from '../icons'

export const ComponentUnderTest = () => (
  <IconButton aria-label="Favorite" data-testid="icon-button">
    <StarIcon />
  </IconButton>
)

export const SizedIconButton = () => (
  <IconButton aria-label="Favorite" size="lg" variant="outline" data-testid="icon-button">
    <StarIcon />
  </IconButton>
)
