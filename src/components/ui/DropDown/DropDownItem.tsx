import { ElementType } from 'react'

import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './DropDown.module.scss'

type DropDownItemProps = {
  //! Добавил as, чтобы кидать в Button
  as?: ElementType
  //! Добавил handleClick
  handleOnClick?: () => void
  href?: string
  icon: string
  text: string
}

const DropDownItem = (props: DropDownItemProps) => {
  const { as, handleOnClick, href, icon, text } = props

  return (
    <div className={s.DropdownMenuItemBox}>
      <DropdownMenu.Item className={s.DropdownMenuItem}>
        {/*! Добавил Button*/}
        <Button
          as={as}
          href={href}
          onClick={handleOnClick}
          style={{ alignItems: 'center', all: 'unset', display: 'flex' }}
        >
          <img alt={''} src={icon} />
          <Typography className={s.dropdownText} variant={'caption'}>
            {text}
          </Typography>
        </Button>
      </DropdownMenu.Item>
    </div>
  )
}

export default DropDownItem
