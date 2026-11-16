import { type PropsOf, component$ } from '@qwik.dev/core'
import * as RatingGroup from '../rating-group'

export const ComponentUnderTest = (props: RatingGroup.RootProps) => (
  <RatingGroup.Root count={5} defaultValue={3} {...props}>
    <RatingGroup.Label>Rating</RatingGroup.Label>
    <RatingGroup.HiddenInput />
    <RatingGroup.Control />
  </RatingGroup.Root>
)

const HeartIcon = component$<PropsOf<'svg'>>((props) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" data-testid="heart" {...props}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
))

export const CustomIcon = (props: RatingGroup.RootProps) => (
  <RatingGroup.Root count={5} defaultValue={3} {...props}>
    <RatingGroup.HiddenInput />
    <RatingGroup.Control>
      <RatingGroup.Items icon={<HeartIcon />} />
    </RatingGroup.Control>
  </RatingGroup.Root>
)

export const InlineSvgIcon = (props: RatingGroup.RootProps) => (
  <RatingGroup.Root count={3} defaultValue={1} {...props}>
    <RatingGroup.Control>
      <RatingGroup.Items
        icon={
          <svg aria-hidden="true" viewBox="0 0 24 24" data-testid="circle">
            <circle cx="12" cy="12" r="10" />
          </svg>
        }
      />
    </RatingGroup.Control>
  </RatingGroup.Root>
)
