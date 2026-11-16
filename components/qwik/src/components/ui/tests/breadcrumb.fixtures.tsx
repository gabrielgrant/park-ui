import * as Breadcrumb from '../breadcrumb'

export const ComponentUnderTest = () => (
  <Breadcrumb.Root variant="underline" size="sm" data-testid="root">
    <Breadcrumb.List data-testid="list">
      <Breadcrumb.Item data-testid="item">
        <Breadcrumb.Link href="#" data-testid="link">
          Docs
        </Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator data-testid="separator" />
      <Breadcrumb.Ellipsis data-testid="ellipsis" />
      <Breadcrumb.Separator data-testid="custom-separator">/</Breadcrumb.Separator>
      <Breadcrumb.Item>Breadcrumbs</Breadcrumb.Item>
    </Breadcrumb.List>
  </Breadcrumb.Root>
)
