import DropdownMenuDemo from '@/components/ui/DropDown/DropDown'
import DropDownItem from '@/components/ui/DropDown/DropDownItem'
import Input from '@/components/ui/Input/Input'

import headerIcon from '../src/assets/icons/WhiteSVG/Ellipse 1.svg'
import menuIcon from '../src/assets/icons/WhiteSVG/Group 1399.svg'
import icon1 from '../src/assets/icons/WhiteSVG/Layer 2.svg'
import icon from '../src/assets/icons/WhiteSVG/person-outline.svg'
export function App() {
  return (
    <>
      <Input disabled={false} placeholder={'Input'} type={'text'} />

      <div>
        <DropdownMenuDemo icon={menuIcon} type={'menu'}>
          <DropDownItem icon={icon} text={'My Profile'} />
          <DropDownItem icon={icon1} text={'My Profile'} />
        </DropdownMenuDemo>
      </div>
    </>
  )
}
