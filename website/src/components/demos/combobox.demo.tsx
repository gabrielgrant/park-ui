import { Portal, type CollectionItem } from '@ark-ui/react'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { useState } from 'react'
import { Combobox, IconButton, Input, type ComboboxProps } from '~/components/ui'

const data = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Svelte', value: 'svelte', disabled: true },
  { label: 'Vue', value: 'vue' },
]

export const Demo = (props: ComboboxProps<CollectionItem>) => {
  const [items, setItems] = useState(data)

  const handleChange = (e: any) => {
    const filtered = data.filter((item) => item.label.toLowerCase().includes(e.value.toLowerCase()))
    setItems(filtered.length > 0 ? filtered : data)
  }

  return (
    <Combobox.Root width="2xs" onInputChange={handleChange} {...props} items={items}>
      <Combobox.Label>Framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Select a Framework" asChild>
          <Input />
        </Combobox.Input>
        <Combobox.Trigger asChild>
          <IconButton variant="link" aria-label="open" size="xs">
            <ChevronsUpDownIcon />
          </IconButton>
        </Combobox.Trigger>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.ItemGroup id="framework">
              <Combobox.ItemGroupLabel htmlFor="framework">Frameworks</Combobox.ItemGroupLabel>
              {items.map((item) => (
                <Combobox.Item key={item.value} item={item}>
                  <Combobox.ItemText>{item.label}</Combobox.ItemText>
                  <Combobox.ItemIndicator>
                    <CheckIcon />
                  </Combobox.ItemIndicator>
                </Combobox.Item>
              ))}
            </Combobox.ItemGroup>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}
