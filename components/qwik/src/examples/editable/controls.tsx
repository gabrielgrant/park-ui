import { button } from 'styled-system/recipes'
import { CheckIcon, Editable, Group, XIcon } from '@/components/ui'

export const App = () => {
  return (
    <Editable.Root defaultValue="Click to edit" size="sm">
      <Editable.Preview />
      <Editable.Input />
      <Editable.Control>
        <Editable.EditTrigger
          class={button({ variant: 'plain', size: 'sm' })}
          colorPalette="gray"
          px="0"
          py="0"
        >
          <EditIcon />
        </Editable.EditTrigger>
        <Group>
          <Editable.CancelTrigger
            class={button({ variant: 'outline', size: 'sm' })}
            colorPalette="gray"
            px="0"
            py="0"
          >
            <XIcon />
          </Editable.CancelTrigger>
          <Editable.SubmitTrigger
            class={button({ variant: 'outline', size: 'sm' })}
            colorPalette="gray"
            px="0"
            py="0"
          >
            <CheckIcon />
          </Editable.SubmitTrigger>
        </Group>
      </Editable.Control>
    </Editable.Root>
  )
}

const svgProps = {
  viewBox: '0 0 24 24',
  width: 24,
  height: 24,
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 2,
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
} as const

const EditIcon = () => (
  <svg aria-hidden="true" {...svgProps}>
    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
  </svg>
)
