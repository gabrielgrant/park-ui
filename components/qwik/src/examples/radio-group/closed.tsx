import type { JSXOutput } from '@qwik.dev/core'
import * as StyledRadioGroup from '@/components/ui/radio-group'

export interface RadioProps extends StyledRadioGroup.ItemProps {
  inputProps?: StyledRadioGroup.ItemHiddenInputProps
  children?: JSXOutput
}

export const Radio = (props: RadioProps) => {
  const { children, inputProps, ...rest } = props

  return (
    <StyledRadioGroup.Item {...rest}>
      <StyledRadioGroup.ItemHiddenInput {...inputProps} />
      <StyledRadioGroup.ItemControl />
      {children && <StyledRadioGroup.ItemText>{children}</StyledRadioGroup.ItemText>}
    </StyledRadioGroup.Item>
  )
}

export const RadioGroup = StyledRadioGroup.Root
