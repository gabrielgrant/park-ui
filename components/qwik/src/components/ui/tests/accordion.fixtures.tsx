import * as Accordion from '../accordion'

const items = ['React', 'Solid', 'Vue']

export const ComponentUnderTest = (props: Accordion.RootProps) => (
  <Accordion.Root {...props}>
    {items.map((item) => (
      <Accordion.Item key={item} value={item}>
        <Accordion.ItemTrigger data-testid={`trigger-${item}`}>
          {item}
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent data-testid={`content-${item}`}>
          <Accordion.ItemBody>Content for {item}</Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    ))}
  </Accordion.Root>
)
