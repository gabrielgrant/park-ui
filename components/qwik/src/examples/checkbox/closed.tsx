import { Slot, component$ } from '@qwik.dev/core'
import { visuallyHidden } from 'styled-system/patterns'
import * as StyledCheckbox from '@/components/ui/checkbox'

export type { CheckboxCheckedState } from '@ark-ui/qwik/checkbox'

export interface CheckboxProps extends StyledCheckbox.RootProps {
  inputProps?: StyledCheckbox.HiddenInputProps
  'aria-label'?: string
}

export const Checkbox = component$<CheckboxProps>((props) => {
  const { inputProps, 'aria-label': ariaLabel, ...rest } = props

  return (
    <StyledCheckbox.Root {...rest}>
      <StyledCheckbox.HiddenInput {...inputProps} />
      <StyledCheckbox.Control>
        <StyledCheckbox.Indicator />
      </StyledCheckbox.Control>
      <StyledCheckbox.Label class={ariaLabel ? visuallyHidden() : undefined}>
        {ariaLabel}
        <Slot />
      </StyledCheckbox.Label>
    </StyledCheckbox.Root>
  )
})
