import { ChangeEvent, useState } from 'react'

import TrashOutline from '@/assets/icons/svg/TrashOutline'
import Input from '@/components/ui/Input/Input'
import { PaginationWithSelect } from '@/components/ui/Pagination/PaginationWithSelect'
import Slider from '@/components/ui/Slider/Slider'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { TabSwitcher } from '@/components/ui/tabs-switcher/TabSwitcher'
import { ModalAddEditDeck } from '@/pagesMinin/ModalsForTable/ModalAddEditDeck'
import { SingleRowDeck } from '@/pagesMinin/TableComponent/SingleRowDeck/SingleRowDeck'
import { TableComponentWithTypes } from '@/pagesMinin/TableComponent/TableComponentWithTypes'
import { Page } from '@/pagesMinin/componentsMinin/Page/Page'
import { useQueryParams, useSliderQueryParams } from '@/pagesMinin/utls/useQueryParams'
import {
  headersNameDecks,
  initCurrentPage,
  selectOptionPagination,
} from '@/pagesMinin/utls/variablesMinin'

import s from '@/pagesMinin/decksPage.module.scss'

import { useGetDecksQuery } from '../../services/decks/decks.service'

export function DecksPage() {
  const {
    clearQuery,
    currentOrderBy,
    currentPage,
    // isMinMaxLoading,
    itemsPerPage,
    // minMaxData,
    search,
    setCurrentPageQuery,
    setItemsPerPageQuery,
    setSearchQuery,
    // setSliderValues,
    // setSliderValuesQuery,
    // sliderMax,
    // sliderMin,
    // sliderValues,
  } = useQueryParams()

  const {
    isMinMaxLoading,
    minMaxData,
    setSliderValues,
    setSliderValuesQuery,
    sliderMax,
    sliderMin,
    sliderValues,
  } = useSliderQueryParams()

  // const { data: minMaxData, isLoading: isMinMaxLoading } = useGetMinMaxCardsCountQuery()
  // const { setSliderValuesQuery, sliderMax, sliderMin } = useSliderQueryParams(minMaxData)

  const [open, setOpen] = useState(false)
  const [tabsValue, setTabsValue] = useState('All decks')

  const { data, error, isLoading } = useGetDecksQuery(
    {
      currentPage,
      itemsPerPage,
      maxCardsCount: sliderMax,
      minCardsCount: sliderMin,
      name: search,
      orderBy: currentOrderBy,
    },
    { skip: !minMaxData }
  )

  const sliderValueHandler = (value: number[]) => {
    setCurrentPageQuery(Number(initCurrentPage))
    setSliderValues(value)
    setSliderValuesQuery(value)
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPageQuery(Number(initCurrentPage))
    setSearchQuery(e.currentTarget.value)
  }
  const tabsSwitcherHandler = (value: string) => {
    // От этого, полагаю тоже можно избавиться через searchParams
    setTabsValue(value)
    //! Сюда нужно прикрутить ID пользователя, чтобы вытащить только его Decks (после урока авторизации)
    // if(value === authorId){
    //   searchParams.set('authorId', value)
    //   setSearchParams(searchParams)
    // } else {
    //   searchParams.delete('authorId')
    //   setSearchParams(searchParams)
    // }
  }

  // Clear filter func on Click
  const onClearFilter = () => {
    clearQuery()
  }

  const handleItemsPerPageChange = (value: number) => {
    setCurrentPageQuery(Number(initCurrentPage))
    setItemsPerPageQuery(value)
  }
  const handleCurrentPageChange = (value: number) => {
    setCurrentPageQuery(value)
  }

  if (isLoading || isMinMaxLoading) {
    return <h1>... Loading</h1>
  }

  if (error) {
    return <h1>Error: {JSON.stringify(error)}</h1>
  }

  return (
    <Page className={s.common}>
      {/*<ModalOnAddDeckMinin open={open} setOpen={setOpen} />*/}
      <ModalAddEditDeck open={open} setOpen={setOpen} />
      <div className={s.heading}>
        <div className={s.headingFirstRow}>
          <Typography as={'h1'} variant={'h1'}>
            Decks list
          </Typography>
          <Button onClick={() => setOpen(true)} variant={'primary'}>
            <Typography variant={'subtitle2'}>Add New Deck</Typography>
          </Button>
        </div>
        <div className={s.searchParams}>
          <Input
            callback={setSearchQuery}
            className={s.input}
            onChange={handleSearch}
            // querySearch={search}
            type={'search'}
            value={search}
          />
          <TabSwitcher
            className={s.tabsSwitcher}
            label={'Show decks cards'}
            onValueChange={tabsSwitcherHandler}
            tabs={[
              { text: 'My decks', value: 'authorId' }, // ! Тут value должен быть authorId. После авторизации определим
              { text: 'All decks', value: 'allDecks' },
            ]}
            value={tabsValue}
          />
          <div>
            <Slider
              className={s.slider}
              label={'Number of cards'}
              max={minMaxData?.max}
              min={minMaxData?.min}
              onValueChange={sliderValueHandler}
              value={sliderValues}
            />
          </div>
          <Button className={s.clearFilter} onClick={onClearFilter} variant={'secondary'}>
            <TrashOutline />
            <Typography variant={'subtitle2'}>Clear Filter</Typography>
          </Button>
        </div>
      </div>
      {/*<SingleRowDeck data={data} tableHeader={headersNameDecks} />*/}
      <TableComponentWithTypes data={data} tableHeader={headersNameDecks}>
        {/*// передаем функцию, которая принимает item и возвращает SingleRowDeck или SingleRowCard*/}
        {item => <SingleRowDeck item={item} />}
      </TableComponentWithTypes>
      <div className={s.footer}>
        <PaginationWithSelect
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          selectOptions={selectOptionPagination}
          setCurrentPage={handleCurrentPageChange}
          setItemsPerPage={handleItemsPerPageChange}
          totalItems={data?.pagination.totalItems || 0}
        />
      </div>
    </Page>
  )
}
