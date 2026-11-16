import { FileUpload, useFileUploadContext } from '@ark-ui/qwik/file-upload'
import { component$ } from '@qwik.dev/core'
import { createStyleContext, Stack } from 'styled-system/jsx'
import { fileUpload } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { FileIcon, XIcon } from './icons'
import { Span } from './span'

const { withProvider, withContext } = createStyleContext(fileUpload)

export type RootProps = ComponentProps<typeof Root>
export type ItemProps = ComponentProps<typeof Item>

export const Root = withProvider(FileUpload.Root, 'root')
export const ClearTrigger = withContext(FileUpload.ClearTrigger, 'clearTrigger')
export const Dropzone = withContext(FileUpload.Dropzone, 'dropzone')
export const HiddenInput = FileUpload.HiddenInput
export const Item = withContext(FileUpload.Item, 'item')
export const ItemDeleteTrigger = withContext(FileUpload.ItemDeleteTrigger, 'itemDeleteTrigger', {
  defaultProps: { children: <XIcon /> },
})
export const ItemGroup = withContext(FileUpload.ItemGroup, 'itemGroup')
export const ItemName = withContext(FileUpload.ItemName, 'itemName')
export const ItemPreview = withContext(FileUpload.ItemPreview, 'itemPreview', {
  defaultProps: { children: <FileIcon /> },
})
export const ItemPreviewImage = withContext(FileUpload.ItemPreviewImage, 'itemPreviewImage')
export const ItemSizeText = withContext(FileUpload.ItemSizeText, 'itemSizeText')
export const Label = withContext(FileUpload.Label, 'label')
export const Trigger = withContext(FileUpload.Trigger, 'trigger')

interface ItemsBaseProps {
  showSize?: boolean | undefined
  clearable?: boolean | undefined
  files?: File[] | undefined
}

interface ItemsProps extends Omit<ItemProps, 'file'>, ItemsBaseProps {}

export const Items = component$<ItemsProps>((props) => {
  const { showSize, clearable, files, ...rest } = props
  const fileUpload = useFileUploadContext()
  const acceptedFiles = files ?? fileUpload?.acceptedFiles ?? []

  return (
    <>
      {acceptedFiles.map((file) => (
        <Item key={`${file.name}-${file.size}-${file.lastModified}`} file={file} {...rest}>
          <ItemPreview />
          <Stack gap="0.5" flex="1">
            <ItemName />
            {showSize && <ItemSizeText />}
          </Stack>
          {clearable && <ItemDeleteTrigger />}
        </Item>
      ))}
    </>
  )
})

interface FileUploadListProps extends ItemsBaseProps {}

export const List = (props: FileUploadListProps) => {
  const { showSize, clearable, files, ...rest } = props

  return (
    <ItemGroup {...rest}>
      <Items showSize={showSize} clearable={clearable} files={files} />
    </ItemGroup>
  )
}

export interface FileTextProps extends HTMLStyledProps<'span'> {
  fallback?: string | undefined
}

export const FileText = component$<FileTextProps>((props) => {
  const { fallback = 'Select file(s)', ...rest } = props
  const fileUpload = useFileUploadContext()
  const files = fileUpload?.acceptedFiles ?? []

  const fileText =
    files.length === 1 ? files[0].name : files.length > 1 ? `${files.length} files` : fallback

  const placeholderProps = { 'data-placeholder': fileText === fallback ? '' : undefined }

  return (
    <Span data-scope="file-upload" data-part="file-text" {...placeholderProps} {...rest}>
      {fileText}
    </Span>
  )
})
