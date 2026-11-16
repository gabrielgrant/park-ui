import { HStack } from 'styled-system/jsx'
import { button } from 'styled-system/recipes'
import { InfoIcon, Switch, Tooltip } from '@/components/ui'

export const App = () => {
  return (
    <HStack gap="2">
      <Switch.Root>
        <Switch.HiddenInput />
        <Switch.Control />
        <Switch.Label>Switch with tooltip</Switch.Label>
      </Switch.Root>
      <Tooltip
        content="This is a tooltip"
        triggerProps={{
          class: button({ variant: 'plain', size: 'xs' }),
          'aria-label': 'More info',
        }}
      >
        <InfoIcon />
      </Tooltip>
    </HStack>
  )
}
