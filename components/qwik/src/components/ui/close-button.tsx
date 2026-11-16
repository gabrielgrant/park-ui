import type { JSXChildren } from '@qwik.dev/core'
import { IconButton, type IconButtonProps } from './icon-button'
import { XIcon } from './icons'

export type CloseButtonProps = IconButtonProps

export const CloseButton = (props: CloseButtonProps) => {
  const { children, ...rest } = props

  return (
    <IconButton variant="plain" colorPalette="gray" aria-label="Close" {...rest}>
      {(children as JSXChildren) ?? <XIcon />}
    </IconButton>
  )
}
