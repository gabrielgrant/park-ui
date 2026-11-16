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
const StyledThumbIndicator = styled(ark.span)

const useIndicatorState = () => {
  const api = useSwitchContext()
  const checked = Boolean(api?.checked)
  return {
    stateProps: { 'data-checked': checked ? '' : undefined },
    checkedProps: { hidden: !checked },
    fallbackProps: { hidden: checked },
  }
}

const IndicatorState = component$<ComponentProps<typeof StyledIndicator>>((props) => {
  const { stateProps, checkedProps, fallbackProps } = useIndicatorState()
  return (
    <StyledIndicator {...props} {...stateProps}>
      <styled.span display="contents" {...checkedProps}>
        <Slot />
      </styled.span>
      <styled.span display="contents" {...fallbackProps}>
        <Slot name="fallback" />
      </styled.span>
    </StyledIndicator>
  )
})

const ThumbIndicatorState = component$<ComponentProps<typeof StyledThumbIndicator>>((props) => {
  const { stateProps, checkedProps, fallbackProps } = useIndicatorState()
  return (
    <StyledThumbIndicator {...props} {...stateProps}>
      <styled.span display="contents" {...checkedProps}>
        <Slot />
      </styled.span>
      <styled.span display="contents" {...fallbackProps}>
        <Slot name="fallback" />
      </styled.span>
    </StyledThumbIndicator>
  )
})

export interface IndicatorProps extends ComponentProps<typeof StyledIndicator> {
  fallback?: JSXOutput | undefined
}

export const Indicator = (props: IndicatorProps) => {
  const { fallback, children, ...rest } = props
  return (
    <IndicatorState {...rest}>
      {children}
      <span q:slot="fallback" style={{ display: 'contents' }}>
        {fallback}
      </span>
    </IndicatorState>
  )
}

export interface ThumbIndicatorProps extends ComponentProps<typeof StyledThumbIndicator> {
  fallback?: JSXOutput | undefined
}

export const ThumbIndicator = (props: ThumbIndicatorProps) => {
  const { fallback, children, ...rest } = props
  return (
    <ThumbIndicatorState {...rest}>
      {children}
      <span q:slot="fallback" style={{ display: 'contents' }}>
        {fallback}
      </span>
    </ThumbIndicatorState>
  )
}
