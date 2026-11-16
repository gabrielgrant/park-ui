import { Text } from '../text'

export const ComponentUnderTest = () => <Text data-testid="text">Sphinx of black quartz</Text>

export const TextAs = () => (
  <Text as="span" truncate data-testid="text-span">
    Inline
  </Text>
)
