import * as TagsInput from '../tags-input'

export const ComponentUnderTest = (props: TagsInput.RootProps) => (
  <TagsInput.Root defaultValue={['React', 'Solid', 'Vue']} {...props}>
    <TagsInput.Label data-testid="label">Tags</TagsInput.Label>
    <TagsInput.Control data-testid="control">
      <TagsInput.Items data-testid="item" />
      <TagsInput.Input data-testid="input" placeholder="Add tag..." />
    </TagsInput.Control>
    <TagsInput.ClearTrigger data-testid="clear-trigger" />
    <TagsInput.HiddenInput />
  </TagsInput.Root>
)
