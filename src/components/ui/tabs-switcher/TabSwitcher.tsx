import * as Tabs from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

import s from './tabSwitcher.module.scss'

export type Tab = {
  disabled?: boolean
  text: string
  value: string
}

type Props = {
  className?: string
  onValueChange: (value: string) => void
  tabs: Tab[]
  value: string
}

export const TabSwitcher = ({ className, onValueChange, tabs, value }: Props) => {
  return (
    <div className={clsx(s.div, className)}>
      <Tabs.Root className={s.root} onValueChange={onValueChange} value={value}>
        <Tabs.List>
          {tabs.map(t => (
            <Tabs.Trigger className={s.trigger} disabled={t.disabled} key={t.value} value={t.value}>
              {t.text}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>
    </div>
  )
}
