import * as FileUpload from '../file-upload'

export const ComponentUnderTest = (props: Partial<FileUpload.RootProps>) => (
  <FileUpload.Root {...props}>
    <FileUpload.Label>Upload file</FileUpload.Label>
    <FileUpload.HiddenInput data-testid="hidden-input" />
    <FileUpload.Dropzone>Drag and drop files here</FileUpload.Dropzone>
    <FileUpload.Trigger data-testid="trigger">
      <FileUpload.FileText data-testid="file-text" />
    </FileUpload.Trigger>
    <FileUpload.ClearTrigger>Clear</FileUpload.ClearTrigger>
    <FileUpload.List clearable showSize />
  </FileUpload.Root>
)
