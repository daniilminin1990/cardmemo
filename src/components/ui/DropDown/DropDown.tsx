import React, { ReactNode } from 'react'

import Typography from '@/components/ui/Typography/Typography'
import { MeResponse } from '@/services/auth/auth.types'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import './DropDown.scss'

type DropdownMenuDemoProps = {
  children: ReactNode
  //! Добавил data
  data?: MeResponse
  icon: string
  type: 'head' | 'menu'
}

const DropdownMenuDemo = (props: DropdownMenuDemoProps) => {
  const { children, data, icon, type } = props

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button aria-label={'Customise options'} className={'IconButton'}>
          <div className={'imgBox'}>
            {/*! Добавил картинку поменял И СТИЛИ*/}
            <img alt={''} className={'dropdownHeaderImg'} src={data?.avatar ?? icon} />
          </div>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={type === 'menu' ? 'DropdownMenuContentForMenu' : 'DropdownMenuContent'}
          sideOffset={5}
        >
          {type === 'head' && (
            <div className={'header'}>
              {/*! Добавил Картинку заменил*/}
              <img alt={''} src={data?.avatar ?? icon} />
              <div>
                <Typography className={'dropdownTextHeader'} variant={'subtitle1'}>
                  {/*! Добавил Вот это заменил*/}
                  {data?.name ?? 'Ivan'}
                </Typography>
                <Typography className={'dropdownTextHeader'} variant={'caption'}>
                  {/*! Добавил Вот это заменил*/}
                  {data?.email ?? '@mail.ru'}
                </Typography>
              </div>
            </div>
          )}

          {React.Children.toArray(children).map((child, index) => (
            <React.Fragment key={index}>
              {type === 'menu' && index !== 0 ? (
                <DropdownMenu.Separator className={'DropdownMenuSeparator'} />
              ) : (
                ''
              )}
              {type === 'head' && <DropdownMenu.Separator className={'DropdownMenuSeparator'} />}
              {child}
            </React.Fragment>
          ))}

          <DropdownMenu.Arrow className={'DropdownMenuArrow'} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default DropdownMenuDemo
