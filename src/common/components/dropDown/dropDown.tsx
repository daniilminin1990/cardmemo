import React, { ReactNode } from 'react'

import Typography from '@/common/components/typography/typography'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import './dropDown.scss'

type DropdownMenuDemoProps = {
  children: ReactNode
  email: string
  icon?: string
  name: string
  type: 'head' | 'menu'
}

const DropdownMenuDemo = (props: DropdownMenuDemoProps) => {
  const { children, email, icon, name, type } = props

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button aria-label={'Customise options'} className={'IconButton'}>
          <img alt={''} className={'dropdownHeaderImg'} src={icon} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={type === 'menu' ? 'DropdownMenuContentForMenu' : 'DropdownMenuContent'}
          sideOffset={5}
        >
          {type === 'head' && (
            <div className={'header'}>
              <img alt={''} src={icon} style={{ height: '35px', width: '35px' }} />
              <div>
                <Typography className={'dropdownTextHeader'} variant={'subtitle1'}>
                  {name}
                </Typography>
                <Typography className={'dropdownTextHeader'} variant={'caption'}>
                  {email}
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
