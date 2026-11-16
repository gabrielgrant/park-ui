import { parseColor } from '@ark-ui/qwik/color-picker'
import * as ColorPicker from '../color-picker'

export const ComponentUnderTest = (props: Partial<ColorPicker.RootProps>) => (
  <ColorPicker.Root defaultValue={parseColor('#eb5e41')} {...props}>
    <ColorPicker.Label>Color</ColorPicker.Label>
    <ColorPicker.Control>
      <ColorPicker.ChannelInput channel="hex" data-testid="hex-input" />
      <ColorPicker.ChannelInput channel="alpha" />
      <ColorPicker.ValueText data-testid="value-text" />
      <ColorPicker.Trigger data-testid="trigger">
        <ColorPicker.TransparencyGrid />
        <ColorPicker.ValueSwatch />
      </ColorPicker.Trigger>
    </ColorPicker.Control>
    <ColorPicker.Positioner>
      <ColorPicker.Content data-testid="content">
        <ColorPicker.FormatTrigger>Toggle ColorFormat</ColorPicker.FormatTrigger>
        <ColorPicker.FormatSelect />
        <ColorPicker.Area>
          <ColorPicker.AreaBackground />
          <ColorPicker.AreaThumb />
        </ColorPicker.Area>
        <ColorPicker.ChannelSlider channel="hue">
          <ColorPicker.ChannelSliderTrack />
          <ColorPicker.ChannelSliderThumb />
        </ColorPicker.ChannelSlider>
        <ColorPicker.ChannelSlider channel="alpha">
          <ColorPicker.TransparencyGrid />
          <ColorPicker.ChannelSliderTrack />
          <ColorPicker.ChannelSliderThumb />
        </ColorPicker.ChannelSlider>
        <ColorPicker.SwatchGroup>
          <ColorPicker.SwatchTrigger value="#0000ff" data-testid="swatch-blue">
            <ColorPicker.Swatch value="#0000ff">
              <ColorPicker.SwatchIndicator>✓</ColorPicker.SwatchIndicator>
            </ColorPicker.Swatch>
          </ColorPicker.SwatchTrigger>
          <ColorPicker.SwatchTrigger value="#00ff00">
            <ColorPicker.Swatch value="#00ff00">
              <ColorPicker.SwatchIndicator>✓</ColorPicker.SwatchIndicator>
            </ColorPicker.Swatch>
          </ColorPicker.SwatchTrigger>
        </ColorPicker.SwatchGroup>
        <ColorPicker.View format="rgba">
          <ColorPicker.ChannelInput channel="hex" />
          <ColorPicker.ChannelInput channel="alpha" />
        </ColorPicker.View>
        <ColorPicker.EyeDropperTrigger>Pick color</ColorPicker.EyeDropperTrigger>
      </ColorPicker.Content>
    </ColorPicker.Positioner>
    <ColorPicker.HiddenInput />
  </ColorPicker.Root>
)
