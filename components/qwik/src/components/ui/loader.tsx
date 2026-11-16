import type { JSXChildren, JSXOutput } from '@qwik.dev/core'
import type { HTMLStyledProps } from 'styled-system/types'
import { AbsoluteCenter } from './absolute-center'
import { Span } from './span'
import { Spinner } from './spinner'

export interface LoaderProps extends HTMLStyledProps<'span'> {
  /**
   * Whether the loader is visible
   * @default true
   */
  visible?: boolean | undefined
  /**
   * The spinner to display when loading
   */
  spinner?: JSXOutput | undefined
  /**
   * The placement of the spinner
   * @default "start"
   */
  spinnerPlacement?: 'start' | 'end' | undefined
  /**
   * The text to display when loading
   */
  text?: JSXOutput | undefined

  children?: JSXChildren
}

export const Loader = (props: LoaderProps) => {
  const {
    spinner = <Spinner size="inherit" borderWidth="0.125em" color="inherit" />,
    spinnerPlacement = 'start',
    children,
    text,
    visible = true,
    ...rest
  } = props

  if (!visible) return <>{children}</>

  if (text) {
    return (
      <Span display="contents" {...rest}>
        {spinnerPlacement === 'start' && spinner}
        {text}
        {spinnerPlacement === 'end' && spinner}
      </Span>
    )
  }

  if (props.spinner !== undefined) {
    return (
      <Span display="contents" {...rest}>
        <AbsoluteCenter display="inline-flex">{spinner}</AbsoluteCenter>
        <Span visibility="hidden" display="contents">
          {children}
        </Span>
      </Span>
    )
  }

  return (
    <Span display="contents" {...rest}>
      {children}
    </Span>
  )
}
