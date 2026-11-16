import { $, component$, useSignal } from '@qwik.dev/core'
import * as Editable from '../editable'

export const ComponentUnderTest = (props: Editable.RootProps) => (
  <Editable.Root defaultValue="Click to edit" {...props}>
    <Editable.Label>Name</Editable.Label>
    <Editable.Area>
      <Editable.Preview />
      <Editable.Input />
    </Editable.Area>
    <Editable.Control>
      <Editable.EditTrigger>Edit</Editable.EditTrigger>
      <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
      <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
    </Editable.Control>
  </Editable.Root>
)

export const CommitEditable = component$(() => {
  const committed = useSignal('')
  return (
    <>
      <Editable.Root
        defaultValue="Hello"
        onValueCommit$={$((details) => {
          committed.value = details.value
        })}
      >
        <Editable.Label>Name</Editable.Label>
        <Editable.Area>
          <Editable.Preview />
          <Editable.Input />
        </Editable.Area>
        <Editable.Control>
          <Editable.EditTrigger>Edit</Editable.EditTrigger>
          <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
          <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
        </Editable.Control>
      </Editable.Root>
      <output data-testid="committed">{committed.value}</output>
    </>
  )
})
