import { Checkbox, useCheckboxContext } from '@ark-ui/qwik/checkbox'
import { component$, type PropsOf } from '@qwik.dev/core'
import { createStyleContext, styled } from 'styled-system/jsx'
import { checkbox } from 'styled-system/recipes'
import type { HTMLStyledProps } from 'styled-system/types'

const { withProvider, withContext } = createStyleContext(checkbox)

export type RootProps = PropsOf<typeof Root>
export type HiddenInputProps = PropsOf<typeof HiddenInput>

export const Root = withProvider(Checkbox.Root, 'root')
export const Control = withContext(Checkbox.Control, 'control')
export const Label = withContext(Checkbox.Label, 'label')
export const HiddenInput = Checkbox.HiddenInput
// NOTE vs react/solid: no `RootProvider`, no `Group`/`GroupProvider` until
// Ark ships them (ARK-PLAN R6 / I1).

export type { CheckboxCheckedState as CheckedState } from '@ark-ui/qwik/checkbox'

// No asChild on Qwik (ARK-PLAN R1/I5): nest the svg INSIDE Indicator,
// as the Solid version does.
export const Indicator = component$<HTMLStyledProps<'svg'>>((props) => {
  const api = useCheckboxContext()
  return (
    <Checkbox.Indicator indeterminate={api?.indeterminate}>
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
        {api?.indeterminate ? <path d="M5 12h14" /> : api?.checked ? <path d="M20 6 9 17l-5-5" /> : null}
      </styled.svg>
    </Checkbox.Indicator>
  )
})
