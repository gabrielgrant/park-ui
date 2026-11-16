import { Icon, Switch } from '@/components/ui'

export const App = () => {
  return (
    <Switch.Root size="lg">
      <Switch.HiddenInput />
      <Switch.Control>
        <Switch.Thumb />
        <Switch.Indicator
          fallback={
            <Icon color="red.9" {...lucide}>
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </Icon>
          }
        >
          <Icon color="blue.9" {...lucide}>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </Icon>
        </Switch.Indicator>
      </Switch.Control>
      <Switch.Label>Label</Switch.Label>
    </Switch.Root>
  )
}

const lucide = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 2,
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
} as const
