import { ark } from '@ark-ui/qwik/factory'
import { createStyleContext } from 'styled-system/jsx'
import { alert } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'
import { InfoIcon } from './icons'

const { withProvider, withContext } = createStyleContext(alert)

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider(ark.div, 'root')
export const Title = withContext(ark.h3, 'title')
export const Description = withContext(ark.div, 'description')
export const Content = withContext(ark.div, 'content')

type IndicatorProps = ComponentProps<typeof StyledIndicator>
const StyledIndicator = withContext(ark.span, 'indicator')

export const Indicator = (props: IndicatorProps) => {
  const { children, ...rest } = props
  return <StyledIndicator {...rest}>{children ?? <InfoIcon />}</StyledIndicator>
}
