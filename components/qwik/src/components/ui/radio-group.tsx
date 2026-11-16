import { RadioGroup } from '@ark-ui/qwik/radio-group'
import { createStyleContext } from 'styled-system/jsx'
import { radioGroup } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

const { withProvider, withContext } = createStyleContext(radioGroup)

export type RootProps = ComponentProps<typeof Root>
export type ItemProps = ComponentProps<typeof Item>
export type ItemHiddenInputProps = ComponentProps<typeof ItemHiddenInput>

export const Root = withProvider(RadioGroup.Root, 'root')
export const Indicator = withContext(RadioGroup.Indicator, 'indicator')
export const Item = withContext(RadioGroup.Item, 'item')
export const ItemControl = withContext(RadioGroup.ItemControl, 'itemControl')
export const ItemText = withContext(RadioGroup.ItemText, 'itemText')
export const Label = withContext(RadioGroup.Label, 'label')
export const ItemHiddenInput = RadioGroup.ItemHiddenInput
