import { ark } from '@ark-ui/qwik/factory'
import { styled } from 'styled-system/jsx'
import { button } from 'styled-system/recipes'

const ButtonLink = styled(ark.a, button)

export const App = () => {
  return (
    <ButtonLink href="https://park-ui.com" target="_blank" rel="noopener">
      Park UI
    </ButtonLink>
  )
}
