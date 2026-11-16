import { Carousel, useCarouselContext } from '@ark-ui/qwik/carousel'
import { component$ } from '@qwik.dev/core'
import { createStyleContext } from 'styled-system/jsx'
import { carousel } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

const { withProvider, withContext } = createStyleContext(carousel)

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider(Carousel.Root, 'root', {
  forwardProps: ['page'],
  defaultProps: { spacing: '16px' },
})
export const AutoplayTrigger = withContext(Carousel.AutoplayTrigger, 'autoplayTrigger')
export const Control = withContext(Carousel.Control, 'control')
export const Indicator = withContext(Carousel.Indicator, 'indicator')
export const Item = withContext(Carousel.Item, 'item')
export const ItemGroup = withContext(Carousel.ItemGroup, 'itemGroup')
export const NextTrigger = withContext(Carousel.NextTrigger, 'nextTrigger')
export const PrevTrigger = withContext(Carousel.PrevTrigger, 'prevTrigger')

const StyledIndicatorGroup = withContext(Carousel.IndicatorGroup, 'indicatorGroup')
export type IndicatorGroupProps = ComponentProps<typeof StyledIndicatorGroup>

export const IndicatorGroup = component$<IndicatorGroupProps>((props) => {
  const carousel = useCarouselContext()

  return (
    <StyledIndicatorGroup {...props}>
      {carousel?.pageSnapPoints.map((_, index) => (
        <Indicator key={index} index={index} />
      ))}
    </StyledIndicatorGroup>
  )
})
