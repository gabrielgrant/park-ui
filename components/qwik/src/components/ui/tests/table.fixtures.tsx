import * as Table from '../table'

export const ComponentUnderTest = () => (
  <Table.Root striped interactive variant="surface" data-testid="root">
    <Table.Caption data-testid="caption">Products</Table.Caption>
    <Table.Head data-testid="head">
      <Table.Row data-testid="row">
        <Table.Header data-testid="header">Product</Table.Header>
      </Table.Row>
    </Table.Head>
    <Table.Body data-testid="body">
      <Table.Row>
        <Table.Cell data-testid="cell">Laptop</Table.Cell>
      </Table.Row>
    </Table.Body>
    <Table.Foot data-testid="foot">
      <Table.Row>
        <Table.Cell>Totals</Table.Cell>
      </Table.Row>
    </Table.Foot>
  </Table.Root>
)
