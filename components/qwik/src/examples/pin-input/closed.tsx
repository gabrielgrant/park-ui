import type { ComponentProps } from 'styled-system/types'
import { Group } from '@/components/ui'
import * as StyledPinInput from '@/components/ui/pin-input'

export interface PinInputProps extends StyledPinInput.RootProps {
  count?: number
  inputProps?: ComponentProps<typeof StyledPinInput.HiddenInput>
  attached?: boolean
}

export const PinInput = (props: PinInputProps) => {
  const { count = 4, inputProps, attached, ...rest } = props

  return (
    <StyledPinInput.Root {...rest}>
      <StyledPinInput.HiddenInput {...inputProps} />
      <StyledPinInput.Control>
        <Group attached={attached}>
          {Array.from({ length: count }).map((_, index) => (
            <StyledPinInput.Input key={index} index={index} />
          ))}
        </Group>
      </StyledPinInput.Control>
    </StyledPinInput.Root>
  )
}
