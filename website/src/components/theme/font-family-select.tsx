import { Portal } from '@ark-ui/react'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { Select } from '~/components/ui/select'
import { useThemeGenerator } from '~/lib/use-theme-generator'

export const FontFamilySelect = () => {
  const { currentFontFamily, fontFamilies, updateFontFamily } = useThemeGenerator()

  return (
    <Select.Root
      items={fontFamilies}
      value={[currentFontFamily.value]}
      // @ts-expect-error
      onValueChange={(e) => updateFontFamily(e.items[0])}
      positioning={{ sameWidth: true }}
      size="sm"
    >
      <Select.Label>Font Family</Select.Label>
      <Select.Trigger>
        <Select.ValueText />
        <ChevronsUpDownIcon />
      </Select.Trigger>
      <Portal>
        <Select.Positioner>
          <Select.Content zIndex={100}>
            {fontFamilies.map((fontFamily, id) => (
              <Select.Item key={id} item={fontFamily}>
                <Select.ItemText>{fontFamily.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}
