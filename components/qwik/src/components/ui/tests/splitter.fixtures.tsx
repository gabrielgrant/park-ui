import * as Splitter from '../splitter'

export const ComponentUnderTest = (props: Partial<Splitter.RootProps>) => (
  <Splitter.Root
    data-testid="root"
    style={{ width: '400px', height: '200px' }}
    {...props}
    panels={props.panels ?? [{ id: 'a' }, { id: 'b' }]}
  >
    <Splitter.Panel data-testid="panel-a" id="a">
      A
    </Splitter.Panel>
    <Splitter.ResizeTrigger
      data-testid="resize-trigger"
      id="a:b"
      aria-label="Resize"
      style={{ width: '8px', height: '100%', display: 'block' }}
    />
    <Splitter.Panel data-testid="panel-b" id="b">
      B
    </Splitter.Panel>
  </Splitter.Root>
)
