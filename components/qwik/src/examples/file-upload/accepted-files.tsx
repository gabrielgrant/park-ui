import { button } from 'styled-system/recipes'
import { FileIcon, FileUpload } from '@/components/ui'

export const App = () => {
  return (
    <FileUpload.Root accept={['image/png']}>
      <FileUpload.HiddenInput />
      <FileUpload.Trigger class={button({ variant: 'outline', size: 'sm' })}>
        <FileIcon /> Upload image
      </FileUpload.Trigger>
      <FileUpload.List clearable showSize />
    </FileUpload.Root>
  )
}
