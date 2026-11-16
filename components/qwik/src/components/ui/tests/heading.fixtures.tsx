import { Heading } from '../heading'

export const ComponentUnderTest = () => (
  <Heading data-testid="heading">Sphinx of black quartz</Heading>
)

export const HeadingAs = () => (
  <Heading as="h1" textStyle="xl" data-testid="heading-h1">
    Level 1
  </Heading>
)
