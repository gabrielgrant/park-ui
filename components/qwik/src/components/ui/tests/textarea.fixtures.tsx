import * as Field from '../field'
import { Textarea, type TextareaProps } from '../textarea'

export const ComponentUnderTest = (props: TextareaProps) => (
  <Textarea data-testid="textarea" placeholder="Enter your comment" {...props} />
)

export const TextareaInField = () => (
  <Field.Root invalid>
    <Field.Label>Comment</Field.Label>
    <Textarea data-testid="textarea" />
  </Field.Root>
)
