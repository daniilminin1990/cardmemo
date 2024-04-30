import { HTMLProps } from 'react'

import s from '../pagination.module.scss'

type Props = { active?: boolean } & HTMLProps<HTMLAnchorElement>

export const PageLink = ({ active, children, className, disabled, ...props }: Props) => {
  const customClassName = `${s.pageLink} ${className} ${active ? s.active : ''} ${
    disabled ? s.disabled : ''
  }`

  return (
    <div className={s.pageLinkWrapper}>
      {disabled ? (
        <span className={`${customClassName} ${s.pageLink}`}>{children}</span>
      ) : (
        <a {...props} aria-current={active ? 'page' : undefined} className={customClassName}>
          {children}
        </a>
      )}
    </div>
  )
}
