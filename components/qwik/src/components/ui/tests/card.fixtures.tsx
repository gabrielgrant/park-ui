import * as Card from '../card'

export const ComponentUnderTest = () => (
  <Card.Root variant="elevated" data-testid="root">
    <Card.Header data-testid="header">
      <Card.Title data-testid="title">Title</Card.Title>
      <Card.Description data-testid="description">Description</Card.Description>
    </Card.Header>
    <Card.Body data-testid="body">Body</Card.Body>
    <Card.Footer data-testid="footer">Footer</Card.Footer>
  </Card.Root>
)
