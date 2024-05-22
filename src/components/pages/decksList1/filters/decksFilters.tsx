import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import TrashOutline from '@/assets/icons/svg/TrashOutline'
import Input from '@/components/ui/Input/Input'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { TabSwitcher } from '@/components/ui/tabs-switcher/TabSwitcher'
import { searchHandler } from '@/components/utils/searchHandler'
import { useMeQuery } from '@/services/auth/auth.services'

import s from './decksFilters.module.scss'

export const DecksFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState('All Cards')
  const [valueSearchInput, setValueSearchInput] = useState(searchParams.get('name' || null))

  const { data: me } = useMeQuery()

  const debounceTimer = useRef(null)

  const myId = me?.id || ''
  const authorId = searchParams.get('authorId')

  useEffect(() => {
    if (authorId) {
      setActiveTab('MyCards')
    }
  }, [authorId])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    searchHandler({ debounceTimer, e, name: 'name', searchParams, setSearchParams })
  }

  const clearFilterHandler = () => {
    setSearchParams(new URLSearchParams())
    setActiveTab('All Cards')
    setValueSearchInput(null)
  }

  const clearSearchFieldHandler = () => {
    searchParams.delete('name')
    setSearchParams(searchParams)
  }
  const changeTabHandler = (value: string) => {
    value === 'MyCards' ? searchParams.set('authorId', myId) : searchParams.delete('authorId')

    searchParams.set('currentPage', '1')
    setSearchParams(searchParams)
    setActiveTab(value)
  }

  return (
    <div className={s.filter}>
      <Input
        callback={clearSearchFieldHandler}
        className={s.input}
        onChange={handleSearch}
        querySearch={valueSearchInput}
        type={'search'}
      />

      <TabSwitcher
        className={s.tabSwitch}
        label={'Show decks cards'}
        onValueChange={changeTabHandler}
        tabs={[
          { text: 'MyCards', value: 'MyCards' },
          { text: 'All Cards', value: 'All Cards' },
        ]}
        value={activeTab}
      />

      <Typography
        as={'label'}
        className={s.label}
        style={{ border: '1px solid red', width: '250px' }}
        variant={'body2'}
      >
        Number of cards
        <div>Slider</div>
      </Typography>

      <Button className={s.clearBtn} onClick={clearFilterHandler} variant={'secondary'}>
        <TrashOutline className={s.trashOutlineIcon} />
        <Typography className={s.text} variant={'subtitle2'}>
          Clear Filter
        </Typography>
      </Button>
    </div>
  )
}
