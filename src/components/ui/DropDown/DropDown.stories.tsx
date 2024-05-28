import type { Meta, StoryObj } from '@storybook/react'

import DropdownMenuDemo from '@/components/ui/DropDown/DropDown'
import DropDownItem from '@/components/ui/DropDown/DropDownItem'

import groupIcon from '../../../assets/icons/WhiteSVG/Group 1399.svg'
import headerIcon1 from '../../../assets/icons/WhiteSVG/Layer 2.svg'
import menuIcon2 from '../../../assets/icons/WhiteSVG/edit-2-outline.svg'
import headerIcon from '../../../assets/icons/WhiteSVG/person-outline.svg'
import menuIcon from '../../../assets/icons/WhiteSVG/trash-outline.svg'
import defaultAvatar from '../../../assets/img/defaultAvatar.png'

const meta = {
  component: DropdownMenuDemo,
  tags: ['autodocs'],
  title: 'Components/DropdownMenuDemo',
} satisfies Meta<typeof DropdownMenuDemo>

export default meta

type Story = StoryObj<typeof DropdownMenuDemo>

export const DropDownHeader: Story = {
  render: () => (
    <DropdownMenuDemo icon={defaultAvatar} type={'head'}>
      <DropDownItem icon={headerIcon} text={'My Profile'} />
      <DropDownItem icon={headerIcon1} text={'My Profile'} />
    </DropdownMenuDemo>
  ),
}

export const DropDownMenu: Story = {
  render: () => (
    <DropdownMenuDemo icon={groupIcon} type={'menu'}>
      <DropDownItem icon={menuIcon} text={'My Profile'} />
      <DropDownItem icon={headerIcon} text={'My Profile'} />
      <DropDownItem icon={menuIcon2} text={'My Profile'} />
    </DropdownMenuDemo>
  ),
}
