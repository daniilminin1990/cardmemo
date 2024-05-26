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
import {
  useQueryParams,
  useSliderQueryParams,
  useTabsValuesParams,
} from '@/pagesMinin/utls/useQueryParams'
import {
  headersNameDecks,
  initCurrentPage,
  selectOptionPagination,
} from '@/pagesMinin/utls/variablesMinin'

import s from '@/pagesMinin/decksPage.module.scss'

import { useMeQuery } from '../../services/auth/auth.service'
import { useGetDecksQuery } from '../../services/decks/decks.service'

export function DecksPage() {
  const {
    clearQuery,
    currentOrderBy,
    currentPage,
    itemsPerPage,
    search,
    setCurrentPageQuery,
    setItemsPerPageQuery,
    setSearchQuery,
  } = useQueryParams()

  const {
    isMinMaxLoading,
    maxCardsCount,
    minMaxData,
    setSliderValues,
    setSliderValuesQuery,
    sliderMax,
    sliderMin,
    sliderValues,
  } = useSliderQueryParams()

  const { authorId, setTabsValue, setTabsValueQuery, tabsValue, tabsValuesData } =
    useTabsValuesParams()

  const { data: meData } = useMeQuery()
  const { currentData, data, error, isLoading } = useGetDecksQuery(
    {
      authorId: authorId || '',
      currentPage,
      itemsPerPage,
      maxCardsCount: sliderMax,
      minCardsCount: sliderMin,
      name: search,
      orderBy: currentOrderBy,
    },
    { skip: !minMaxData }
  )

  const handleSliderValue = (value: number[]) => {
    setCurrentPageQuery(Number(initCurrentPage))
    setSliderValues(value)
    setSliderValuesQuery(value)
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPageQuery(Number(initCurrentPage))
    setSearchQuery(e.currentTarget.value)
  }
  const [open, setOpen] = useState(false)

  const handleTabsSwitch = (value: string) => {
    setTabsValueQuery(value)
    setTabsValue(value)
  }

  // Clear filter func on Click
  const onClearFilter = () => {
    setTabsValue(tabsValuesData[1].value)
    setSliderValues([0, maxCardsCount])
    setSliderValuesQuery([0, maxCardsCount])
    clearQuery()
  }

  const handleItemsPerPageChange = (value: number) => {
    setCurrentPageQuery(Number(initCurrentPage))
    setItemsPerPageQuery(value)
  }
  const handleCurrentPageChange = (value: number) => {
    setCurrentPageQuery(value)
  }

  const decksData = currentData ?? data
  const arrayOfDecks = decksData?.items.filter(item =>
    tabsValue === meData?.id ? item.userId === meData?.id : true
  )

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
            onChange={handleSearchChange}
            type={'search'}
            value={search}
          />
          <TabSwitcher
            className={s.tabsSwitcher}
            label={'Show decks cards'}
            onValueChange={handleTabsSwitch}
            tabs={tabsValuesData}
            value={tabsValue}
          />
          <div>
            <Slider
              className={s.slider}
              label={'Number of cards'}
              max={minMaxData?.max}
              min={minMaxData?.min}
              onValueChange={handleSliderValue}
              value={sliderValues}
            />
          </div>
          <Button className={s.clearFilter} onClick={onClearFilter} variant={'secondary'}>
            <TrashOutline />
            <Typography variant={'subtitle2'}>Clear Filter</Typography>
          </Button>
        </div>
      </div>
      <TableComponentWithTypes data={arrayOfDecks} tableHeader={headersNameDecks}>
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
