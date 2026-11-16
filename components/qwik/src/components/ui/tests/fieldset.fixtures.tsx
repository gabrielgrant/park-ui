import * as Field from '../field'
import * as Fieldset from '../fieldset'
import { Input } from '../input'

export const ComponentUnderTest = (props: Fieldset.RootProps) => (
  <Fieldset.Root {...props}>
    <Fieldset.Control>
      <Fieldset.Legend>Contact details</Fieldset.Legend>
      <Fieldset.HelperText>Please provide your contact details below.</Fieldset.HelperText>
      <Fieldset.ErrorText>Some fields are invalid.</Fieldset.ErrorText>
    </Fieldset.Control>
    <Fieldset.Content>
      <Field.Root>
        <Field.Label>Name</Field.Label>
        <Input name="name" />
      </Field.Root>
    </Fieldset.Content>
  </Fieldset.Root>
)
