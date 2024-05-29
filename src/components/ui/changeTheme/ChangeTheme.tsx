import { useContext } from 'react'

import { changeTheme } from '@/common/utillThemeChanger'
import { UserContext } from '@/components/ui/changeTheme/Context'

import style from './ChangeTheme.module.scss'

import moon from '../../../assets/ChangeTheme/moonIcon.png'
import sun from '../../../assets/ChangeTheme/sun.png'
const ChangeTheme = () => {
  const context = useContext(UserContext)
  const onChangeThemeHandlerSun = () => {
    context?.setTheme(context?.theme === 'moon' ? 'sun' : 'moon')
    const newThemeColors = {
      'color-dark-100': '#e6e6e6',
      'color-dark-300': '#cccccc',
    }

    changeTheme(newThemeColors)
  }
  const onChangeThemeHandlerMoon = () => {
    context?.setTheme(context?.theme === 'moon' ? 'sun' : 'moon')
    const newThemeColors = {
      'color-dark-100': '#a8afcc',
      'color-dark-300': '#4c4c4c',
      'color-dark-500': '#333',
      'color-dark-700': '#171717',
      'color-dark-900': '#000000',
    }

    changeTheme(newThemeColors)
  }

  return (
    <div className={style.box}>
      {context?.theme === 'moon' ? (
        <img alt={'moon'} className={style.moonImg} onClick={onChangeThemeHandlerMoon} src={moon} />
      ) : (
        <img alt={'sun'} className={style.sunImg} onClick={onChangeThemeHandlerSun} src={sun} />
      )}
    </div>
  )
}

export default ChangeTheme
