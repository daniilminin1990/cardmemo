import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useGetMinMaxCardsCountQuery } from '@/services/decks/decks.service'

export const useSliderQueryParams = () => {
  const { data: minMaxData, isLoading: isMinMaxLoading } = useGetMinMaxCardsCountQuery()
  const [searchParams, setSearchParams] = useSearchParams()
  const [sliderValues, setSliderValues] = useState<number[]>([
    minMaxData?.min ?? 0,
    minMaxData?.max ?? 0,
  ])
  const sliderMin = Number(searchParams.get('min') ?? '')
  const sliderMax = Number(searchParams.get('max') ?? '')
  const maxCardsCount = minMaxData?.max ?? 0

  useEffect(() => {
    if (minMaxData) {
      setSliderValues([minMaxData.min, minMaxData.max])
    }
  }, [minMaxData])

  const setSliderValuesQuery = ([min, max]: number[]) => {
    min === minMaxData?.min
      ? searchParams.delete('min')
      : searchParams.set('min', min?.toString() ?? '')
    max === minMaxData?.max
      ? searchParams.delete('max')
      : searchParams.set('max', max?.toString() ?? '')
    setSearchParams(searchParams)
  }

  return {
    isMinMaxLoading,
    maxCardsCount,
    minMaxData,
    setSliderValues,
    setSliderValuesQuery,
    sliderMax,
    sliderMin,
    sliderValues,
  }
}
