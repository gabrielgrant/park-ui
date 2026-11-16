import type { JSXOutput } from '@qwik.dev/core'
import { Avatar as StyledAvatar } from '@/components/ui'

export interface AvatarProps extends StyledAvatar.RootProps {
  name?: string
  src?: string
  srcSet?: string
  loading?: 'eager' | 'lazy'
  icon?: JSXOutput
  fallback?: JSXOutput
  children?: JSXOutput
}

export const Avatar = (props: AvatarProps) => {
  const { name, src, srcSet, loading, icon, fallback, children, ...rest } = props

  return (
    <StyledAvatar.Root {...rest}>
      <StyledAvatar.Fallback name={name}>{fallback || icon}</StyledAvatar.Fallback>
      <StyledAvatar.Image src={src} srcSet={srcSet} loading={loading} />
      {children}
    </StyledAvatar.Root>
  )
}
