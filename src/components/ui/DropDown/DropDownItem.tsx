import React from 'react'
import { Link } from 'react-router-dom'

import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import s from './DropDown.module.scss'
import style from '@/components/Layout/Header/Header.module.scss'

type DropDownItemProps = {
  //! Добавил handleClick, href
  handleOnClick?: () => void
  href?: string
  icon: string
  text: string
}

const DropDownItem = (props: DropDownItemProps) => {
  const { handleOnClick, href, icon, text } = props
  const handleKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement | HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleOnClick?.()
    }
  }

  return (
    <DropdownMenu.Item asChild className={s.DropdownMenuItem}>
      {href ? (
        <Link className={style.Link} onKeyDown={handleKeyDown} to={href}>
          <DDButton handleOnClick={handleOnClick} icon={icon} text={text} />
        </Link>
      ) : (
        <div onKeyDown={handleKeyDown}>
          <DDButton handleOnClick={handleOnClick} icon={icon} text={text} />
        </div>
      )}
    </DropdownMenu.Item>
  )
}

type DropDownButtonProps = {
  handleOnClick?: () => void
  icon: string
  text: string
}
export const DDButton = ({ handleOnClick, icon, text }: DropDownButtonProps) => {
  return (
    <Button className={clsx(s.button, s.noHover)} onClick={handleOnClick} variant={'outlined'}>
      <img alt={''} className={style.DDButtonImg} src={icon} />
      <Typography className={s.dropdownText} variant={'caption'}>
        {text}
      </Typography>
    </Button>
  )
}
export default DropDownItem
