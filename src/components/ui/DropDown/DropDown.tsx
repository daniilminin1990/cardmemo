import { ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import './DropDown.scss'

import icon from '../../../assets/icons/person.svg'
import icon2 from '../../../assets/icons/search.svg'

type DropdownMenuDemoProps = {
  children: ReactNode
  type: 'head' | 'menu'
}

const DropdownMenuDemo = (props: DropdownMenuDemoProps) => {
  const { children, type } = props

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button aria-label={'Customise options'} className={'IconButton'}>
          {type === 'head' ? <img alt={''} src={icon} /> : <img alt={''} src={icon2} />}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={'DropdownMenuContent'} sideOffset={5}>
          {type === 'head' && (
            <DropdownMenu.Item className={'DropdownMenuItem'}>
              <img alt={''} src={icon} />
              <div>Ivan</div>
              <div>Email</div>
            </DropdownMenu.Item>
          )}

          {children}

          <DropdownMenu.Arrow className={'DropdownMenuArrow'} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default DropdownMenuDemo
