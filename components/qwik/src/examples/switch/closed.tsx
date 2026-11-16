import type { JSXOutput } from '@qwik.dev/core'
import * as ParkSwitch from '@/components/ui/switch'

export interface SwitchProps extends ParkSwitch.RootProps {
  inputProps?: ParkSwitch.HiddenInputProps
  trackLabel?: { on: JSXOutput; off: JSXOutput }
  thumbLabel?: { on: JSXOutput; off: JSXOutput }
  children?: JSXOutput
}

export const Switch = (props: SwitchProps) => {
  const { inputProps, children, trackLabel, thumbLabel, ...rest } = props

  return (
    <ParkSwitch.Root {...rest}>
      <ParkSwitch.HiddenInput {...inputProps} />
      <ParkSwitch.Control>
        <ParkSwitch.Thumb>
          {thumbLabel && (
            <ParkSwitch.ThumbIndicator fallback={thumbLabel.off}>
              {thumbLabel.on}
            </ParkSwitch.ThumbIndicator>
          )}
        </ParkSwitch.Thumb>
        {trackLabel && (
          <ParkSwitch.Indicator fallback={trackLabel.off}>{trackLabel.on}</ParkSwitch.Indicator>
        )}
      </ParkSwitch.Control>
      {children != null && <ParkSwitch.Label>{children}</ParkSwitch.Label>}
    </ParkSwitch.Root>
  )
}
