import { Progress } from '@ark-ui/qwik/progress'
import { createStyleContext } from 'styled-system/jsx'
import { progress } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

const { withProvider, withContext } = createStyleContext(progress)

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider(Progress.Root, 'root')
export const Circle = withContext(Progress.Circle, 'circle')
export const CircleRange = withContext(Progress.CircleRange, 'circleRange')
export const CircleTrack = withContext(Progress.CircleTrack, 'circleTrack')
export const Label = withContext(Progress.Label, 'label')
export const Range = withContext(Progress.Range, 'range')
export const Track = withContext(Progress.Track, 'track')
export const ValueText = withContext(Progress.ValueText, 'valueText')
export const View = withContext(Progress.View, 'view')
