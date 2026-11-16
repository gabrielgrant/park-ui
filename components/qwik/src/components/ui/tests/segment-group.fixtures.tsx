import * as SegmentGroup from '../segment-group'

export const ComponentUnderTest = (props: SegmentGroup.RootProps) => (
  <SegmentGroup.Root defaultValue="React" {...props}>
    <SegmentGroup.Indicator />
    <SegmentGroup.Items
      items={['React', 'Solid', { value: 'Svelte', label: 'Svelte', disabled: true }, 'Vue']}
    />
  </SegmentGroup.Root>
)
