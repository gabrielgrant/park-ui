import { Image } from '../image'

export const ComponentUnderTest = () => <Image src="/a.png" alt="A" data-testid="img" />

export const ImageCustom = () => (
  <Image src="/a.png" alt="A" fit="contain" alignment="top" maxW="52" data-testid="img-custom" />
)
