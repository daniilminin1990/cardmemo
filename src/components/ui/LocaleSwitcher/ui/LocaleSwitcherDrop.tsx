import { ArrowIosDownOutline } from '@/assets/icons/svg'
import { useLangData } from '@/components/ui/LocaleSwitcher/lib/hooks/useLangData'
import LocaleMenuItem from '@/components/ui/LocaleSwitcher/ui/LocaleMenuItem/LocaleMenuItem'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from '@/components/ui/LocaleSwitcher/ui/LocaleSwitcher.module.scss'

const LocaleSwitcherDrop = () => {
  const { changeLanguage, iconFlag, langData } = useLangData()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div aria-label={'Update dimensions'} className={s.IconButton} tabIndex={0}>
          <img alt={'Country flag'} className={s.flag} height={30} src={iconFlag} width={40} />
          <ArrowIosDownOutline className={s.iconArrowDown} />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.DropdownMenuContent} sideOffset={3}>
          {Object.entries(langData).map(([key, value]) => (
            <LocaleMenuItem
              fullName={value.fullName}
              icon={value.icon}
              isoCode={value.isoCode}
              key={key}
              onSelect={() => changeLanguage(key, value.icon)}
            />
          ))}
          <DropdownMenu.Arrow className={s.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default LocaleSwitcherDrop
