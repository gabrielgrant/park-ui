import * as Field from '../field'
import { Input, type InputProps } from '../input'

export const ComponentUnderTest = (props: InputProps) => (
  <Input data-testid="input" placeholder="Enter your email" {...props} />
)

export const InputInField = () => (
  <Field.Root invalid required>
    <Field.Label>Email</Field.Label>
    <Input data-testid="input" />
  </Field.Root>
)
