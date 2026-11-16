import { $, component$, useSignal } from '@qwik.dev/core'
import { Stack } from 'styled-system/jsx'
import { Checkbox } from '@/components/ui'

export const App = component$(() => {
  const values = useSignal([
    { label: 'Monday', checked: false, value: 'monday' },
    { label: 'Tuesday', checked: false, value: 'tuesday' },
    { label: 'Wednesday', checked: false, value: 'wednesday' },
    { label: 'Thursday', checked: false, value: 'thursday' },
  ])

  const allChecked = values.value.every((value) => value.checked)
  const indeterminate = values.value.some((value) => value.checked) && !allChecked

  return (
    <Stack gap="4" alignItems="start">
      <Checkbox.Root
        checked={indeterminate ? 'indeterminate' : allChecked}
        onCheckedChange$={$((e) => {
          values.value = values.value.map((value) => ({ ...value, checked: !!e.checked }))
        })}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Label>Weekdays</Checkbox.Label>
      </Checkbox.Root>
      {values.value.map((item, index) => (
        <Checkbox.Root
          key={item.value}
          ms="6"
          checked={item.checked}
          onCheckedChange$={$((e) => {
            values.value = values.value.map((value, i) =>
              i === index ? { ...value, checked: !!e.checked } : value,
            )
          })}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label> {item.label}</Checkbox.Label>
        </Checkbox.Root>
      ))}
    </Stack>
  )
})
