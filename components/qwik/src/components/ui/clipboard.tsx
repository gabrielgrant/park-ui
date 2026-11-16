import { Clipboard } from '@ark-ui/qwik/clipboard'
import { createStyleContext } from 'styled-system/jsx'
import { clipboard } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'
import { CheckIcon, CopyIcon } from './icons'

const { withProvider, withContext } = createStyleContext(clipboard)

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider(Clipboard.Root, 'root')
export const Control = withContext(Clipboard.Control, 'control')
export const Input = withContext(Clipboard.Input, 'input')
export const Label = withContext(Clipboard.Label, 'label')
export const Trigger = withContext(Clipboard.Trigger, 'trigger')

export type { ClipboardCopyStatusDetails as CopyStatusDetails } from '@ark-ui/qwik/clipboard'

type IndicatorProps = ComponentProps<typeof StyledIndicator>

const StyledIndicator = withContext(Clipboard.Indicator, 'indicator')

export const Indicator = (props: IndicatorProps) => {
  return (
    <StyledIndicator copied={CheckIcon({})} {...props}>
      <CopyIcon />
    </StyledIndicator>
  )
}

export const CopyText = (props: IndicatorProps) => {
  return (
    <StyledIndicator copied="Copied" {...props}>
      Copy
    </StyledIndicator>
  )
}
