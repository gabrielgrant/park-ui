import type { JSXChildren, JSXOutput } from '@qwik.dev/core'
import * as StyledAlert from '@/components/ui/alert'

export interface AlertProps extends Omit<StyledAlert.RootProps, 'title'> {
  startElement?: JSXOutput
  endElement?: JSXOutput
  title?: JSXOutput
  icon?: JSXOutput
  children?: JSXChildren
}

export const Alert = (props: AlertProps) => {
  const { title, children, icon, startElement, endElement, ...rest } = props

  return (
    <StyledAlert.Root {...rest}>
      {startElement || <StyledAlert.Indicator>{icon}</StyledAlert.Indicator>}
      {children ? (
        <StyledAlert.Content>
          <StyledAlert.Title>{title}</StyledAlert.Title>
          <StyledAlert.Description>{children}</StyledAlert.Description>
        </StyledAlert.Content>
      ) : (
        <StyledAlert.Title flex="1">{title}</StyledAlert.Title>
      )}
      {endElement}
    </StyledAlert.Root>
  )
}
