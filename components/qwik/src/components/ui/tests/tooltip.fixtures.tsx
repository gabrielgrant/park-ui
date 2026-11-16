import { Tooltip, type TooltipProps } from '../tooltip'

export const ComponentUnderTest = (props: Partial<TooltipProps>) => (
  <Tooltip
    content="Tooltip content"
    showArrow
    triggerProps={{ 'data-testid': 'trigger' } as TooltipProps['triggerProps']}
    contentProps={{ 'data-testid': 'content' } as TooltipProps['contentProps']}
    {...props}
  >
    Hover me
  </Tooltip>
)
