import { DisplayValue } from '../display-value'

export const ComponentUnderTest = () => (
  <div>
    <span data-testid="string">
      <DisplayValue value="Park UI" />
    </span>
    <span data-testid="formatted">
      <DisplayValue value={['React', 'Solid']} formatValue={(arr) => arr.join(', ')} />
    </span>
    <span data-testid="number">
      <DisplayValue value={0} />
    </span>
    <span data-testid="null">
      <DisplayValue value={null} />
    </span>
    <span data-testid="empty-string">
      <DisplayValue value="" />
    </span>
    <span data-testid="empty-array">
      <DisplayValue value={[]} />
    </span>
  </div>
)
