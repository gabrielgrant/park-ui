import type { JSXOutput } from '@qwik.dev/core'
import * as StyledField from '@/components/ui/field'

export interface FieldProps extends Omit<StyledField.RootProps, 'label'> {
  label?: JSXOutput
  helperText?: JSXOutput
  errorText?: JSXOutput
  optionalText?: JSXOutput
}

export const Field = (props: FieldProps) => {
  const { label, children, helperText, errorText, optionalText, ...rest } = props

  return (
    <StyledField.Root {...rest}>
      {label && (
        <StyledField.Label>
          {label}
          <StyledField.RequiredIndicator />
          {!rest.required && optionalText}
        </StyledField.Label>
      )}
      {children}
      {helperText && <StyledField.HelperText>{helperText}</StyledField.HelperText>}
      <StyledField.ErrorText>{errorText}</StyledField.ErrorText>
    </StyledField.Root>
  )
}
