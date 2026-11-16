import type { ComponentProps } from 'styled-system/types'
import * as StyledNumberInput from '@/components/ui/number-input'

export interface NumberInputProps extends StyledNumberInput.RootProps {
  inputProps?: ComponentProps<typeof StyledNumberInput.Input>
}

export const NumberInput = (props: NumberInputProps) => {
  const { inputProps, ...rest } = props

  return (
    <StyledNumberInput.Root {...rest}>
      <StyledNumberInput.Control />
      <StyledNumberInput.Input {...inputProps} />
    </StyledNumberInput.Root>
  )
}
