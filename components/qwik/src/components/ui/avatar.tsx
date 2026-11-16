import { Avatar } from '@ark-ui/qwik/avatar'
import type { JSXOutput } from '@qwik.dev/core'
import { createStyleContext } from 'styled-system/jsx'
import { avatar } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'
import { UserIcon } from './icons'

const { withProvider, withContext } = createStyleContext(avatar)

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider(Avatar.Root, 'root')
export const Image = withContext(Avatar.Image, 'image', {
  defaultProps: {
    draggable: false,
    referrerPolicy: 'no-referrer',
  },
})

export type { AvatarStatusChangeDetails as StatusChangeDetails } from '@ark-ui/qwik/avatar'

export interface FallbackProps extends ComponentProps<typeof StyledFallback> {
  /**
   * The name to derive the initials from.
   * If not provided, the fallback will display a generic icon.
   */
  name?: string | undefined
  children?: JSXOutput
}

const StyledFallback = withContext(Avatar.Fallback, 'fallback')

export const Fallback = (props: FallbackProps) => {
  const { name, children, ...rest } = props

  return <StyledFallback {...rest}>{children ?? (name ? getInitials(name) : <UserIcon />)}</StyledFallback>
}

const getInitials = (name: string) => {
  const names = name.trim().split(' ')
  const firstName = names[0] || ''
  const lastName = names.length > 1 ? names[names.length - 1] : ''
  return firstName && lastName ? `${firstName[0]}${lastName[0]}` : firstName[0]
}
