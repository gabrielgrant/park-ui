import { Tooltip as ArkTooltip } from '@ark-ui/qwik/tooltip'
import type { JSXOutput } from '@qwik.dev/core'
import { createStyleContext } from 'styled-system/jsx'
import { tooltip } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

const { withRootProvider, withContext } = createStyleContext(tooltip)

type RootProps = ComponentProps<typeof Root>
type ContentProps = ComponentProps<typeof Content>
type TriggerProps = ComponentProps<typeof Trigger>
const Root = withRootProvider(ArkTooltip.Root, {
  defaultProps: { unmountOnExit: true, lazyMount: true },
})
const Arrow = withContext(ArkTooltip.Arrow, 'arrow')
const ArrowTip = withContext(ArkTooltip.ArrowTip, 'arrowTip')
const Content = withContext(ArkTooltip.Content, 'content')
const Positioner = withContext(ArkTooltip.Positioner, 'positioner')
const Trigger = withContext(ArkTooltip.Trigger, 'trigger')

export interface TooltipProps extends Omit<RootProps, 'content' | 'children'> {
  showArrow?: boolean
  children?: JSXOutput
  content: JSXOutput
  contentProps?: ContentProps
  triggerProps?: TriggerProps
  disabled?: boolean
}

export const Tooltip = (props: TooltipProps) => {
  const { showArrow, children, disabled, content, contentProps, triggerProps, ...rootProps } = props

  if (disabled) return <>{children}</>

  return (
    <Root {...rootProps}>
      <Trigger {...triggerProps}>{children}</Trigger>
      <Positioner>
        <Content {...contentProps}>
          {showArrow && (
            <Arrow>
              <ArrowTip />
            </Arrow>
          )}
          {content}
        </Content>
      </Positioner>
    </Root>
  )
}
