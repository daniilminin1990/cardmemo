import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

type Props = {
  namesArr: string[]
}

export const RadioGroupRadix = ({ namesArr }: Props) => (
  <form>
    <RadioGroup.Root
      aria-label={'View density'}
      className={s.RadioGroupRoot}
      defaultValue={'default'}
    >
      {namesArr.map((name, index) => (
        <div className={s.RadioGroupContainer} key={index}>
          <RadioGroup.Item
            className={s.RadioGroupItem}
            id={`${name}${index}`}
            tabIndex={index}
            value={name}
          >
            <RadioGroup.Indicator className={s.RadioGroupIndicator} />
          </RadioGroup.Item>
          <label className={s.Label} htmlFor={`${name}${index}`}>
            {name}
          </label>
        </div>
      ))}
      {/*<div className={s.RadioGroupContainer}>*/}
      {/*  <RadioGroup.Item className={s.RadioGroupItem} id={'r1'} tabIndex={1} value={'Did not know'}>*/}
      {/*    <RadioGroup.Indicator className={s.RadioGroupIndicator} />*/}
      {/*  </RadioGroup.Item>*/}
      {/*  <label className={s.Label} htmlFor={'r1'}>*/}
      {/*    Did not know*/}
      {/*  </label>*/}
      {/*</div>*/}
      {/*<div className={s.RadioGroupContainer}>*/}
      {/*  <RadioGroup.Item className={s.RadioGroupItem} id={'r2'} tabIndex={2} value={'comfortable'}>*/}
      {/*    <RadioGroup.Indicator className={s.RadioGroupIndicator} />*/}
      {/*  </RadioGroup.Item>*/}
      {/*  <label className={s.Label} htmlFor={'r2'}>*/}
      {/*    Forgot*/}
      {/*  </label>*/}
      {/*</div>*/}
      {/*<div className={s.RadioGroupContainer}>*/}
      {/*  <RadioGroup.Item*/}
      {/*    className={s.RadioGroupItem}*/}
      {/*    id={'r3'}*/}
      {/*    tabIndex={3}*/}
      {/*    value={'          A lot of thought'}*/}
      {/*  >*/}
      {/*    <RadioGroup.Indicator className={s.RadioGroupIndicator} />*/}
      {/*  </RadioGroup.Item>*/}
      {/*  <label className={s.Label} htmlFor={'r3'}>*/}
      {/*    A lot of thought*/}
      {/*  </label>*/}
      {/*</div>*/}
      {/*<div className={`${s.RadioGroupContainer} ${s.disabled}`}>*/}
      {/*  <RadioGroup.Item*/}
      {/*    className={s.RadioGroupItem}*/}
      {/*    disabled*/}
      {/*    id={'r4'}*/}
      {/*    tabIndex={4}*/}
      {/*    value={'Confused'}*/}
      {/*  >*/}
      {/*    <RadioGroup.Indicator className={s.RadioGroupIndicator} />*/}
      {/*  </RadioGroup.Item>*/}
      {/*  <label className={`${s.Label} ${s.disabled}`} htmlFor={'r4'}>*/}
      {/*    Confused*/}
      {/*  </label>*/}
      {/*</div>*/}
      {/*<div className={s.RadioGroupContainer}>*/}
      {/*  <RadioGroup.Item*/}
      {/*    className={s.RadioGroupItem}*/}
      {/*    id={'r5'}*/}
      {/*    tabIndex={5}*/}
      {/*    value={'Knew the answer'}*/}
      {/*  >*/}
      {/*    <RadioGroup.Indicator className={s.RadioGroupIndicator} />*/}
      {/*  </RadioGroup.Item>*/}
      {/*  <label className={s.Label} htmlFor={'r5'}>*/}
      {/*    Knew the answer*/}
      {/*  </label>*/}
      {/*</div>*/}
    </RadioGroup.Root>
  </form>
)

// export default RadioGroupRadix
