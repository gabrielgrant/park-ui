import { Toaster, toaster } from '../toast'

export const ComponentUnderTest = () => (
  <>
    <button
      type="button"
      data-testid="show-toast"
      onClick$={() => {
        toaster.create({ title: 'Saved', description: 'Your changes have been saved.', type: 'success', closable: true })
      }}
    >
      Show toast
    </button>
    <Toaster />
  </>
)
