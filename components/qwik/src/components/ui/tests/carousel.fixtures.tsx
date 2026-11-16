import * as Carousel from '../carousel'

const slides = 5

export const ComponentUnderTest = (props: Partial<Carousel.RootProps>) => (
  <Carousel.Root slideCount={slides} {...props}>
    <Carousel.ItemGroup>
      {Array.from({ length: slides }, (_, index) => (
        <Carousel.Item key={index} index={index} data-testid={`item-${index}`}>
          Slide {index + 1}
        </Carousel.Item>
      ))}
    </Carousel.ItemGroup>
    <Carousel.Control>
      <Carousel.PrevTrigger data-testid="prev-trigger">Prev</Carousel.PrevTrigger>
      <Carousel.IndicatorGroup data-testid="indicator-group" />
      <Carousel.NextTrigger data-testid="next-trigger">Next</Carousel.NextTrigger>
    </Carousel.Control>
  </Carousel.Root>
)
