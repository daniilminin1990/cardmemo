import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import TrashOutline from '@/assets/icons/svg/TrashOutline'
import { handleToastInfo } from '@/common/consts/toastVariants'
import { headersNameDecks, initCurrentPage, selectOptionPagination } from '@/common/globalVariables'
import { ModalAddEditDeck } from '@/components/Modals/ModalAddEditDeck/ModalAddEditDeck'
import { DeleteModal } from '@/components/Modals/ModalDelete/DeleteModal'
import { SingleRowDeck } from '@/components/TableComponent/SingleRowDeck/SingleRowDeck'
import { TableComponentWithTypes } from '@/components/TableComponent/TableComponentWithTypes'
import Input from '@/components/ui/Input/Input'
import { LoadingBar } from '@/components/ui/LoadingBar/LoadingBar'
import { Page } from '@/components/ui/Page/Page'
import { PaginationWithSelect } from '@/components/ui/Pagination/PaginationWithSelect'
import Slider from '@/components/ui/Slider/Slider'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { TabSwitcher } from '@/components/ui/tabs-switcher/TabSwitcher'
import { useQueryParams } from '@/hooks/useQueryParams'
import { useSliderQueryParams } from '@/hooks/useSliderQueryParams'
import { useTabsValuesParams } from '@/hooks/useTabsValuesParams'
import { path } from '@/router/path'
import { router } from '@/router/router'
import { Deck } from '@/services/decks/deck.types'
import { useDeleteDeckMutation, useGetDecksQuery } from '@/services/decks/decks.service'

import s from '@/Pages/DecksPage/decksPage.module.scss'

export function DecksPage() {
  const { t } = useTranslation()
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
    minMaxData,
    sliderMax,
    sliderMin,
  } = useSliderQueryParams()

  const { authorId, favoritedBy, setTabsValue, setTabsValueQuery, tabsValue, tabsValuesData } =
    useTabsValuesParams()
  const [deleteDeck] = useDeleteDeckMutation()
  // const { data: meData, isLoading: meIsLoading } = useMeQuery()
  const { currentData, data, isFetching, isLoading } = useGetDecksQuery(
    {
      authorId: authorId || '',
      currentPage,
      favoritedBy: favoritedBy || '',
      itemsPerPage,
      maxCardsCount: debouncedEndValue,
      minCardsCount: debouncedStartValue,
      name: debouncedSearchValue,
      orderBy: currentOrderBy,
    }
    // { skip: !meData && !minMaxData }
  )

  const { deckId } = useParams()

  const [isCreateModal, setIsCreateModal] = useState(false)
  const [isUpdateModal, setIsUpdateModal] = useState(false)
  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const [deckItem, setDeckItem] = useState<Deck>()

  // Это для обновления currentPage при изменении tabsValue кроме All decks
  // useEffect(() => {
  //   const maxNumberOfPages = Math.ceil((currentData?.pagination?.totalItems ?? 1) / itemsPerPage)
  //
  //   if (maxNumberOfPages < currentPage) {
  //     setCurrentPageQuery(maxNumberOfPages)
  //   } else {
  //     setCurrentPageQuery(currentPage)
  //   }
  // }, [authorId, favoritedBy])

  const onDeleteDeckHandler = () => {
    deleteDeck({ id: deckItem?.id ?? '' })
    setIsDeleteModal(true)
    if (deckId) {
      router.navigate(path.decks)
    }
  }

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
    handleToastInfo('All filters reset!', 2000)
  }

  const handleItemsPerPageChange = (value: number) => {
    // setCurrentPageQuery(Number(initCurrentPage))
    const maxNumberOfPages = Math.ceil((currentData?.pagination?.totalItems ?? 0) / value)

    if (maxNumberOfPages < currentPage) {
      setCurrentPageQuery(maxNumberOfPages)
    }
    setItemsPerPageQuery(value)
  }
  const handleCurrentPageChange = (value: number) => {
    setCurrentPageQuery(value)
  }

  const decksData = currentData?.items ?? data?.items

  return (
    <>
      {isFetching && <LoadingBar />}
      <ModalAddEditDeck item={deckItem} open={isUpdateModal} setOpen={setIsUpdateModal} />
      <DeleteModal
        deleteFn={onDeleteDeckHandler}
        open={isDeleteModal}
        setOpen={setIsDeleteModal}
        title={t('decksPage.deleteDeck')}
      >
        <Typography variant={'h1'}>{deckItem?.name}</Typography>
        <Typography variant={'body1'}>{t('decksPage.isDeleteDeck')}</Typography>
      </DeleteModal>
      <ModalAddEditDeck open={isCreateModal} setOpen={setIsCreateModal} />
      <Page className={s.common}>
        <div className={s.heading}>
          <div className={s.headingFirstRow}>
            <Typography as={'h1'} variant={'h1'}>
              {t('decksPage.decksList')}
            </Typography>
            <Button onClick={() => setIsCreateModal(true)} variant={'primary'}>
              <Typography variant={'subtitle2'}>{t('decksPage.addNewDeck')}</Typography>
            </Button>
          </div>
          <div className={s.filters}>
            <Input
              callback={setSearchQuery}
              className={s.input}
              currentValue={search}
              onChange={handleSearchChange}
              type={'search'}
            />
            <TabSwitcher
              className={s.tabsSwitcher}
              label={t('decksPage.showDecksCards')}
              onValueChange={handleTabsSwitch}
              tabs={tabsValuesData}
              value={tabsValue}
            />
            <div className={s.sliderBox}>
              <Slider
                className={s.slider}
                label={t('decksPage.numberOfCards')}
                max={minMaxData?.max}
                min={minMaxData?.min}
                onValueChange={changeMinMaxHandler}
                value={[sliderMin, sliderMax]}
              />
            </div>
            <Button className={s.clearFilter} onClick={onClearFilter} variant={'secondary'}>
              <TrashOutline />
              <Typography variant={'subtitle2'}>{t('decksPage.clearFilter')}</Typography>
            </Button>
          </div>
        </div>
        <TableComponentWithTypes
          data={decksData}
          isFetching={isFetching}
          isLoading={isLoading}
          tableHeader={headersNameDecks}
        >
          {decksData?.map(deck => {
            return (
              <SingleRowDeck
                item={deck}
                key={deck.id}
                openDeleteModalHandler={setIsDeleteModal}
                openEditModalHandler={setIsUpdateModal}
                retrieveDeckItem={setDeckItem}
              />
            )
          })}
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
    </>
  )
}
