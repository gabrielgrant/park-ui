import { InfoIcon, UserIcon } from '../icons'
import { Input } from '../input'
import { InputGroup, type InputGroupProps } from '../input-group'

export const ComponentUnderTest = (props: InputGroupProps) => (
  <InputGroup
    data-testid="group"
    startElement={<UserIcon data-testid="start-icon" />}
    endElement={<InfoIcon data-testid="end-icon" />}
    {...props}
  >
    <Input placeholder="Username" data-testid="input" />
  </InputGroup>
)

export const StartOnlyInputGroup = () => (
  <InputGroup data-testid="group" startElement={<UserIcon />}>
    <Input placeholder="Username" />
  </InputGroup>
)
