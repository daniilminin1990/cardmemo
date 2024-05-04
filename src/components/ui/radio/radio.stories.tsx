import { Radio } from '@/components/ui/radio/radio'

const meta = {
  component: Radio,
  tags: ['autodocs'],
  title: 'Components/Radio',
}

export default meta

export const DefaultGroup = () => {
  return (
    <Radio.Root>
      <Radio.Body>
        <Radio.Item tabIndex={1} value={'1'}>
          <Radio.Span />
        </Radio.Item>
        <Radio.Label label={'one'} value={'1'} />
      </Radio.Body>
      <Radio.Body>
        <Radio.Item tabIndex={2} value={'2'}>
          <Radio.Span />
        </Radio.Item>
        <Radio.Label label={'two'} value={'2'} />
      </Radio.Body>
      <Radio.Body>
        <Radio.Item tabIndex={3} value={'3'}>
          <Radio.Span />
        </Radio.Item>
        <Radio.Label label={'three'} value={'3'} />
      </Radio.Body>
    </Radio.Root>
  )
}

export const Default = () => {
  return (
    <Radio.Root>
      <Radio.Body>
        <Radio.Item tabIndex={1} value={'1'}>
          <Radio.Span />
        </Radio.Item>
        <Radio.Label label={'common'} value={'1'} />
      </Radio.Body>
    </Radio.Root>
  )
}

export const Disabled = () => {
  return (
    <Radio.Root>
      <Radio.Body isDisabled>
        <Radio.Item isDisabled tabIndex={5} value={'5'}>
          <Radio.Span />
        </Radio.Item>
        <Radio.Label isDisabled label={'disabled'} value={'5'} />
      </Radio.Body>
    </Radio.Root>
  )
}
