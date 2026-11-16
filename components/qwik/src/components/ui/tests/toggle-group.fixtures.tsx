import * as ToggleGroup from '../toggle-group'

export const ComponentUnderTest = (props: ToggleGroup.RootProps) => (
  <ToggleGroup.Root defaultValue={['bold']} {...props}>
    <ToggleGroup.Item value="bold" aria-label="Toggle Bold">
      B
    </ToggleGroup.Item>
    <ToggleGroup.Item value="italic" aria-label="Toggle Italic">
      I
    </ToggleGroup.Item>
    <ToggleGroup.Item value="underline" aria-label="Toggle Underline">
      U
    </ToggleGroup.Item>
  </ToggleGroup.Root>
)
