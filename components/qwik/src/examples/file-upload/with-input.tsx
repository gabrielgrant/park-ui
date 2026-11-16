import { button, input } from 'styled-system/recipes'
import { FileIcon, FileUpload, InputGroup, XIcon } from '@/components/ui'

export const App = () => {
  return (
    <FileUpload.Root gap="1.5">
      <FileUpload.HiddenInput />
      <FileUpload.Label>Upload file</FileUpload.Label>
      <InputGroup
        startElement={<FileIcon />}
        endElement={
          <FileUpload.ClearTrigger
            class={button({ size: 'xs', variant: 'plain' })}
            colorPalette="gray"
            px="0"
            py="0"
            me="-2"
            aria-label="Close"
          >
            <XIcon />
          </FileUpload.ClearTrigger>
        }
      >
        <FileUpload.Trigger class={input()}>
          <FileUpload.FileText lineClamp={1} />
        </FileUpload.Trigger>
      </InputGroup>
    </FileUpload.Root>
  )
}
