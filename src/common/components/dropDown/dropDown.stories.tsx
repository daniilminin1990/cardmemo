import type { Meta, StoryObj } from '@storybook/react'

import DropdownMenuDemo from '@/common/components/dropDown/dropDown'
import DropDownItem from '@/common/components/dropDown/dropDownItem'

import ellipseIcon from '../../../assets/icons/WhiteSVG/Ellipse 1.svg'
import groupIcon from '../../../assets/icons/WhiteSVG/Group 1399.svg'
import headerIcon1 from '../../../assets/icons/WhiteSVG/Layer 2.svg'
import menuIcon2 from '../../../assets/icons/WhiteSVG/edit-2-outline.svg'
import headerIcon from '../../../assets/icons/WhiteSVG/person-outline.svg'
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
    <DropdownMenuDemo icon={ellipseIcon} type={'head'}>
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
