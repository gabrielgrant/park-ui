import { type PropsOf, component$ } from '@qwik.dev/core'
import { RatingGroup } from '@/components/ui'

export const App = () => {
  return (
    <RatingGroup.Root count={5} defaultValue={3}>
      <RatingGroup.HiddenInput />
      <RatingGroup.Control>
        <RatingGroup.Items icon={<HeartIcon />} />
      </RatingGroup.Control>
    </RatingGroup.Root>
  )
}

const HeartIcon = component$<PropsOf<'svg'>>((props) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    {...props}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
))
