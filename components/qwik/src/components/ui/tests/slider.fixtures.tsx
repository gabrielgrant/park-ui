import * as Slider from '../slider'

export const ComponentUnderTest = (props: Slider.RootProps) => (
  <Slider.Root defaultValue={[40]} min={0} max={100} step={1} {...props}>
    <Slider.Label>Volume</Slider.Label>
    <Slider.ValueText data-testid="value-text" />
    <Slider.Control>
      <Slider.Track>
        <Slider.Range />
      </Slider.Track>
      <Slider.Thumbs style={{ width: '20px', height: '20px', display: 'block' }} />
    </Slider.Control>
    <Slider.Marks marks={[25, { value: 75, label: '75%' }]} />
  </Slider.Root>
)
