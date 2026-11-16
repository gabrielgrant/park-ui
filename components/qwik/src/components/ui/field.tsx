import { Field } from '@ark-ui/qwik/field'
import { createStyleContext } from 'styled-system/jsx'
import { field } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

const { withProvider, withContext } = createStyleContext(field)

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider(Field.Root, 'root')
export const ErrorText = withContext(Field.ErrorText, 'errorText')
export const HelperText = withContext(Field.HelperText, 'helperText')
export const Label = withContext(Field.Label, 'label')
export const RequiredIndicator = withContext(Field.RequiredIndicator, 'requiredIndicator', {
  defaultProps: { children: '*' },
})
