import { useCarouselContext } from '@ark-ui/qwik/carousel'
import { component$ } from '@qwik.dev/core'
import { Center } from 'styled-system/jsx'
import { button } from 'styled-system/recipes'
import { Button, Carousel, ChevronRightIcon, Text } from '@/components/ui'

const ChevronLeftIcon = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
)

export const App = () => {
  const slides = 5

  return (
    <Carousel.Root slideCount={slides}>
      <ScrollToTrigger />
      <Carousel.ItemGroup>
        {Array.from({ length: slides }, (_, index) => (
          <Carousel.Item key={index} index={index}>
            <Center bg="colorPalette.subtle.bg" height="40" borderRadius="l2">
              <Text textStyle="3xl" fontWeight="semibold" color="colorPalette.subtle.fg">
                {index + 1}
              </Text>
            </Center>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control>
        <Carousel.PrevTrigger class={button({ size: 'sm', variant: 'plain' })} px="0" py="0">
          <ChevronLeftIcon />
        </Carousel.PrevTrigger>
        <Carousel.IndicatorGroup />
        <Carousel.NextTrigger class={button({ size: 'sm', variant: 'plain' })} px="0" py="0">
          <ChevronRightIcon />
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  )
}

const ScrollToTrigger = component$(() => {
  const carousel = useCarouselContext()

  return (
    <Button
      variant="outline"
      size="sm"
      alignSelf="start"
      onClick$={() => carousel?.scrollToIndex(3)}
    >
      Go to slide 4
    </Button>
  )
})
