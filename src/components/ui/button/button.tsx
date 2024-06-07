import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ForwardedRef,
  ReactNode,
  forwardRef,
  useContext,
} from 'react'

import { UserContext } from '@/components/ui/changeTheme/Context'
import clsx from 'clsx'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode
  className?: string
  fullWidth?: boolean
  variant?: 'outlined' | 'primary' | 'secondary'
} & ComponentPropsWithoutRef<T>

export const ButtonPolymorph = <T extends ElementType = 'button'>(
  props: ButtonProps<T>,
  ref: any
) => {
  const context = useContext(UserContext)
  const { as: Component = 'button', className, fullWidth, variant = 'primary', ...rest } = props

  return (
    <Component
      // className={`${s.button} ${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
      className={clsx(
        s.button,
        s[variant],
        context?.theme === 'sun' ? s.sun : '',
        fullWidth && s.fullWidth,
        className
      )}
      ref={ref}
      {...rest}
    />
  )
}

export const Button = forwardRef(ButtonPolymorph) as <T extends ElementType = 'button'>(
  props: {
    ref?: ForwardedRef<ElementRef<T>>
  } & ButtonProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => ReturnType<typeof ButtonPolymorph>
