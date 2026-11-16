import { Editable } from '@ark-ui/qwik/editable'
import { createStyleContext } from 'styled-system/jsx'
import { editable } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

const { withProvider, withContext } = createStyleContext(editable)

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider(Editable.Root, 'root')
export const Area = withContext(Editable.Area, 'area')
export const CancelTrigger = withContext(Editable.CancelTrigger, 'cancelTrigger')
export const Control = withContext(Editable.Control, 'control')
export const EditTrigger = withContext(Editable.EditTrigger, 'editTrigger')
export const Input = withContext(Editable.Input, 'input')
export const Label = withContext(Editable.Label, 'label')
export const Preview = withContext(Editable.Preview, 'preview')
export const SubmitTrigger = withContext(Editable.SubmitTrigger, 'submitTrigger')
