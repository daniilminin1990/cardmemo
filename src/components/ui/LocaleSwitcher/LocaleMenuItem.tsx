import { FullName } from '@/components/ui/LocaleSwitcher/LocaleSwitcherDrop'
import Typography from '@/components/ui/Typography/Typography'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './LocaleSwitcher.module.scss'

type DropdownMenuItemProps = {
  fullName: FullName
  icon: string
  isoCode: string
  onSelect: () => void
}

const LocaleMenuItem = (props: DropdownMenuItemProps) => {
  const { fullName, icon, isoCode, onSelect } = props

  return (
    <DropdownMenu.Item asChild>
      <div
        className={s.boxContent}
        onClick={onSelect}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            onSelect()
          }
        }}
      >
        <img alt={`${isoCode} flag`} className={s.dropItemFlag} src={icon} />
        <Typography className={s.dropdownText} variant={'caption'}>
          {fullName}
        </Typography>
      </div>
    </DropdownMenu.Item>
  )
}

export default LocaleMenuItem
