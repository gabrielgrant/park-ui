import { Breadcrumb } from '@/components/ui'

export const App = () => {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>/</Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
          <DotIcon />
        </Breadcrumb.Separator>
        <Breadcrumb.Item>Breadcrumbs</Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
}

const DotIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <circle cx="12.1" cy="12.1" r="1" />
  </svg>
)
