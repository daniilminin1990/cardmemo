import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Theme, selectTheme } from '@/app/model'
import { setTheme } from '@/app/model/app.slice'
import { useAppSelector } from '@/app/store/store'
import { changeTheme } from '@/common/utils/utillThemeChanger'
import ToggleDemo from '@/components/ui/changeTheme/ThemeToggle'

import style from './ChangeTheme.module.scss'

import moon from '../../../assets/ChangeTheme/moonIcon.png'
import sun from '../../../assets/ChangeTheme/sunIcon.png'

const ChangeTheme = () => {
  const theme = useAppSelector(selectTheme)
  const dispatch = useDispatch()

  useEffect(() => {
    const storedTheme: Theme = localStorage.getItem('theme') as Theme

    if (theme && storedTheme) {
      dispatch(setTheme({ theme: storedTheme }))
      updateThemeColors(storedTheme)
    }
  }, [theme])

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (!theme) {
        return
      } // Add this line to check if context is undefined

      if (event.key === 'theme') {
        const newTheme = localStorage.getItem('theme') as Theme

        dispatch(setTheme({ theme: newTheme }))
        updateThemeColors(newTheme)
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [theme]) // Make sure to include context in the dependency array

  const onChangeThemeHandler = () => {
    if (!theme) {
      return
    } // Add this line to check if context is undefined
    const newTheme = theme === 'moon' ? 'sun' : 'moon'

    dispatch(setTheme({ theme: newTheme }))
    localStorage.setItem('theme', newTheme)
    updateThemeColors(newTheme)
  }

  const updateThemeColors = (theme: Theme) => {
    const newThemeColors =
      theme === 'sun'
        ? {
            'color-border-dark': '#000000',
            //dark
            'color-dark-100': '#c3c1c7',
            'color-dark-300': '#dcdae0',
            'color-dark-500': '#f4f2fa',
            'color-dark-700': '#f9f7ff',
            'color-dark-900': '#fff',
            // light
            'color-light-100': '#000000',
            'color-light-300': '#171717',
            'color-light-500': '#333',
            'color-light-700': '#4c4c4c',
            'color-light-900': '#a8afcc',
          }
        : {
            'color-border-dark': '#ffffff',
            //dark
            'color-dark-100': '#a8afcc',
            'color-dark-300': '#4c4c4c',
            'color-dark-500': '#333',
            'color-dark-700': '#171717',
            'color-dark-900': '#000000',
            // light
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
        pressed={theme === 'moon'}
        sunIcon={sun}
      />
    </div>
  )
}

export default ChangeTheme
