import { button, input } from 'styled-system/recipes'
import { FileUpload, InputGroup, XIcon } from '@/components/ui'

const FileUpIcon = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
    <path d="M14 2v5a1 1 0 0 0 1 1h5" />
    <path d="M12 12v6" />
    <path d="m15 15-3-3-3 3" />
  </svg>
)

export const App = () => {
  return (
    <FileUpload.Root gap="1.5">
      <FileUpload.HiddenInput />
      <FileUpload.Label>Upload file</FileUpload.Label>
      <InputGroup
        startElement={<FileUpIcon />}
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
