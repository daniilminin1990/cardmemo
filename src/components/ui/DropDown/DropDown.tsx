import React, { ReactNode } from 'react'

import Typography from '@/components/ui/Typography/Typography'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import './DropDown.scss'

type DropdownMenuDemoProps = {
  children: ReactNode
  icon: string
  type: 'head' | 'menu'
}

const DropdownMenuDemo = (props: DropdownMenuDemoProps) => {
  const { children, icon, type } = props

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button aria-label={'Customise options'} className={'IconButton'}>
          <div className={'imgBox'}>
            <img alt={''} className={'dropdownHeaderImg'} src={icon} />
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
              <img alt={''} src={icon} />
              <div>
                <Typography className={'dropdownTextHeader'} variant={'subtitle1'}>
                  Ivan
                </Typography>
                <Typography className={'dropdownTextHeader'} variant={'caption'}>
                  j&johnson@gmail.com
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
