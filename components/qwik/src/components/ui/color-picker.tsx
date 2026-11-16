import { ColorPicker } from '@ark-ui/qwik/color-picker'
import { cx } from 'styled-system/css'
import { createStyleContext, styled } from 'styled-system/jsx'
import { colorPicker } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

const { withProvider, withContext } = createStyleContext(colorPicker)

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider(ColorPicker.Root, 'root')
export const Area = withContext(ColorPicker.Area, 'area')
export const AreaBackground = withContext(ColorPicker.AreaBackground, 'areaBackground')
export const AreaThumb = withContext(ColorPicker.AreaThumb, 'areaThumb')
export const ChannelInput = withContext(ColorPicker.ChannelInput, 'channelInput')
export const ChannelSlider = withContext(ColorPicker.ChannelSlider, 'channelSlider')
export const ChannelSliderLabel = withContext(ColorPicker.ChannelSliderLabel, 'channelSliderLabel')
export const ChannelSliderThumb = withContext(ColorPicker.ChannelSliderThumb, 'channelSliderThumb')
export const ChannelSliderTrack = withContext(ColorPicker.ChannelSliderTrack, 'channelSliderTrack')
export const ChannelSliderValueText = withContext(
  ColorPicker.ChannelSliderValueText,
  'channelSliderValueText',
)
export const Content = withContext(ColorPicker.Content, 'content')
export const Control = withContext(ColorPicker.Control, 'control')
export const EyeDropperTrigger = withContext(ColorPicker.EyeDropperTrigger, 'eyeDropperTrigger')
export const FormatTrigger = withContext(ColorPicker.FormatTrigger, 'formatTrigger')
export const HiddenInput = ColorPicker.HiddenInput
export const Label = withContext(ColorPicker.Label, 'label')
export const Positioner = withContext(ColorPicker.Positioner, 'positioner')
export const Swatch = withContext(ColorPicker.Swatch, 'swatch')
export const SwatchGroup = withContext(ColorPicker.SwatchGroup, 'swatchGroup')
export const SwatchIndicator = withContext(ColorPicker.SwatchIndicator, 'swatchIndicator')
export const SwatchTrigger = withContext(ColorPicker.SwatchTrigger, 'swatchTrigger')
export const Trigger = withContext(ColorPicker.Trigger, 'trigger')
export const ValueSwatch = ColorPicker.ValueSwatch
export const ValueText = withContext(ColorPicker.ValueText, 'valueText')
export const View = withContext(ColorPicker.View, 'view')

const StyledFormatSelect = styled(ColorPicker.FormatSelect)
export type FormatSelectProps = ComponentProps<typeof StyledFormatSelect>
export const FormatSelect = (props: FormatSelectProps) => (
  <StyledFormatSelect {...props} class={cx(colorPicker().formatSelect, props.class as string | undefined)} />
)

const StyledTransparencyGrid = styled(ColorPicker.TransparencyGrid)
export type TransparencyGridProps = ComponentProps<typeof StyledTransparencyGrid>
export const TransparencyGrid = (props: TransparencyGridProps) => (
  <StyledTransparencyGrid {...props} class={cx(colorPicker().transparencyGrid, props.class as string | undefined)} />
)
