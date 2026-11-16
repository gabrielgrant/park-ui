import { CloseButton } from '../close-button'
import { CircleXIcon } from '../icons'

export const ComponentUnderTest = () => <CloseButton data-testid="close" />

export const CustomIconCloseButton = () => (
  <CloseButton data-testid="close" aria-label="Dismiss" variant="outline">
    <CircleXIcon data-testid="custom-icon" />
  </CloseButton>
)
