import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import { DatePickerPopupContent } from '@/components/ui/DatePicker/DatePickerPopupContent'
import { useLatest } from '@/components/ui/DatePicker/lib/hooks/hooks'
import { clsx } from 'clsx'

import './DatePicker.scss'

import { getDateFromInputValue, getInputValueFromDate, isInRange } from './utils'

export interface DatePickerProps {
  max?: Date
  min?: Date
  onChange: (value: Date) => void
  value: Date
}

/* 
TODO:
- fix bug [done]
- input and popup [done]
- write a date through input [done]
- refactoring [done]
- remove unnecessary chars from input [done]

- min and max [done]
- highlight input with invalid value [done]

- improve styles
  - highlight today [done]
  - highlight prev and next month days [done]
  - popup and input styles [done]

- [after video] think about solution without effects?
*/

export const DatePicker = ({ max, min, onChange, value }: DatePickerProps) => {
  const [showPopup, setShowPopup] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const elementRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    setInputValue(`${getInputValueFromDate(value)} - ${getInputValueFromDate(value)}`)
  }, [value])

  const updateValueOnPopupCloseAction = () => {
    const date = getDateFromInputValue(inputValue)

    setShowPopup(false)

    if (!date) {
      // input value is invalid
      // reset it
      setInputValue(getInputValueFromDate(value))

      return
    }

    const isDateInRange = isInRange(date, min, max)

    if (!isDateInRange) {
      return
    }

    onChange(date)
  }

  const latestUpdateValueFromInput = useLatest(updateValueOnPopupCloseAction)

  useEffect(() => {
    const element = elementRef.current

    if (!element) {
      return
    }

    const onDocumentClick = (e: MouseEvent) => {
      const target = e.target

      if (!(target instanceof Node)) {
        return
      }

      if (element.contains(target)) {
        return
      }

      latestUpdateValueFromInput.current()
    }

    document.addEventListener('click', onDocumentClick)

    return () => {
      document.removeEventListener('click', onDocumentClick)
    }
  }, [latestUpdateValueFromInput])

  const handleChange = (value: Date) => {
    onChange(value)
    // setShowPopup(false)
  }

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim())
  }

  const onInputClick = () => {
    setShowPopup(true)
  }

  const [inputValueDate, isValidInputValue] = useMemo(() => {
    const date = getDateFromInputValue(inputValue)

    if (!date) {
      return [undefined, false]
    }

    const isDateInRange = isInRange(date, min, max)

    return [date, isDateInRange]
  }, [inputValue, min, max])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') {
      return
    }

    updateValueOnPopupCloseAction()
  }

  return (
    <div className={'DatePicker'} data-testid={'data-picker-view'} ref={elementRef}>
      <input
        className={clsx('DatePicker__input', !isValidInputValue && 'DatePicker__input--invalid')}
        data-testid={'date-picker-input'}
        onChange={onInputValueChange}
        onClick={onInputClick}
        onKeyDown={onKeyDown}
        type={'text'}
        value={inputValue}
      />

      {showPopup && (
        <div className={'DatePicker__popup'} data-testid={'date-picker-popup'}>
          <DatePickerPopupContent
            inputValueDate={inputValueDate}
            max={max}
            min={min}
            onChange={handleChange}
            selectedValue={value}
          />
        </div>
      )}
    </div>
  )
}
