import { useSearchParams } from 'react-router-dom'

import { useDebounce } from '@/hooks/useDebounce'
import { useGetMinMaxCardsCountQuery } from '@/services/decks/decks.service'

export const useSliderQueryParams = () => {
  const { data: minMaxData, isLoading: isMinMaxLoading } = useGetMinMaxCardsCountQuery()

  const [searchParams, setSearchParams] = useSearchParams()

  const sliderMin = Number(searchParams.get('min') ?? minMaxData?.min)
  const sliderMax = Number(searchParams.get('max') ?? minMaxData?.max)

  const debouncedStartValue = useDebounce(sliderMin)
  const debouncedEndValue = useDebounce(sliderMax)

  const changeMinMaxHandler = (value: number[]) => {
    value[0] === minMaxData?.min
      ? searchParams.delete('min')
      : searchParams.set('min', `${value[0]}`)
    value[1] === minMaxData?.max
      ? searchParams.delete('max')
      : searchParams.set('max', `${value[1]}`)

    setSearchParams(searchParams)
  }

  return {
    changeMinMaxHandler,
    debouncedEndValue,
    debouncedStartValue,
    isMinMaxLoading,
    minMaxData,
    sliderMax,
    sliderMin,
  }
}
