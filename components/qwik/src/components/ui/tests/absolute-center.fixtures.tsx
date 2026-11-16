import { AbsoluteCenter } from '../absolute-center'

export const ComponentUnderTest = () => (
  <div style={{ position: 'relative' }}>
    <AbsoluteCenter data-testid="center">Centered</AbsoluteCenter>
  </div>
)
