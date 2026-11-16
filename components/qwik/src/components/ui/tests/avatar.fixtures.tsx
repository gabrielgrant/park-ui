import * as Avatar from '../avatar'

export const ComponentUnderTest = (props: Avatar.RootProps) => (
  <Avatar.Root {...props}>
    <Avatar.Image data-testid="image" src="https://example.com/avatar.png" alt="Christian Busch" />
    <Avatar.Fallback data-testid="fallback" name="Christian Busch" />
  </Avatar.Root>
)
