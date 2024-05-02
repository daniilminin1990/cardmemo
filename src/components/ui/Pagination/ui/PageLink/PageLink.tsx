import { HTMLProps } from 'react'

import clsx from 'clsx'

import s from '../Pagination.module.scss'

type Props = { active?: boolean } & HTMLProps<HTMLAnchorElement>

export const PageLink = ({ active, children, className, disabled, ...props }: Props) => {
  // const customClassName = `${s.PageLink} ${className} ${active ? s.active : ''} ${
  const customClassName = clsx(s.pageLink, className, {
    [s.active]: active,
    [s.disabled]: disabled,
  })

  return (
    <div className={s.pageLinkWrapper}>
      {disabled ? (
        // <span className={`${customClassName} ${s.PageLink}`}>{children}</span>
        <span className={clsx(customClassName, s.pageLink)}>{children}</span>
      ) : (
        <a {...props} aria-current={active ? 'page' : undefined} className={customClassName}>
          {children}
        </a>
      )}
    </div>
  )
}
