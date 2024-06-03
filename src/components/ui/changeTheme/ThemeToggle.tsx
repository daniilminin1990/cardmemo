import { ComponentPropsWithoutRef } from 'react'

import * as RadixToggle from '@radix-ui/react-toggle'

import s from './ThemeToggle.module.scss'

type ToggleProps = {
  moonIcon?: string
  sunIcon?: string
} & ComponentPropsWithoutRef<typeof RadixToggle.Root>

const ThemeToggle = (props: ToggleProps) => {
  const { moonIcon, onPressedChange, pressed, sunIcon, ...rest } = props

  return (
    <div className={s.toggleContainer}>
      <RadixToggle.Root
        {...rest}
        aria-label={'Toggle theme'}
        className={`${s.btn} ${pressed ? s.darkmode : ''}`}
        data-state={pressed ? 'on' : 'off'}
        onPressedChange={onPressedChange}
      >
        <div className={`${s.btnIndicator}`}>
          <div className={s.btnIconContainer}>
            {pressed ? (
              <img alt={'moon'} className={s.moonImg} src={moonIcon} />
            ) : (
              <img alt={'sun'} className={s.sunImg} src={sunIcon} />
            )}
          </div>
        </div>
      </RadixToggle.Root>
    </div>
  )
}

export default ThemeToggle

/*import { ComponentPropsWithoutRef } from 'react'

import * as RadixToggle from '@radix-ui/react-toggle'

import s from './ThemeToggle.module.scss'

type ToggleProps = {
  moonIcon?: string
  sunIcon?: string
} & ComponentPropsWithoutRef<typeof RadixToggle.Root>

const ThemeToggle = (props: ToggleProps) => {
  const { moonIcon, onPressedChange, pressed, sunIcon, ...rest } = props

  return (
    <div className={s.toggleContainer}>
      <RadixToggle.Root
        {...rest}
        aria-label={'Toggle theme'}
        className={`${s.btn} ${pressed ? s.darkmode : ''}`}
        data-state={pressed ? 'on' : 'off'}
        onPressedChange={onPressedChange}
      >
        <div className={`${s['btn__indicator']}`}>
          <div className={s['btn__icon-container']}>
            {pressed ? (
              <img alt={'moon'} className={s['moonImg']} src={moonIcon} tabIndex={0} />
            ) : (
              <img alt={'sun'} className={s['sunImg']} src={sunIcon} tabIndex={0} />
            )}
          </div>
        </div>
      </RadixToggle.Root>
    </div>
  )
}

export default ThemeToggle*/
