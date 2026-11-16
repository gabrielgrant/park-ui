import { $, component$, useSignal } from '@qwik.dev/core'
import { RadioGroup } from '@/components/ui'

export const App = component$(() => {
  const value = useSignal<string | null>('react')
  return (
    <RadioGroup.Root
      value={value.value}
      onValueChange$={$((e) => {
        value.value = e.value
      })}
    >
      {items.map((item) => (
        <RadioGroup.Item key={item.value} value={item.value}>
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
})

const items = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Vue', value: 'vue' },
]
