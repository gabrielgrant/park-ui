import type { JSXOutput } from '@qwik.dev/core'
import * as StyledProgress from '@/components/ui/progress'

export interface ProgressProps extends StyledProgress.RootProps {
  showValueText?: boolean
  valueText?: JSXOutput
  label?: JSXOutput
}

export const Progress = (props: ProgressProps) => {
  const { showValueText, valueText, label, ...rest } = props

  return (
    <StyledProgress.Root {...rest}>
      {label && <StyledProgress.Label>{label}</StyledProgress.Label>}
      <StyledProgress.Track>
        <StyledProgress.Range />
      </StyledProgress.Track>
      {showValueText && <StyledProgress.ValueText>{valueText}</StyledProgress.ValueText>}
    </StyledProgress.Root>
  )
}
