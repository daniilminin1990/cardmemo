import { useLayoutEffect, useMemo, useState } from 'react'

import { RangeDate } from '@/components/ui/DatePicker/DatePicker'
import {
  DateCellItem,
  addDay,
  daysOfTheWeek,
  findMiddleDate,
  getCurrentMothDays,
  getDaysAmountInAMonth,
  getNextMonthDays,
  getPreviousMonthDays,
  isInRange,
  isToday,
  months,
  removeOneDay,
} from '@/components/ui/DatePicker/lib/utils'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { clsx } from 'clsx'

const currentDate = new Date().getDate()
const currentMonth = new Date().getMonth()
const currentYear = new Date().getFullYear()

interface DatePickerPopupContentProps {
  inputValueDate?: RangeDate
  max?: Date
  min?: Date
  onChange: (value: RangeDate) => void
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

    setPanelMonth(inputValueDate.endDate.getMonth())
    setPanelYear(inputValueDate.endDate.getFullYear())
  }, [inputValueDate])

  // const [year, month, day] = useMemo(() => {
  //   const currentYear = selectedValue.getFullYear()
  //   const currentDay = selectedValue.getDate()
  //   const currentMonth = selectedValue.getMonth()
  //
  //   return [currentYear, currentMonth, currentDay]
  // }, [selectedValue])

  const dateCells = useMemo(() => {
    const daysInAMonth = getDaysAmountInAMonth(panelYear, panelMonth)

    const currentMonthDays = getCurrentMothDays(panelYear, panelMonth, daysInAMonth)
    const prevMonthDays = getPreviousMonthDays(panelYear, panelMonth)
    const nextMonthDays = getNextMonthDays(panelYear, panelMonth)

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
  }, [panelYear, panelMonth])

  const onDateSelect = (item: DateCellItem) => {
    if (!inputValueDate) {
      return
    }

    const middleDate = findMiddleDate(inputValueDate.startDate, inputValueDate.endDate)

    if (new Date(item.year, item.month, item.date) < middleDate) {
      onChange({ ...inputValueDate, startDate: new Date(item.year, item.month, item.date) })
    }

    if (new Date(item.year, item.month, item.date) >= middleDate) {
      if (inputValueDate.startDate < new Date(item.year, item.month, item.date)) {
        onChange({ ...inputValueDate, endDate: new Date(item.year, item.month, item.date) })
      }

      if (inputValueDate.startDate > new Date(item.year, item.month, item.date)) {
        onChange({ ...inputValueDate, startDate: new Date(item.year, item.month, item.date) })
      }
    }
  }

  const onDateSelectOne = (item: DateCellItem) => {
    onChange({
      ...inputValueDate,
      endDate: new Date(item.year, item.month, item.date),
      startDate: new Date(item.year, item.month, item.date),
    })
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

  const checkDate = (cell: DateCellItem, dateSecond: Date) => {
    return (
      cell.year === dateSecond.getFullYear() &&
      cell.month === dateSecond.getMonth() &&
      cell.date === dateSecond.getDate()
    )
  }

  function getIntermediateDates(startDate: Date, endDate: Date): Date[] {
    const dates: Date[] = []
    const currentDate = addDay(new Date(startDate), 1)

    const endDateRemoveOneDay = removeOneDay(endDate)

    while (currentDate <= endDateRemoveOneDay) {
      dates.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return dates
  }

  return (
    <div className={'CalendarPanel'}>
      <div className={'CalendarPanel__header'}>
        <div className={'CalendarPanel__date'} data-testid={'date-picker-popup-month'}>
          {months[panelMonth]} {panelYear}
        </div>
        <div className={'CalendarPanel__buttons'}>
          <div className={'CalendarPanel__buttons-left'}>
            <button className={'popup-btn-month popup-prev-month'} onClick={prevMonth}>
              <ChevronLeftIcon />
            </button>
          </div>
          <div className={'CalendarPanel__buttons-right'}>
            <button className={'popup-btn-month popup-next-month'} onClick={nextMonth}>
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
      <div className={'CalendarPanel__content'}>
        {daysOfTheWeek.map(weekDay => (
          <div className={'CalendarPanelItem CalendarPanelItem--weekDay'} key={weekDay}>
            {weekDay}
          </div>
        ))}
        {dateCells.map(cell => {
          const date = new Date(cell.year, cell.month, cell.date)

          const isCurrentDate =
            cell.year === currentYear && cell.month === currentMonth && cell.date === currentDate
          const isTodayDate = isToday(cell, todayDate)
          const isNotCurrent = cell.type !== 'current'

          const isDateInRange = isInRange(date, min, max)

          const daysOff = !isNotCurrent && (date.getDay() === 6 || date.getDay() === 0)

          if (!inputValueDate) {
            return
          }

          const isSelectedDate = getIntermediateDates(
            inputValueDate.startDate,
            inputValueDate.endDate
          ).find(
            el =>
              cell.year === el.getFullYear() &&
              cell.month === el.getMonth() &&
              cell.date === el.getDate()
          )
          const isSelectedStartDate = checkDate(cell, inputValueDate.startDate)
          const isSelectedEndDate = checkDate(cell, inputValueDate.endDate)
          const isSelectedStartAndEndDate = isSelectedStartDate && isSelectedEndDate

          return (
            <div
              className={clsx(
                'CalendarPanelItem',
                isCurrentDate && 'CalendarPanelItem--currentDate',
                isTodayDate && 'CalendarPanelItem--today',
                isNotCurrent && 'CalendarPanelItem--not-current',
                !isDateInRange && 'CalendarPanelItem--not-in-range',
                daysOff && 'CalendarPanelItem--daysOff',
                isSelectedStartDate && 'CalendarPanelItem--selectedStartDate',
                isSelectedEndDate && 'CalendarPanelItem--selectedEndDate',
                isSelectedDate && 'CalendarPanelItem--selectedDate',
                isSelectedStartAndEndDate && 'CalendarPanelItem--selectedStartAndEndDate'
              )}
              data-testid={'date-picker-popup-cell'}
              key={`${cell.date}-${cell.month}-${cell.year}`}
              onClick={() => isDateInRange && onDateSelect(cell)}
              onDoubleClick={() => isDateInRange && onDateSelectOne(cell)}
            >
              <span className={'CalendarPanelItem__date'}>{cell.date}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
