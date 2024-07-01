import { RangeDate } from '@/components/ui/DatePicker/DatePicker'
import { getInputValueFromDate } from '@/components/ui/DatePicker/lib/utils'

export const getInputValueDate = (value: RangeDate): string => {
  return `${getInputValueFromDate(value.startDate)} - ${getInputValueFromDate(value.endDate)}`
}
