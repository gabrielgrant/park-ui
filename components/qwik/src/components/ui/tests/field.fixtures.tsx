import * as Field from '../field'
import { Input } from '../input'

export const ComponentUnderTest = (props: Field.RootProps) => (
  <Field.Root {...props}>
    <Field.Label>
      Email
      <Field.RequiredIndicator />
    </Field.Label>
    <Input placeholder="me@example.com" />
    <Field.HelperText>This is a helper text</Field.HelperText>
    <Field.ErrorText>This is an error text</Field.ErrorText>
  </Field.Root>
)
