import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import { Button } from '@/components/ui/button'
import { FileUploader } from '@/components/ui/file-uploader/file-uploader'
import { Meta } from '@storybook/react'

const meta = {
  component: FileUploader,
  tags: ['autodocs'],
  title: 'Components/FileUploader',
} satisfies Meta<typeof FileUploader>

export default meta

export const DefaultModeButton = {
  render: () => {
    return <FileUploader name={'file'} onChange={() => {}} />
  },
}

export const FullWidthButton = {
  render: () => {
    return (
      <FileUploader as={Button} fullWidth name={'file'} onChange={() => {}}>
        Choose File
      </FileUploader>
    )
  },
}

export const IconButtonUploader = {
  render: () => {
    return <FileUploader as={Button} icon={<Edit2Outline />} name={'file'} onChange={() => {}} />
  },
}
