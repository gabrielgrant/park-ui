import { Skeleton, SkeletonCircle, SkeletonText } from '../skeleton'

export const ComponentUnderTest = () => (
  <div>
    <SkeletonCircle boxSize="10" data-testid="circle" />
    <SkeletonText
      noOfLines={2}
      gap="3"
      data-testid="line"
      rootProps={{ 'data-testid': 'text-root' }}
    />
    <Skeleton height="5" variant="shine" data-testid="block" />
  </div>
)

export const SkeletonLoaded = () => (
  <Skeleton loading={false} data-testid="loaded">
    <p>content</p>
  </Skeleton>
)

export const SkeletonTextDefault = () => (
  <div data-testid="default-root">
    <SkeletonText />
  </div>
)

export const SkeletonTextSingle = () => (
  <div data-testid="single-root">
    <SkeletonText noOfLines={1} />
  </div>
)
