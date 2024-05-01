import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

type Props = {
  items: { disabled: boolean; id: string; value: string }[]
}
export const RadioGroupRadix = ({ items }: Props) => (
  <form>
    <RadioGroup.Root
      aria-label={'View density'}
      className={s.RadioGroupRoot}
      defaultValue={'default'}
    >
      {items.map((item, index) => {
        const isDisabled = item.disabled

        return (
          <div className={`${s.RadioGroupContainer} ${isDisabled ? s.disabled : ''}`} key={index}>
            <RadioGroup.Item
              className={s.RadioGroupItem}
              disabled={isDisabled}
              id={item.id}
              tabIndex={index}
              value={item.value}
            >
              <RadioGroup.Indicator className={s.RadioGroupIndicator} />
            </RadioGroup.Item>
            <label className={`${s.Label} ${isDisabled ? s.disabled : ''}`} htmlFor={item.id}>
              {item.value}
            </label>
          </div>
        )
      })}
    </RadioGroup.Root>
  </form>
)
