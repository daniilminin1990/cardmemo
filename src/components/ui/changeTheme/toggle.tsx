import { ComponentPropsWithoutRef } from 'react'

import * as RadixToggle from '@radix-ui/react-toggle'

import styles from './Toggle.module.scss'

type ToggleProps = {
  moonIcon: string
  sunIcon: string
} & ComponentPropsWithoutRef<typeof RadixToggle.Root>

const ThemeToggle = (props: ToggleProps) => {
  const { moonIcon, onPressedChange, pressed, sunIcon, ...rest } = props

  return (
    <div className={styles.toggleContainer} tabIndex={0}>
      <RadixToggle.Root
        aria-label={'Toggle theme'}
        className={`${styles.btn} ${pressed ? styles.darkmode : ''}`}
        data-state={pressed ? 'on' : 'off'}
        onPressedChange={onPressedChange}
      >
        <div className={styles['btn__indicator']}>
          <div className={styles['btn__icon-container']}>
            {pressed ? (
              <img alt={'moon'} className={styles['moonImg']} src={moonIcon} />
            ) : (
              <img alt={'sun'} className={styles['sunImg']} src={sunIcon} />
            )}
          </div>
        </div>
      </RadixToggle.Root>
    </div>
  )
}

export default ThemeToggle
