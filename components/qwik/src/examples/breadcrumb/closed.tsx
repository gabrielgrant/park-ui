import { Fragment, type JSXOutput } from '@qwik.dev/core'
import { Breadcrumb as StyledBreadcrumb } from '@/components/ui'

export interface BreadcrumbProps extends StyledBreadcrumb.RootProps {
  items: Array<{ title: JSXOutput; url?: string }>
}

export const Breadcrumb = (props: BreadcrumbProps) => {
  const { items, ...rest } = props

  return (
    <StyledBreadcrumb.Root {...rest}>
      <StyledBreadcrumb.List>
        {items.map((item, index) => {
          const last = index === items.length - 1

          if (last) {
            return <StyledBreadcrumb.Item key={index}>{item.title}</StyledBreadcrumb.Item>
          }

          return (
            <Fragment key={index}>
              <StyledBreadcrumb.Item>
                {item.url ? (
                  <StyledBreadcrumb.Link href={item.url}>{item.title}</StyledBreadcrumb.Link>
                ) : (
                  item.title
                )}
              </StyledBreadcrumb.Item>
              <StyledBreadcrumb.Separator />
            </Fragment>
          )
        })}
      </StyledBreadcrumb.List>
    </StyledBreadcrumb.Root>
  )
}
