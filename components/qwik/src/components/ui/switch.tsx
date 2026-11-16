import { ark } from '@ark-ui/qwik/factory'
import { Switch, useSwitchContext } from '@ark-ui/qwik/switch'
import { type JSXOutput, Slot, component$ } from '@qwik.dev/core'
import { createStyleContext, styled } from 'styled-system/jsx'
import { switchRecipe } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

const { withProvider, withContext } = createStyleContext(switchRecipe)

export type RootProps = ComponentProps<typeof Root>
export type HiddenInputProps = ComponentProps<typeof HiddenInput>
export const Root = withProvider(Switch.Root, 'root')
export const Label = withContext(Switch.Label, 'label')
export const Thumb = withContext(Switch.Thumb, 'thumb')
export const HiddenInput = Switch.HiddenInput

const StyledControl = withContext(Switch.Control, 'control')
export type ControlProps = ComponentProps<typeof StyledControl>
export const Control = (props: ControlProps) => {
  const { children, ...rest } = props
  return <StyledControl {...rest}>{children ?? <Thumb />}</StyledControl>
}

export type { SwitchCheckedChangeDetails as CheckedChangeDetails } from '@ark-ui/qwik/switch'

const StyledIndicator = withContext(ark.span, 'indicator')
export interface IndicatorProps extends ComponentProps<typeof StyledIndicator> {
  fallback?: JSXOutput | undefined
}

export const Indicator = component$<IndicatorProps>((props) => {
  const { fallback, ...rest } = props
  const api = useSwitchContext()
  const checked = Boolean(api?.checked)
  const stateProps = { 'data-checked': checked ? '' : undefined }
  const childrenProps = { hidden: !checked }

  return (
    <StyledIndicator {...rest} {...stateProps}>
      <styled.span display="contents" {...childrenProps}>
        <Slot />
      </styled.span>
      {!checked && fallback}
    </StyledIndicator>
  )
})

const StyledThumbIndicator = styled(ark.span)
export interface ThumbIndicatorProps extends ComponentProps<typeof StyledThumbIndicator> {
  fallback?: JSXOutput | undefined
}

export const ThumbIndicator = component$<ThumbIndicatorProps>((props) => {
  const { fallback, ...rest } = props
  const api = useSwitchContext()
  const checked = Boolean(api?.checked)
  const stateProps = { 'data-checked': checked ? '' : undefined }
  const childrenProps = { hidden: !checked }

  return (
    <StyledThumbIndicator {...rest} {...stateProps}>
      <styled.span display="contents" {...childrenProps}>
        <Slot />
      </styled.span>
      {!checked && fallback}
    </StyledThumbIndicator>
  )
})
