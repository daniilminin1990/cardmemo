import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'

import TrashOutline from '@/assets/icons/svg/TrashOutline'
import { headersNameDecks, initCurrentPage, selectOptionPagination } from '@/common/globalVariables'
import { ModalAddEditDeck } from '@/components/ModalsForTable/ModalAddEditDeck'
import { SingleRowDeck } from '@/components/TableComponent/SingleRowDeck/SingleRowDeck'
import { TableComponentWithTypes } from '@/components/TableComponent/TableComponentWithTypes'
import Input from '@/components/ui/Input/Input'
import { Page } from '@/components/ui/Page/Page'
import { PaginationWithSelect } from '@/components/ui/Pagination/PaginationWithSelect'
import Slider from '@/components/ui/Slider/Slider'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { TabSwitcher } from '@/components/ui/tabs-switcher/TabSwitcher'
import { useQueryParams } from '@/hooks/useQueryParams'
import { useSliderQueryParams } from '@/hooks/useSliderQueryParams'
import { useTabsValuesParams } from '@/hooks/useTabsValuesParams'
import { useMeQuery } from '@/services/auth/auth.service'
import { useGetDecksQuery } from '@/services/decks/decks.service'

import s from '@/Pages/DecksPage/decksPage.module.scss'

export function DecksPage() {
  const {
    clearQuery,
    currentOrderBy,
    currentPage,
    debouncedSearchValue,
    itemsPerPage,
    search,
    setCurrentPageQuery,
    setItemsPerPageQuery,
    setSearchQuery,
  } = useQueryParams()

  const {
    changeMinMaxHandler,
    debouncedEndValue,
    debouncedStartValue,
    isMinMaxLoading,
    minMaxData,
    sliderMax,
    sliderMin,
  } = useSliderQueryParams()

  const { authorId, setTabsValue, setTabsValueQuery, tabsValue, tabsValuesData } =
    useTabsValuesParams()
  const [open, setOpen] = useState(false)
  const { data: meData } = useMeQuery()

  const { currentData, data, isLoading } = useGetDecksQuery(
    {
      authorId: authorId || '',
      currentPage,
      itemsPerPage,
      maxCardsCount: debouncedEndValue,
      minCardsCount: debouncedStartValue,
      name: debouncedSearchValue,
      orderBy: currentOrderBy,
    },
    { skip: !minMaxData }
  )

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPageQuery(Number(initCurrentPage))
    setSearchQuery(e.currentTarget.value)
  }

  const handleTabsSwitch = (value: string) => {
    setTabsValueQuery(value)
    setTabsValue(value)
  }

  const onClearFilter = () => {
    setTabsValue(tabsValuesData[1].value)
    clearQuery()
    toast.info('All filters reset!', { autoClose: 2000 })
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

  return (
    <Page className={s.common}>
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
            currentValue={search}
            onChange={handleSearchChange}
            type={'search'}
          />
          <TabSwitcher
            className={s.tabsSwitcher}
            label={'Show decks cards'}
            onValueChange={handleTabsSwitch}
            tabs={tabsValuesData}
            value={tabsValue}
          />
          <div className={s.sliderBox}>
            <Slider
              className={s.slider}
              label={'Number of cards'}
              max={minMaxData?.max}
              min={minMaxData?.min}
              onValueChange={changeMinMaxHandler}
              value={[sliderMin, sliderMax]}
            />
          </div>
          <Button className={s.clearFilter} onClick={onClearFilter} variant={'secondary'}>
            <TrashOutline />
            <Typography variant={'subtitle2'}>Clear Filter</Typography>
          </Button>
        </div>
      </div>
      <TableComponentWithTypes data={arrayOfDecks} tableHeader={headersNameDecks}>
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
