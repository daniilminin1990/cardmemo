import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useId,
  useState,
} from 'react'

import EyeOff from '@/assets/icons/svg/EyeOff'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'

import s from './Input.module.scss'

import Close from '../../../assets/icons/svg/Close'
import Eye from '../../../assets/icons/svg/Eye'
import Search from '../../../assets/icons/svg/Search'

export type InputProps = {
  callback?: (text: string) => void
  currentValue?: string
  error?: string | undefined
  label?: string
} & ComponentPropsWithoutRef<'input'>

const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  const { callback, className, currentValue, error, id, label, placeholder, type, ...restProps } =
    props

  const [isShow, setIsShow] = useState(false)
  const [inputValue, setInputValue] = useState(currentValue || '')

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    props.onChange?.(e)
    setInputValue(e.target.value)
  }
  const clearInput = () => {
    setInputValue('')
    if (callback) {
      callback('')
    }
  }
  const focusOnInput = () => {
    const inputElement = document.getElementById(id ?? generatedId)

    inputElement?.focus()
  }

  //! ВОТ ЭТОТ useEffect добавил!
  // Для зачистки инпута с кнопки ClearFilter или делать через useContext
  useEffect(() => {
    // в currentValue - search из searchParams, поэтому такое сравнение
    props.currentValue === '' && setInputValue('')
  }, [props.currentValue])

  const isShowChangeHandler = () => {
    setIsShow(!isShow)
  }
  const EyeIcon = isShow ? Eye : EyeOff

  let classNameForInput = ''

  switch (type) {
    case 'search':
      classNameForInput = error
        ? clsx(s.boxInput, s.boxPadding, s.errorSeach)
        : clsx(s.boxInput, s.boxPadding)
      break
    case 'text':
    case 'password':
      classNameForInput = error
        ? clsx(s.boxInput, s.boxPadding, s.errorTextAndPassword)
        : clsx(s.boxInput, inputValue.length === 0 && s.placeholder)
      break
    default:
      classNameForInput = s.boxInput
  }

  const styleForType = isShow ? 'text' : 'password'

  const generatedId = useId()

  return (
    <div className={clsx(s.box, className)}>
      <Typography as={'label'} className={s.label} htmlFor={id ?? generatedId} variant={'body2'}>
        {type !== 'search' && label}
      </Typography>
      <div className={s.searchClose}>
        {type === 'search' && (
          <div>
            <Search className={s.Search} onClick={focusOnInput} viewBox={'0 0 24 24'} />
          </div>
        )}
        <input
          {...restProps}
          className={classNameForInput}
          id={id ?? generatedId}
          onChange={handleChange}
          placeholder={placeholder}
          ref={ref}
          type={type === 'password' ? styleForType : type}
          value={inputValue}
        />
        {type === 'password' && inputValue.length > 0 && (
          <Button className={s.Eye} onClick={isShowChangeHandler} type={'button'}>
            <EyeIcon viewBox={'0 0 24 24'} />
          </Button>
        )}

        <div>
          {type === 'search' && inputValue.length > 0 && (
            <Button className={s.Close} onClick={clearInput}>
              <Close viewBox={'0 0 24 24'} />
            </Button>
          )}
        </div>
      </div>
      {error && <div className={s.errorText}>{error}</div>}
    </div>
  )
})

export default Input
