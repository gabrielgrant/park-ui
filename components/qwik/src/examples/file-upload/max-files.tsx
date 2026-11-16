import { button } from 'styled-system/recipes'
import { FileIcon, FileUpload } from '@/components/ui'

export const App = () => {
  return (
    <FileUpload.Root maxFiles={3}>
      <FileUpload.HiddenInput />
      <FileUpload.Trigger class={button({ variant: 'outline', size: 'sm' })}>
        <FileIcon /> Upload file
      </FileUpload.Trigger>
      <FileUpload.List clearable showSize />
    </FileUpload.Root>
  )
}
