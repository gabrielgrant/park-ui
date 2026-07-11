import { Checkbox } from '@ark-ui/qwik/checkbox'
import { createStyleContext, styled } from 'styled-system/jsx'
import { checkbox } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'

const { withProvider, withContext } = createStyleContext(checkbox)

export type RootProps = ComponentProps<typeof Root>
export type HiddenInputProps = ComponentProps<typeof HiddenInput>

export const Root = withProvider(Checkbox.Root, 'root')
export const Control = withContext(Checkbox.Control, 'control')
export const Label = withContext(Checkbox.Label, 'label')
export const HiddenInput = Checkbox.HiddenInput

export type { CheckboxCheckedState as CheckedState } from '@ark-ui/qwik/checkbox'

export const Indicator = (props: HTMLStyledProps<'svg'>) => (
  <>
    <Checkbox.Indicator>
      <styled.svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3px"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <title>Checkmark</title>
        <path d="M20 6 9 17l-5-5" />
      </styled.svg>
    </Checkbox.Indicator>
    <Checkbox.Indicator indeterminate>
      <styled.svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3px"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <title>Indeterminate</title>
        <path d="M5 12h14" />
      </styled.svg>
    </Checkbox.Indicator>
  </>
)
