import type { JSXOutput } from '@qwik.dev/core'
import * as StyledRatingGroup from '@/components/ui/rating-group'

export interface RatingProps extends StyledRatingGroup.RootProps {
  icon?: JSXOutput
  label?: JSXOutput
}

export const RatingGroup = (props: RatingProps) => {
  const { icon, label, ...rest } = props
  const count = (props.count as number | undefined) ?? 5

  return (
    <StyledRatingGroup.Root count={count} {...rest}>
      {label && <StyledRatingGroup.Label>{label}</StyledRatingGroup.Label>}
      <StyledRatingGroup.HiddenInput />
      <StyledRatingGroup.Control>
        <StyledRatingGroup.Items icon={icon} />
      </StyledRatingGroup.Control>
    </StyledRatingGroup.Root>
  )
}
