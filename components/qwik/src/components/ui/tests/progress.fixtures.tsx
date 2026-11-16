import { component$, useSignal } from '@qwik.dev/core'
import * as Progress from '../progress'

export const ComponentUnderTest = (props: Progress.RootProps) => (
  <Progress.Root defaultValue={42} {...props}>
    <Progress.Label>Usage</Progress.Label>
    <Progress.Track>
      <Progress.Range />
    </Progress.Track>
    <Progress.ValueText />
  </Progress.Root>
)

export const Circular = (props: Progress.RootProps) => (
  <Progress.Root defaultValue={42} {...props}>
    <Progress.Circle>
      <Progress.CircleTrack />
      <Progress.CircleRange />
    </Progress.Circle>
    <Progress.View state="loading">Loading</Progress.View>
  </Progress.Root>
)

export const ControlledProgress = component$(() => {
  const value = useSignal(20)
  return (
    <>
      <button
        type="button"
        onClick$={() => {
          value.value += 10
        }}
      >
        increase
      </button>
      <Progress.Root value={value.value}>
        <Progress.Track>
          <Progress.Range data-testid="range" />
        </Progress.Track>
        <Progress.ValueText data-testid="value-text" />
      </Progress.Root>
    </>
  )
})
