import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import TrashOutline from '@/assets/icons/svg/TrashOutline'
import { Button } from '@/common/components/button'
import Input from '@/common/components/input/input'
import Slider from '@/common/components/slider/slider'
import { TabSwitcher } from '@/common/components/tabsSwitcher/tabSwitcher'
import Typography from '@/common/components/typography/typography'
import { TabSwitcherProps } from '@/common/types/common.types'
import { searchInputDebounce } from '@/common/utils/searchInputDebounce'
import { useMeQuery } from '@/features/auth/api/authApi'
import { useGetMinMaxCardsQuery } from '@/features/decksList/api/decksApi'

import s from './decksFilters.module.scss'

export const DecksFilters = () => {
  const { data: me } = useMeQuery()
  const { data } = useGetMinMaxCardsQuery()

  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabSwitcherProps>('AllCards')

  const debounceTimer = useRef(null)

  const myId = me?.id || ''
  const authorId = searchParams.get('authorId')
  const searchInputValue = searchParams.get('name')
  const minSliderValue = Number(searchParams.get('min')) || data?.min || 0
  const maxSliderValue = Number(searchParams.get('max')) || data?.max || 1

  useEffect(() => {
    if (authorId === myId) {
      setActiveTab('MyCards')
    }
  }, [authorId])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    searchInputDebounce({ debounceTimer, e, name: 'name', searchParams, setSearchParams })
  }

  const clearFilterHandler = () => {
    setSearchParams(new URLSearchParams())
    setActiveTab('AllCards')
    toast.info('Filters clear')
  }

  const clearSearchFieldHandler = () => {
    searchParams.delete('name')
    setSearchParams(searchParams)
  }
  const changeTabHandler = (value: TabSwitcherProps) => {
    value === 'MyCards' ? searchParams.set('authorId', myId) : searchParams.delete('authorId')

    searchParams.set('currentPage', '1')
    setSearchParams(searchParams)
    setActiveTab(value)
  }

  const changeMinMaxHandler = (value: number | number[]) => {
    if (Array.isArray(value)) {
      searchParams.set('min', `${value[0]}`)
      searchParams.set('max', `${value[1]}`)
    } else {
      searchParams.set('min', `${value}`)
    }
    setSearchParams(searchParams)
  }

  return (
    <div className={s.filter}>
      <Input
        callback={clearSearchFieldHandler}
        className={s.input}
        onChange={handleSearch}
        querySearch={searchInputValue}
        type={'search'}
      />

      <TabSwitcher
        className={s.tabSwitch}
        label={'Show decks cards'}
        onValueChange={changeTabHandler}
        tabs={[
          { text: 'My Cards', value: 'MyCards' },
          { text: 'All Cards', value: 'AllCards' },
        ]}
        value={activeTab}
      />
      <div className={s.sliderBox}>
        <Slider
          className={s.slider}
          label={'Number of cards'}
          max={data?.max}
          min={data?.min}
          onValueChange={changeMinMaxHandler}
          value={[minSliderValue, maxSliderValue]}
        />
      </div>

      <Button className={s.clearBtn} onClick={clearFilterHandler} variant={'secondary'}>
        <TrashOutline className={s.trashOutlineIcon} />
        <Typography className={s.text} variant={'subtitle2'}>
          Clear Filter
        </Typography>
      </Button>
    </div>
  )
}
