import helpImg from '@/assets/icons/informationIcon.svg'
import TrashOutline from '@/assets/icons/svg/TrashOutline'
import { tabsValuesData } from '@/common/consts/globalVariables'
import l from '@/common/locales/LangPathVariables'
import { ModalAddEditDeck } from '@/components/Modals/ModalAddEditDeck/ModalAddEditDeck'
import { DeleteModal } from '@/components/Modals/ModalDelete/DeleteModal'
import { SingleRowDeck } from '@/components/TableComponent/SingleRowDeck/SingleRowDeck'
import { TableComponentWithTypes } from '@/components/TableComponent/TableComponentWithTypes'
import { TableDeckMobile } from '@/components/TableComponent/mobile/TableDeckMobile/TableDeckMobile'
import { TableHeadMobile } from '@/components/TableComponent/mobile/TableHeadMobile/TableHeadMobile'
import Input from '@/components/ui/Input/Input'
import { LoadingBar } from '@/components/ui/LoadingBar/LoadingBar'
import { Page } from '@/components/ui/Page/Page'
import { PaginationWithSelect } from '@/components/ui/Pagination/PaginationWithSelect'
import Slider from '@/components/ui/Slider/Slider'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { TabSwitcher } from '@/components/ui/tabs-switcher/TabSwitcher'
import { useDecks } from '@/features/decks/lib/hooks/useDecks'
import MyJoyRide from '@/features/stepsForHelp/myJoyRide'
import { clsx } from 'clsx'

import s from './DecksPage.module.scss'
export function DecksPage() {
  const {
    changeMinMaxHandler,
    context,
    currentPage,
    data,
    deckItem,
    decksData,
    favoriteCounts,
    handleCurrentPageChange,
    handleItemsPerPageChange,
    handleSearchChange,
    handleTabsSwitch,
    headersNameDecks,
    isCreateModal,
    isDeleteModal,
    isFetching,
    isLoading,
    isTabletOrMobile,
    isUpdateModal,
    itemsPerPage,
    minMaxData,
    onClearFilter,
    onDeleteDeckHandler,
    run,
    search,
    selectOptionPagination,
    setDeckItem,
    setIsCreateModal,
    setIsDeleteModal,
    setIsUpdateModal,
    setRun,
    setSearchQuery,
    sliderMax,
    sliderMin,
    t,
    tabsValue,
  } = useDecks()

  return (
    <>
      <MyJoyRide run={run} setRun={setRun} />
      {isFetching && <LoadingBar />}
      <ModalAddEditDeck item={deckItem} open={isUpdateModal} setOpen={setIsUpdateModal} />
      <DeleteModal
        deleteFn={onDeleteDeckHandler}
        open={isDeleteModal}
        setOpen={setIsDeleteModal}
        title={t(l.decksPage.deleteDeck)}
      >
        <Typography variant={'h1'}>{deckItem?.name}</Typography>
        <Typography variant={'body1'}>{t(l.decksPage.isDeleteDeck)}</Typography>
      </DeleteModal>
      <ModalAddEditDeck open={isCreateModal} setOpen={setIsCreateModal} />
      <Page className={s.common}>
        <div className={s.heading}>
          <div className={s.headingFirstRow}>
            <div className={s.headingName}>
              <Typography as={'h1'} variant={'h1'}>
                {t(l.decksPage.decksList)}
              </Typography>
              <Button className={s.buttonHelp} onClick={() => setRun(!run)}>
                <img alt={'help button'} src={helpImg} />
              </Button>
            </div>

            <div className={'step-add-new-deck'}>
              <Button onClick={() => setIsCreateModal(true)} variant={'primary'}>
                <Typography variant={'subtitle2'}>{t(l.decksPage.addNewDeck)}</Typography>
              </Button>
            </div>
          </div>

          {/*filters area*/}
          <div className={s.filters}>
            <div className={clsx(s.boxForInput, 'step-search')}>
              <Input
                callback={setSearchQuery}
                className={s.input}
                currentValue={search}
                onChange={handleSearchChange}
                type={'search'}
              />
            </div>
            <div className={clsx(s.stepTabFilter, 'step-tab-filter')}>
              <div className={s.tabsContainer}>
                <TabSwitcher
                  className={s.tabsSwitcher}
                  label={t(l.decksPage.showDecksCards)}
                  onValueChange={handleTabsSwitch}
                  tabs={tabsValuesData}
                  value={tabsValue}
                />
                <div className={clsx(s.countsFav, context?.theme === 'sun' ? s.sun : '')}>
                  <Typography variant={'caption'}>{favoriteCounts}</Typography>
                </div>
              </div>
            </div>

            <div className={clsx(s.boxForSlider, 'step-slider-filter')}>
              <Slider
                className={s.slider}
                label={t(l.decksPage.numberOfCards)}
                max={minMaxData?.max}
                min={minMaxData?.min}
                onValueChange={changeMinMaxHandler}
                value={[sliderMin, sliderMax]}
              />
            </div>
            <div className={clsx(s.clearFilterBox, 'step-clear-filter')}>
              <Button className={s.clearFilter} onClick={onClearFilter} variant={'secondary'}>
                <TrashOutline />
                <Typography variant={'subtitle2'}>{t(l.decksPage.clearFilter)}</Typography>
              </Button>
            </div>
          </div>
        </div>
        {isTabletOrMobile ? (
          <TableHeadMobile
            data={decksData}
            isFetching={isFetching}
            isLoading={isLoading}
            tableHeader={headersNameDecks}
          >
            {decksData?.map(deck => {
              return (
                <TableDeckMobile
                  item={deck}
                  key={deck.id}
                  openDeleteModalHandler={setIsDeleteModal}
                  openEditModalHandler={setIsUpdateModal}
                  retrieveDeckItem={setDeckItem}
                />
              )
            })}
          </TableHeadMobile>
        ) : (
          <div className={'step-this-is-table'}>
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
          </div>
        )}

        <div className={clsx(s.footer, 'step-pagination')}>
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
