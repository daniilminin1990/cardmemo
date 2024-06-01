import { ChangeEvent, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

import groupIcon from '@/assets/icons/WhiteSVG/Group 1399.svg'
import groupIconBlack from '@/assets/icons/WhiteSVG/Group 1399Black.svg'
import menuIcon2 from '@/assets/icons/WhiteSVG/edit-2-outline.svg'
import playIcon from '@/assets/icons/WhiteSVG/play-circle-outline.svg'
import menuIcon from '@/assets/icons/WhiteSVG/trash-outline.svg'
import { handleToastInfo } from '@/common/consts/toastVariants'
import { headersNameCards, initCurrentPage, selectOptionPagination } from '@/common/globalVariables'
import { ModalAddEditDeck } from '@/components/Modals/ModalAddEditDeck/ModalAddEditDeck'
import { DeleteModal } from '@/components/Modals/ModalDelete/DeleteModal'
import { ModalAddEditCard } from '@/components/Modals/ModalEditCard/ModalAddEditCard'
import ModalOnEmpty from '@/components/Modals/ModalOnEmpty/ModalOnEmpty'
import { SingleRowCard } from '@/components/TableComponent/SingleRowCard/SingleRowCard'
import { TableComponentWithTypes } from '@/components/TableComponent/TableComponentWithTypes'
import { BackBtn } from '@/components/ui/BackBtn/BackBtn'
import DropdownMenuDemo from '@/components/ui/DropDown/DropDown'
import DropDownItem from '@/components/ui/DropDown/DropDownItem'
import Input from '@/components/ui/Input/Input'
import { LoadingBar } from '@/components/ui/LoadingBar/LoadingBar'
import { Page } from '@/components/ui/Page/Page'
import { PaginationWithSelect } from '@/components/ui/Pagination/PaginationWithSelect'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { UserContext } from '@/components/ui/changeTheme/Context'
import { useQueryParams } from '@/hooks/useQueryParams'
import { path } from '@/router/path'
import { router } from '@/router/router'
import { useMeQuery } from '@/services/auth/auth.service'
import { useDeleteCardByIdMutation, useGetCardsQuery } from '@/services/cards/cards.service'
import { CardResponse } from '@/services/cards/cards.types'
import { useDeleteDeckMutation, useGetDeckByIdQuery } from '@/services/decks/decks.service'
import { clsx } from 'clsx'

import s from './cardsPage.module.scss'

export const CardsPage = () => {
  const context = useContext(UserContext)
  const { t } = useTranslation()
  const {
    currentOrderBy,
    currentPage,
    debouncedSearchValue,
    itemsPerPage,
    search,
    setCurrentPageQuery,
    setItemsPerPageQuery,
    setSearchQuery,
  } = useQueryParams()

  const [deleteCard] = useDeleteCardByIdMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const { deckId = '' } = useParams()
  const { data: meData } = useMeQuery()
  const {
    currentData: currentDeckData,
    data: deck,
    isLoading: isDeckLoading,
  } = useGetDeckByIdQuery({ id: deckId })

  const { currentData, data, isFetching, isLoading } = useGetCardsQuery({
    args: { currentPage, itemsPerPage, orderBy: currentOrderBy, question: debouncedSearchValue },
    id: deckId ?? '',
  })
  const [cardItem, setCardItem] = useState<CardResponse>()
  const [isEmptyModal, setIsEmptyModal] = useState(false) // Переход назад с пустой таблицей
  const [isUpdateDeckModal, setIsUpdateDeckModal] = useState(false) // Изменение Deck
  const [isDeleteDeckModal, setIsDeleteDeckModal] = useState(false) // Удаление Deck
  const [isCreateCardModal, setIsCreateCardModal] = useState(false) // Добавление Card | Переход в Learn?
  const [isUpdateCardModal, setIsUpdateCardModal] = useState(false) // Изменение Card | Переход в Learn
  const [isDeleteCardModal, setIsDeleteCardModal] = useState(false) // Удаление Card

  const handleItemsPerPageChange = (value: number) => {
    setCurrentPageQuery(Number(initCurrentPage))
    setItemsPerPageQuery(value)
  }

  const handleCurrentPageChange = (value: number) => {
    setCurrentPageQuery(value)
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPageQuery(Number(initCurrentPage))
    setSearchQuery(e.currentTarget.value)
  }

  const onDeleteDeckHandler = () => {
    deleteDeck({ id: deckId })
    setIsDeleteDeckModal(true)
    if (deckId) {
      router.navigate(path.decks)
    }
  }
  const onDeleteCardHandler = () => {
    deleteCard({ id: cardItem?.id ?? '' })
  }

  const cardsData = currentData ?? data

  const isCardsCountFilled = currentDeckData?.cardsCount !== 0

  const isCardsCountZero =
    currentDeckData?.cardsCount === 0 &&
    deck?.cardsCount === 0 &&
    currentData?.items?.length === 0 &&
    data?.items?.length === 0

  const isMineCards = currentDeckData?.userId === meData?.id

  const handleOpenModal = () => {
    if (
      (isMineCards && isCardsCountZero) ||
      (isMineCards && cardsData?.items?.length === 0) ||
      (isMineCards && data?.items?.length === 0)
    ) {
      setIsEmptyModal(true)
    } else {
      console.log('baga')
      router.navigate(`${path.decks}`)
    }
  }

  const notifyLearnHandler = () => {
    handleToastInfo(`Add card before learning!`)
  }

  const loadingStatus = isLoading || isFetching || isDeckLoading

  return (
    <>
      {loadingStatus && <LoadingBar />}
      <Page className={s.common} mt={'24px'}>
        <ModalOnEmpty open={isEmptyModal} setIsOpenModal={setIsEmptyModal} />
        <ModalAddEditDeck
          item={currentDeckData}
          open={isUpdateDeckModal}
          setOpen={setIsUpdateDeckModal}
        />
        <ModalAddEditCard item={cardItem} open={isUpdateCardModal} setOpen={setIsUpdateCardModal} />
        <ModalAddEditCard open={isCreateCardModal} setOpen={setIsCreateCardModal} />
        <DeleteModal
          deleteFn={onDeleteDeckHandler}
          open={isDeleteDeckModal}
          setOpen={setIsDeleteDeckModal}
          title={t('cardsPage.deleteDeck')}
        >
          <Typography variant={'h1'}>{deck?.name}</Typography>
          <Typography variant={'body1'}>{t('cardsPage.isDeleteDeck')}</Typography>
        </DeleteModal>
        <DeleteModal
          deleteFn={onDeleteCardHandler}
          open={isDeleteCardModal}
          setOpen={setIsDeleteCardModal}
          title={t('cardsPage.deleteCard')}
        >
          <Typography variant={'h1'}>{cardItem?.question}</Typography>
          <Typography variant={'body1'}>{t('cardsPage.isDeleteCard')}</Typography>
        </DeleteModal>
        <div className={s.heading}>
          <BackBtn onClick={handleOpenModal} to={'#'}>
            {t('cardsPage.backDeckList')}
          </BackBtn>
          <div className={s.headingSecondRow}>
            <div className={clsx(deck?.cover && s.isWithImage)}>
              <div className={s.info}>
                <Typography as={'h1'} variant={'h1'}>
                  {deck?.name}
                </Typography>
                {isMineCards && (
                  <DropdownMenuDemo
                    className={s.dropdown}
                    icon={context?.theme === 'moon' ? groupIcon : groupIconBlack}
                    type={'menu'}
                  >
                    {isCardsCountZero ? (
                      <DropDownItem
                        handleOnClick={notifyLearnHandler}
                        icon={playIcon}
                        text={t('cardsPage.learn')}
                      />
                    ) : (
                      <DropDownItem
                        href={`${path.decks}/${deckId}${path.learn}`}
                        icon={playIcon}
                        text={t('cardsPage.learn')}
                      />
                    )}

                    <DropDownItem
                      handleOnClick={() => setIsUpdateDeckModal(true)}
                      icon={menuIcon2}
                      text={t('cardsPage.edit')}
                    />
                    <DropDownItem
                      handleOnClick={() => setIsDeleteDeckModal(true)}
                      icon={menuIcon}
                      text={t('cardsPage.delete')}
                    />
                  </DropdownMenuDemo>
                )}
              </div>
              {isCardsCountFilled && deck?.cover && (
                <img alt={'img'} src={deck?.cover} width={'120px'} />
              )}
            </div>
            {isCardsCountFilled && (
              <div className={s.switchButton}>
                {isMineCards ? (
                  <Button
                    className={s.addCard}
                    onClick={() => setIsCreateCardModal(true)}
                    type={'button'}
                  >
                    <Typography variant={'subtitle2'}>{t('cardsPage.addNewCard')}</Typography>
                  </Button>
                ) : (
                  <Button
                    as={Link}
                    className={s.learnCards}
                    onClick={() => setIsUpdateCardModal(true)}
                    to={`${path.decks}/${deckId}${path.learn}`}
                    type={'button'}
                  >
                    <Typography variant={'subtitle2'}>{t('cardsPage.learnCards')}</Typography>
                  </Button>
                )}
              </div>
            )}
          </div>
          {isCardsCountFilled && (
            <Input
              callback={setSearchQuery}
              className={s.input}
              currentValue={search}
              onChange={handleSearch}
              type={'search'}
            />
          )}
        </div>
        {isCardsCountZero ? (
          <div className={s.emptyContent}>
            <Typography variant={'body1'}>
              {isMineCards
                ? `${t('cardsPage.emptyDeck')}`
                : `${t('cardsPage.unfortunatelyEmptyDeck')}`}
            </Typography>
            {isMineCards && (
              <Button
                className={s.addCard}
                onClick={() => setIsCreateCardModal(true)}
                type={'button'}
              >
                <Typography variant={'subtitle2'}>{t('cardsPage.addNewCard')}</Typography>
              </Button>
            )}
          </div>
        ) : (
          <>
            <TableComponentWithTypes
              data={cardsData?.items}
              isLoading={loadingStatus}
              tableHeader={headersNameCards}
            >
              {cardsData?.items.map(card => {
                return (
                  <SingleRowCard
                    item={card}
                    key={card.id}
                    openDeleteModalHandler={setIsDeleteCardModal}
                    openEditModalHandler={setIsUpdateCardModal}
                    retrieveCardItem={setCardItem}
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
                totalItems={cardsData?.pagination.totalItems || 0}
              />
            </div>
          </>
        )}
      </Page>
    </>
  )
}
