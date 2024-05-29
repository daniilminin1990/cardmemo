import { useTranslation } from 'react-i18next'

import ellipseIcon from '@/assets/icons/WhiteSVG/Ellipse 1.svg'
import headerIcon1 from '@/assets/icons/WhiteSVG/Layer 2.svg'
import DropdownMenuDemo from '@/components/ui/DropDown/DropDown'
import DropDownItem from '@/components/ui/DropDown/DropDownItem'

const LocaleSwitcher = () => {
  const { i18n } = useTranslation()

  return (
    <>
      <DropdownMenuDemo icon={ellipseIcon} type={'menu'}>
        <DropDownItem
          handleOnClick={() => i18n.changeLanguage('en')}
          icon={headerIcon1}
          text={'English'}
        />
        <DropDownItem
          handleOnClick={() => i18n.changeLanguage('ru')}
          icon={headerIcon1}
          text={'Russian'}
        />
      </DropdownMenuDemo>
    </>
  )
}

export default LocaleSwitcher
