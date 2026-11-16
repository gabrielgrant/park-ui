import { button } from 'styled-system/recipes'
import { FileIcon, FileUpload } from '@/components/ui'

export const App = () => {
  return (
    <FileUpload.Root directory>
      <FileUpload.HiddenInput />
      <FileUpload.Trigger class={button({ variant: 'outline', size: 'sm' })}>
        <FileIcon /> Upload directory
      </FileUpload.Trigger>
      <FileUpload.List />
    </FileUpload.Root>
  )
}
