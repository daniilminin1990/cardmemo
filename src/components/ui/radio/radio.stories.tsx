import { useForm } from 'react-hook-form'

import { Radio } from '@/components/ui/radio/radio'

const meta = {
  component: Radio,
  tags: ['autodocs'],
  title: 'Components/Radio',
}

export default meta

export const DefaultGroup = () => {
  const { control } = useForm()

  return (
    <Radio.Root control={control} defaultValue={'default'} name={'radio'}>
      <Radio.Body>
        <Radio.Item value={'1'}>
          <Radio.Span />
        </Radio.Item>
        <Radio.Label label={'one'} value={'1'} />
      </Radio.Body>
      <Radio.Body>
        <Radio.Item value={'2'}>
          <Radio.Span />
        </Radio.Item>
        <Radio.Label label={'two'} value={'2'} />
      </Radio.Body>
      <Radio.Body>
        <Radio.Item value={'3'}>
          <Radio.Span />
        </Radio.Item>
        <Radio.Label label={'three'} value={'3'} />
      </Radio.Body>
    </Radio.Root>
  )
}

export const Default = () => {
  const { control } = useForm()

  return (
    <Radio.Root control={control} defaultValue={'default'} name={'radio'}>
      <Radio.Body>
        <Radio.Item value={'1'}>
          <Radio.Span />
        </Radio.Item>
        <Radio.Label label={'common'} value={'1'} />
      </Radio.Body>
    </Radio.Root>
  )
}

export const Disabled = () => {
  const { control } = useForm()

  return (
    <Radio.Root control={control} defaultValue={'default'} name={'radio'}>
      <Radio.Body isDisabled>
        <Radio.Item isDisabled value={'5'}>
          <Radio.Span />
        </Radio.Item>
        <Radio.Label isDisabled label={'disabled'} value={'5'} />
      </Radio.Body>
    </Radio.Root>
  )
}
