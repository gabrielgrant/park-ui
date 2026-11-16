import { useFileUploadContext } from '@ark-ui/qwik/file-upload'
import { component$ } from '@qwik.dev/core'
import { button } from 'styled-system/recipes'
import { FileIcon, FileUpload, XIcon } from '@/components/ui'

export const App = () => {
  return (
    <FileUpload.Root accept="image/*">
      <FileUpload.HiddenInput />
      <FileUpload.Trigger class={button({ variant: 'outline', size: 'sm' })}>
        <FileIcon /> Upload image
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
