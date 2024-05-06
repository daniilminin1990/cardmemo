import { ComponentProps, ComponentPropsWithoutRef, forwardRef } from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'
import { clsx } from 'clsx'

import s from './radio.module.scss'

export type RadioRootProps = ComponentProps<'form'>
export const Root = forwardRef<HTMLDivElement, RadioRootProps>(
  ({ children, className, ...rest }: RadioRootProps, ref) => {
    const classNames = {
      form: clsx(className, s.form),
    }

    return (
      <form {...rest}>
        <RadioGroup.Root
          aria-label={'View density'}
          className={classNames.form}
          defaultValue={'default'}
          ref={ref}
        >
          {children}
        </RadioGroup.Root>
      </form>
    )
  }
)
export type RadioBodyProps = {
  isDisabled?: boolean
} & ComponentPropsWithoutRef<'div'>
export const Body = forwardRef<HTMLDivElement, RadioBodyProps>(
  ({ children, className, isDisabled = false, ...rest }: RadioBodyProps, ref) => {
    const classNames = {
      body: clsx(className, s.body, isDisabled && s.disabled),
    }

    return (
      <div className={classNames.body} ref={ref} {...rest}>
        {children}
      </div>
    )
  }
)
export type RadioItemProps = {
  isDisabled?: boolean
  value: string
} & ComponentPropsWithoutRef<'button'>
export const Item = forwardRef<HTMLButtonElement, RadioItemProps>(
  ({ className, isDisabled = false, value, ...rest }: RadioItemProps, ref) => {
    const classNames = {
      item: clsx(className, s.item),
    }

    return (
      <RadioGroup.Item
        className={classNames.item}
        disabled={isDisabled}
        id={value}
        ref={ref}
        tabIndex={0}
        value={value}
        {...rest}
      />
    )
  }
)

export type RadioLabelProps = {
  isDisabled?: boolean
  label: string
  value: string
} & ComponentPropsWithoutRef<'label'>
export const Label = forwardRef<HTMLLabelElement, RadioLabelProps>(
  ({ className, isDisabled = false, label, value, ...rest }: RadioLabelProps, ref) => {
    const classNames = {
      label: clsx(className, s.label, isDisabled && s.disabled),
    }

    return (
      <label className={classNames.label} htmlFor={value} ref={ref} {...rest}>
        {label}
      </label>
    )
  }
)

export type RadioSpanProps = {
  isDisabled?: boolean
} & ComponentPropsWithoutRef<'span'>
export const Span = forwardRef<HTMLSpanElement, RadioSpanProps>(
  ({ className, isDisabled = false, ...rest }: RadioSpanProps, ref) => {
    const classNames = {
      span: clsx(className, s.span, isDisabled && s.disabled),
    }

    return <RadioGroup.Indicator className={classNames.span} {...rest} ref={ref} />
  }
)
export const Radio = {
  Body,
  Item,
  Label,
  Root,
  Span,
}
