import React, { useContext, useEffect } from 'react'

import { changeTheme } from '@/common/utillThemeChanger'
import { UserContext } from '@/components/ui/changeTheme/Context'
import ToggleDemo from '@/components/ui/changeTheme/toggle'

import style from './ChangeTheme.module.scss'

import moon from '../../../assets/ChangeTheme/moonIconv2.png'
import sun from '../../../assets/ChangeTheme/sunIconv2.png'

export type Theme = 'moon' | 'sun'

const ChangeTheme = () => {
  const context = useContext(UserContext)

  useEffect(() => {
    const storedTheme: Theme = localStorage.getItem('theme') as Theme

    if (storedTheme) {
      context?.setTheme(storedTheme)
      updateThemeColors(storedTheme)
    }
  }, [context])

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'theme') {
        const newTheme = localStorage.getItem('theme') as Theme

        context?.setTheme(newTheme)
        updateThemeColors(newTheme)
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [context])

  const onChangeThemeHandler = () => {
    const newTheme = context?.theme === 'moon' ? 'sun' : 'moon'

    context?.setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    updateThemeColors(newTheme)
  }

  const updateThemeColors = (theme: Theme) => {
    const newThemeColors =
      theme === 'sun'
        ? {
            'color-dark-100': '#4f4f4f',
            'color-dark-300': '#cccccc',
            'color-dark-500': '#999',
            'color-dark-700': '#666',
            'color-dark-900': '#e6e6e6',
            'color-light-100': '#212846',
            'color-light-300': '#4c4c4c',
            'color-light-500': '#333',
            'color-light-700': '#171717',
            'color-light-900': '#000000',
          }
        : {
            'color-dark-100': '#60636a',
            'color-dark-300': '#4c4c4c',
            'color-dark-500': '#333',
            'color-dark-700': '#171717',
            'color-dark-900': '#000000',
            'color-light-100': '#fff',
            'color-light-300': '#f9f7ff',
            'color-light-500': '#f4f2fa',
            'color-light-700': '#dcdae0',
            'color-light-900': '#c3c1c7',
          }

    changeTheme(newThemeColors)
  }

  return (
    <div className={style.box}>
      <ToggleDemo
        moonIcon={moon}
        onPressedChange={onChangeThemeHandler}
        pressed={context?.theme === 'moon'}
        sunIcon={sun}
      />
    </div>
  )
}

export default ChangeTheme
