import { button } from 'styled-system/recipes'
import { Carousel, ChevronRightIcon, Image } from '@/components/ui'

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
  return (
    <Carousel.Root slideCount={images.length} inline>
      <Carousel.ItemGroup borderRadius="l3">
        {images.map((image, index) => (
          <Carousel.Item key={image} index={index}>
            <Image src={image} width="full" height="80" />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control>
        <Carousel.PrevTrigger class={button({ size: 'xs', variant: 'plain' })} px="0" py="0">
          <ChevronLeftIcon />
        </Carousel.PrevTrigger>
        <Carousel.IndicatorGroup />
        <Carousel.NextTrigger class={button({ size: 'xs', variant: 'plain' })} px="0" py="0">
          <ChevronRightIcon />
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  )
}

const images = [
  'https://tinyurl.com/5b6ka8jd',
  'https://tinyurl.com/7rmccdn5',
  'https://tinyurl.com/59jxz9uu',
  'https://tinyurl.com/6jurv23t',
  'https://tinyurl.com/yp4rfum7',
]
