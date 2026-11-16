import { button } from 'styled-system/recipes'
import { FileIcon, FileUpload } from '@/components/ui'

export const App = () => {
  return (
    <FileUpload.Root capture="environment">
      <FileUpload.HiddenInput />
      <FileUpload.Trigger class={button({ variant: 'outline', size: 'sm' })}>
        <FileIcon /> Take picture
      </FileUpload.Trigger>
      <FileUpload.List />
    </FileUpload.Root>
  )
}
