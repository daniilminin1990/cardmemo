import React, { ReactNode } from 'react'

import Typography from '@/components/ui/Typography/Typography'
import { MeResponse } from '@/services/auth/auth.types'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

// ! Изменил стили на module scss
import s from './DropDown.module.scss'

type DropdownMenuDemoProps = {
  children: ReactNode
  className?: string
  //! Добавил data
  data?: MeResponse
  icon: string
  type: 'head' | 'menu'
}

const DropdownMenuDemo = (props: DropdownMenuDemoProps) => {
  const { children, className, data, icon, type } = props

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button aria-label={'Customise options'} className={s.IconButton}>
          <div className={s.imgBox}>
            {/*! Добавил картинку поменял И СТИЛИ*/}
            <img
              alt={''}
              className={clsx(s.dropdownHeaderImg, className)}
              src={data?.avatar ?? icon}
            />
          </div>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={type === 'menu' ? s.DropdownMenuContentForMenu : s.DropdownMenuContent}
          sideOffset={5}
        >
          {type === 'head' && (
            <div className={s.header}>
              {/*! Добавил Картинку заменил*/}
              <img alt={''} src={data?.avatar ?? icon} />
              <div>
                <Typography className={s.dropdownTextHeader} variant={'subtitle1'}>
                  {/*! Добавил Вот это заменил*/}
                  {data?.name ?? 'Ivan'}
                </Typography>
                <Typography className={s.dropdownTextHeader} variant={'caption'}>
                  {/*! Добавил Вот это заменил*/}
                  {data?.email ?? '@mail.ru'}
                </Typography>
              </div>
            </div>
          )}

          {React.Children.toArray(children).map((child, index) => (
            <React.Fragment key={index}>
              {type === 'menu' && index !== 0 && (
                <DropdownMenu.Separator className={s.DropdownMenuSeparator} />
              )}
              {type === 'head' && <DropdownMenu.Separator className={s.DropdownMenuSeparator} />}
              {child}
            </React.Fragment>
          ))}

          <DropdownMenu.Arrow className={s.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default DropdownMenuDemo
