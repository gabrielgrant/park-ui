import { useFileUploadContext } from '@ark-ui/qwik/file-upload'
import { component$ } from '@qwik.dev/core'
import { button } from 'styled-system/recipes'
import { FileUpload, XIcon } from '@/components/ui'

const ImageUpIcon = () => (
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
    <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
    <path d="m14 19.5 3-3 3 3" />
    <path d="M17 22v-5.5" />
    <circle cx="9" cy="9" r="2" />
  </svg>
)

export const App = () => {
  return (
    <FileUpload.Root accept="image/*">
      <FileUpload.HiddenInput />
      <FileUpload.Trigger class={button({ variant: 'outline', size: 'sm' })}>
        <ImageUpIcon /> Upload image
      </FileUpload.Trigger>
      <FileUploadList />
    </FileUpload.Root>
  )
}

const FileUploadList = component$(() => {
  const fileUpload = useFileUploadContext()
  const files = fileUpload?.acceptedFiles ?? []
  if (files.length === 0) return null

  return (
    <FileUpload.ItemGroup>
      {files.map((file) => (
        <FileUpload.Item key={file.name} file={file} p="0.5" w="fit-content">
          <FileUpload.ItemPreviewImage />
          <FileUpload.ItemDeleteTrigger
            class={button({ size: '2xs' })}
            px="0"
            py="0"
            borderRadius="full"
            pos="absolute"
            top="-2"
            right="-2"
          >
            <XIcon />
          </FileUpload.ItemDeleteTrigger>
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  )
})
