import { RangeDate } from '@/components/ui/DatePicker/DatePicker'
import { getInputValueDate } from '@/components/ui/DatePicker/lib/helpers/getInputValueDate'
import { getDateFromInputValue, isInRange } from '@/components/ui/DatePicker/lib/utils'

interface Props {
  inputValue: string
  max?: Date
  min?: Date
  onChange: (value: RangeDate) => void
  setInputValue: (value: string) => void
  value: RangeDate
}

export const updateValueOnPopupCloseAction = ({
  inputValue,
  max,
  min,
  onChange,
  setInputValue,
  value,
}: Props) => {
  const date = getDateFromInputValue(inputValue)

  if (!date) {
    setInputValue(getInputValueDate(value))

    return
  }

  const isDateInRange = isInRange(date.startDate, min, max) && isInRange(date.endDate, min, max)

  if (!isDateInRange) {
    return
  }

  onChange({ ...date })
}
