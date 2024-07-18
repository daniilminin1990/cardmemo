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
  )
}

export default ThemeToggle
