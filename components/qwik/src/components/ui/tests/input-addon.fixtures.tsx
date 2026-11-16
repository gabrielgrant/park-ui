import { Group } from '../group'
import { Input } from '../input'
import { InputAddon, type InputAddonProps } from '../input-addon'

export const ComponentUnderTest = (props: InputAddonProps) => (
  <Group attached>
    <InputAddon data-testid="addon" {...props}>
      https://
    </InputAddon>
    <Input placeholder="yoursite.com" />
  </Group>
)
