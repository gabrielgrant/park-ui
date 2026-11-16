import { Box } from 'styled-system/jsx'
import { FileIcon, FileUpload, Icon } from '@/components/ui'

export const App = () => {
  return (
    <FileUpload.Root>
      <FileUpload.HiddenInput />
      <FileUpload.Dropzone>
        <Icon as={FileIcon} color="fg.muted" size="lg" mb="4" />
        <Box>Drag and drop files here</Box>
        <Box color="fg.muted">.png, .jpg up to 5MB</Box>
      </FileUpload.Dropzone>
      <FileUpload.List />
    </FileUpload.Root>
  )
}
