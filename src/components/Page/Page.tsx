import { CSSProperties, ComponentPropsWithoutRef } from 'react'

import { clsx } from 'clsx'

import s from './page.module.scss'

type Props = {
  mt?: CSSProperties['marginTop']
} & ComponentPropsWithoutRef<'div'>
export const Page = ({ className, mt = 0, style, ...rest }: Props) => {
  const classes = clsx(className, s.container)
  const styles: CSSProperties = { marginTop: mt, ...style }

  return <div className={classes} style={styles} {...rest} />
}
