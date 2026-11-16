import { ark } from '@ark-ui/qwik/factory'
import { Stack, type StackProps, styled } from 'styled-system/jsx'
import { skeleton } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

export type SkeletonProps = ComponentProps<typeof Skeleton>
export const Skeleton = styled(ark.div, skeleton)

export type SkeletonCircleProps = ComponentProps<typeof SkeletonCircle>
export const SkeletonCircle = styled(ark.div, skeleton, { defaultProps: { circle: true } })

export interface SkeletonTextProps extends SkeletonProps {
  /**
   * Number of lines to display
   * @default 3
   */
  noOfLines?: number | undefined
  rootProps?: StackProps | undefined
}

export const SkeletonText = (props: SkeletonTextProps) => {
  const { noOfLines = 3, gap, rootProps, ...skeletonProps } = props

  return (
    <Stack gap={gap as StackProps['gap']} width="full" {...rootProps}>
      {[...Array(noOfLines).keys()].map((index) => (
        <Skeleton
          key={index}
          height="4"
          _last={{ maxW: noOfLines === 1 ? '100%' : '80%' }}
          {...skeletonProps}
        />
      ))}
    </Stack>
  )
}
