import { Link } from 'react-router-dom'

import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './DropDown.module.scss'
import style from '@/components/auth/Header/Header.module.scss'

type DropDownItemProps = {
  //! Добавил handleClick, href
  handleOnClick?: () => void
  href?: string
  icon: string
  text: string
}

const DropDownItem = (props: DropDownItemProps) => {
  const { handleOnClick, href, icon, text } = props

  return (
    <DropdownMenu.Item asChild className={s.DropdownMenuItem}>
      {/*! Добавил Button, href, Link*/}
      {href ? (
        <Link className={style.Link} to={href}>
          {/*! Вынес кнопку с Typography в отдельную компоненту*/}
          <DDButton handleOnClick={handleOnClick} icon={icon} text={text} />
        </Link>
      ) : (
        <div>
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
    <Button className={s.button} onClick={handleOnClick}>
      <img alt={''} src={icon} />
      <Typography className={s.dropdownText} variant={'caption'}>
        {text}
      </Typography>
    </Button>
  )
}
export default DropDownItem
