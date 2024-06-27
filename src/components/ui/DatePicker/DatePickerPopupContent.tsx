import { useLayoutEffect, useMemo, useState } from 'react'

import {
  DateCellItem,
  daysOfTheWeek,
  getCurrentMothDays,
  getDaysAmountInAMonth,
  getNextMonthDays,
  getPreviousMonthDays,
  isInRange,
  isToday,
  months,
} from '@/components/ui/DatePicker/utils'
import { clsx } from 'clsx'

interface DatePickerPopupContentProps {
  inputValueDate?: Date
  max?: Date
  min?: Date
  onChange: (value: Date) => void
  selectedValue: Date
}

export const DatePickerPopupContent = ({
  inputValueDate,
  max,
  min,
  onChange,
  selectedValue,
}: DatePickerPopupContentProps) => {
  const [panelYear, setPanelYear] = useState(() => selectedValue.getFullYear())
  const [panelMonth, setPanelMonth] = useState(() => selectedValue.getMonth())
  const todayDate = useMemo(() => new Date(), [])

  useLayoutEffect(() => {
    if (!inputValueDate) {
      return
    }

    setPanelMonth(inputValueDate.getMonth())
    setPanelYear(inputValueDate.getFullYear())
  }, [inputValueDate])

  const [year, month, day] = useMemo(() => {
    const currentYear = selectedValue.getFullYear()
    const currentDay = selectedValue.getDate()
    const currentMonth = selectedValue.getMonth()

    return [currentYear, currentMonth, currentDay]
  }, [selectedValue])

  const dateCells = useMemo(() => {
    const daysInAMonth = getDaysAmountInAMonth(panelYear, panelMonth)

    const currentMonthDays = getCurrentMothDays(panelYear, panelMonth, daysInAMonth)
    const prevMonthDays = getPreviousMonthDays(panelYear, panelMonth)
    const nextMonthDays = getNextMonthDays(panelYear, panelMonth)

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
  }, [panelYear, panelMonth])

  const onDateSelect = (item: DateCellItem) => {
    onChange(new Date(item.year, item.month, item.date))
  }

  //@ts-ignore
  const nextYear = () => {
    setPanelYear(panelYear + 1)
  }
  //@ts-ignore
  const prevYear = () => {
    setPanelYear(panelYear - 1)
  }

  const nextMonth = () => {
    if (panelMonth === 11) {
      setPanelMonth(0)
      setPanelYear(panelYear + 1)
    } else {
      setPanelMonth(panelMonth + 1)
    }
  }

  const prevMonth = () => {
    if (panelMonth === 0) {
      setPanelMonth(11)
      setPanelYear(panelYear - 1)
    } else {
      setPanelMonth(panelMonth - 1)
    }
  }

  return (
    <div className={'CalendarPanel'}>
      <div className={'CalendarPanel__header'}>
        <div className={'CalendarPanel__date'} data-testid={'date-picker-popup-month'}>
          {months[panelMonth]} {panelYear}
        </div>
        <div className={'CalendarPanel__buttons'}>
          <div className={'CalendarPanel__buttons-left'}>
            <button data-testid={'date-picker-popup-prev-month'} onClick={prevMonth}>
              {'<'}
            </button>
          </div>
          <div className={'CalendarPanel__buttons-right'}>
            <button data-testid={'date-picker-popup-next-month'} onClick={nextMonth}>
              {'>'}
            </button>
          </div>
        </div>
      </div>
      <div className={'CalendarPanel__content'}>
        {daysOfTheWeek.map(weekDay => (
          <div className={'CalendarPanelItem'} key={weekDay}>
            {weekDay}
          </div>
        ))}
        {dateCells.map(cell => {
          const date = new Date(cell.year, cell.month, cell.date)

          const isSelectedDate = cell.year === year && cell.month === month && cell.date === day
          const isTodayDate = isToday(cell, todayDate)
          const isNotCurrent = cell.type !== 'current'

          const isDateInRange = isInRange(date, min, max)

          const daysOff = !isNotCurrent && (date.getDay() === 6 || date.getDay() === 0)

          return (
            <div
              className={clsx(
                'CalendarPanelItem',
                isSelectedDate && 'CalendarPanelItem--selected',
                isTodayDate && 'CalendarPanelItem--today',
                isNotCurrent && 'CalendarPanelItem--not-current',
                !isDateInRange && 'CalendarPanelItem--not-in-range',
                daysOff && 'CalendarPanelItem--daysOff'
              )}
              data-testid={'date-picker-popup-cell'}
              key={`${cell.date}-${cell.month}-${cell.year}`}
              onClick={() => isDateInRange && onDateSelect(cell)}
            >
              <div className={'CalendarPanelItem__date'}>{cell.date}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
