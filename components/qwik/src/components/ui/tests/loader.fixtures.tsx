import { Loader } from '../loader'

export const ComponentUnderTest = () => (
  <div>
    <span data-testid="default">
      <Loader data-testid="default-loader">
        <span data-testid="default-child">Content</span>
      </Loader>
    </span>
    <span data-testid="hidden">
      <Loader visible={false}>
        <span data-testid="hidden-child">Content</span>
      </Loader>
    </span>
    <span data-testid="text-start">
      <Loader text="Loading...">
        <span data-testid="text-child">Content</span>
      </Loader>
    </span>
    <span data-testid="text-end">
      <Loader text="Loading..." spinnerPlacement="end" />
    </span>
    <span data-testid="custom-spinner">
      <Loader spinner={<span data-testid="my-spinner">*</span>}>
        <span data-testid="custom-child">Content</span>
      </Loader>
    </span>
  </div>
)
