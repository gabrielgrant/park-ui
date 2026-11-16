import { ark } from '@ark-ui/qwik/factory'
import { Fieldset } from '@ark-ui/qwik/fieldset'
import { createStyleContext } from 'styled-system/jsx'
import { fieldset } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

const { withProvider, withContext } = createStyleContext(fieldset)

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider(Fieldset.Root, 'root')
export const Legend = withContext(Fieldset.Legend, 'legend')
export const HelperText = withContext(Fieldset.HelperText, 'helperText')
export const ErrorText = withContext(Fieldset.ErrorText, 'errorText')
export const Content = withContext(ark.div, 'content')
export const Control = withContext(ark.div, 'control')
