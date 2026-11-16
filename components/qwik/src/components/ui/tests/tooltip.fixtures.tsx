import { Tooltip, type TooltipProps } from '../tooltip'

export const ComponentUnderTest = (props: Partial<TooltipProps>) => (
  <Tooltip
    content="Tooltip content"
    showArrow
    triggerProps={{ 'data-testid': 'trigger' }}
    contentProps={{ 'data-testid': 'content' }}
    {...props}
  >
    Hover me
  </Tooltip>
)
