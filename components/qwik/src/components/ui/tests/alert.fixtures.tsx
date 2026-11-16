import * as Alert from '../alert'

export const ComponentUnderTest = () => (
  <Alert.Root status="error" variant="solid" data-testid="root">
    <Alert.Indicator data-testid="indicator" />
    <Alert.Content data-testid="content">
      <Alert.Title data-testid="title">Title</Alert.Title>
      <Alert.Description data-testid="description">Description</Alert.Description>
    </Alert.Content>
  </Alert.Root>
)

export const CustomIndicator = () => (
  <Alert.Root>
    <Alert.Indicator data-testid="custom-indicator">
      <span data-testid="custom-icon">!</span>
    </Alert.Indicator>
    <Alert.Title>Title</Alert.Title>
  </Alert.Root>
)
