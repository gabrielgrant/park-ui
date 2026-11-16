import { CheckIcon, XIcon } from '../icons'
import * as Switch from '../switch'

export const ComponentUnderTest = (props: Switch.RootProps) => (
  <Switch.Root {...props}>
    <Switch.HiddenInput />
    <Switch.Control data-testid="control" />
    <Switch.Label>Switch</Switch.Label>
  </Switch.Root>
)

export const WithIndicators = (props: Switch.RootProps) => (
  <Switch.Root {...props}>
    <Switch.HiddenInput />
    <Switch.Control data-testid="control">
      <Switch.Thumb data-testid="thumb">
        <Switch.ThumbIndicator data-testid="thumb-indicator" fallback={<span>off</span>}>
          <span>on</span>
        </Switch.ThumbIndicator>
      </Switch.Thumb>
      <Switch.Indicator data-testid="indicator" fallback={<XIcon data-testid="x-icon" />}>
        <CheckIcon data-testid="check-icon" />
      </Switch.Indicator>
    </Switch.Control>
    <Switch.Label>Indicators</Switch.Label>
  </Switch.Root>
)
