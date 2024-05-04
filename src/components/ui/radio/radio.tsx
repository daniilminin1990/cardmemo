import { ComponentProps, ComponentPropsWithoutRef } from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'
import { clsx } from 'clsx'

import s from './radio.module.scss'

export type RadioRootProps = ComponentProps<'form'>
export const Root = ({ children, className, ...rest }: RadioRootProps) => {
  const classNames = {
    form: clsx(className, s.form),
  }

  return (
    <form {...rest}>
      <RadioGroup.Root
        aria-label={'View density'}
        className={classNames.form}
        defaultValue={'default'}
      >
        {children}
      </RadioGroup.Root>
    </form>
  )
}

export type RadioBodyProps = {
  isDisabled?: boolean
} & ComponentPropsWithoutRef<'div'>
export const Body = ({ children, className, isDisabled = false, ...rest }: RadioBodyProps) => {
  const classNames = {
    body: clsx(className, s.body, isDisabled && s.disabled),
  }

  return (
    <div className={classNames.body} {...rest}>
      {children}
    </div>
  )
}

export type RadioItemProps = {
  isDisabled?: boolean
  tabIndex: number
  value: string
} & ComponentPropsWithoutRef<'button'>
export const Item = ({
  className,
  isDisabled = false,
  tabIndex,
  value,
  ...rest
}: RadioItemProps) => {
  const classNames = {
    item: clsx(className, s.item),
  }

  return (
    <RadioGroup.Item
      className={classNames.item}
      disabled={isDisabled}
      id={value}
      tabIndex={tabIndex}
      value={value}
      {...rest}
    />
  )
}

export type RadioLabelProps = {
  isDisabled?: boolean
  label: string
  value: string
} & ComponentPropsWithoutRef<'label'>
export const Label = ({
  className,
  isDisabled = false,
  label,
  value,
  ...rest
}: RadioLabelProps) => {
  const classNames = {
    label: clsx(className, s.label, isDisabled && s.disabled),
  }

  return (
    <label className={classNames.label} htmlFor={value} {...rest}>
      {label}
    </label>
  )
}

export type RadioSpanProps = {
  isDisabled?: boolean
} & ComponentPropsWithoutRef<'span'>
export const Span = ({ className, isDisabled = false, ...rest }: RadioSpanProps) => {
  const classNames = {
    span: clsx(className, s.span, isDisabled && s.disabled),
  }

  return <RadioGroup.Indicator className={classNames.span} {...rest} />
}
export const Radio = {
  Body,
  Item,
  Label,
  Root,
  Span,
}
