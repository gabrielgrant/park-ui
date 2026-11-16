import { Center } from 'styled-system/jsx'
import { button } from 'styled-system/recipes'
import { Carousel, ChevronRightIcon, Text } from '@/components/ui'

export const App = () => {
  const slides = 5

  return (
    <Carousel.Root slideCount={slides}>
      <Carousel.ItemGroup>
        {Array.from({ length: slides }, (_, index) => (
          <Carousel.Item key={index} index={index}>
            <Center bg="colorPalette.subtle.bg" height="48" borderRadius="l2">
              <Text textStyle="3xl" fontWeight="semibold" color="colorPalette.subtle.fg">
                {index + 1}
              </Text>
            </Center>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control>
        <Carousel.PrevTrigger class={button({ size: 'sm', variant: 'plain' })} px="0" py="0">
          <ChevronRightIcon style={{ transform: 'rotate(180deg)' }} />
        </Carousel.PrevTrigger>
        <Carousel.IndicatorGroup />
        <Carousel.NextTrigger class={button({ size: 'sm', variant: 'plain' })} px="0" py="0">
          <ChevronRightIcon />
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  )
}
