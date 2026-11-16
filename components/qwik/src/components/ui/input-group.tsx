import { ark } from '@ark-ui/qwik/factory'
import type { JSXOutput } from '@qwik.dev/core'
import { createStyleContext } from 'styled-system/jsx'
import { inputGroup } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

const { withProvider, withContext } = createStyleContext(inputGroup)

type RootProps = ComponentProps<typeof Root>
const Root = withProvider(ark.div, 'root')
const Element = withContext(ark.div, 'element')

export interface InputGroupProps extends RootProps {
  startElement?: JSXOutput | undefined
  endElement?: JSXOutput | undefined
}

export const InputGroup = (props: InputGroupProps) => {
  const { startElement, endElement, children, ...rest } = props

  return (
    <Root {...rest}>
      {startElement && (
        <Element insetInlineStart="0" top="0">
          {startElement}
        </Element>
      )}
      {children}
      {endElement && (
        <Element insetInlineEnd="0" top="0">
          {endElement}
        </Element>
      )}
    </Root>
  )
}
