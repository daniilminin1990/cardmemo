import type { Meta, StoryObj } from '@storybook/react'

import DropdownMenuDemo from '@/components/ui/DropDown/DropDown'
import DropDownItem from '@/components/ui/DropDown/DropDownItem'

import headerIcon1 from '../../../assets/icons/WhiteSVG/Layer 2.svg'
import menuIcon2 from '../../../assets/icons/WhiteSVG/edit-2-outline.svg'
import headerIcon from '../../../assets/icons/WhiteSVG/person-outline.svg'
import menuIcon1 from '../../../assets/icons/WhiteSVG/person-outline.svg'
import menuIcon from '../../../assets/icons/WhiteSVG/trash-outline.svg'

const meta = {
  component: DropdownMenuDemo,
  tags: ['autodocs'],
  title: 'Components/DropdownMenuDemo',
} satisfies Meta<typeof DropdownMenuDemo>

export default meta

type Story = StoryObj<typeof DropdownMenuDemo>

export const DropDownHeader: Story = {
  render: () => (
    <DropdownMenuDemo type={'head'}>
      <DropDownItem icon={headerIcon} text={'My Profile'} />
      <DropDownItem icon={headerIcon1} text={'My Profile'} />
    </DropdownMenuDemo>
  ),
}

export const DropDownMenu: Story = {
  render: () => (
    <DropdownMenuDemo type={'menu'}>
      <DropDownItem icon={menuIcon} text={'My Profile'} />
      <DropDownItem icon={menuIcon1} text={'My Profile'} />
      <DropDownItem icon={menuIcon2} text={'My Profile'} />
    </DropdownMenuDemo>
  ),
}
