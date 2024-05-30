import { ChangeEvent, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import groupIcon from '@/assets/icons/WhiteSVG/Group 1399.svg'
import menuIcon2 from '@/assets/icons/WhiteSVG/edit-2-outline.svg'
import playIcon from '@/assets/icons/WhiteSVG/play-circle-outline.svg'
import menuIcon from '@/assets/icons/WhiteSVG/trash-outline.svg'
import { handleToastInfo } from '@/common/consts/toastVariants'
import { headersNameCards, initCurrentPage, selectOptionPagination } from '@/common/globalVariables'
import { ModalAddEditDeck } from '@/components/ModalsForTable/ModalAddEditDeck'
import { ModalDeleteDeck } from '@/components/ModalsForTable/ModalDeleteDeck'
import { ModalAddEditCard } from '@/components/ModalsForTable/ModalEditCard/ModalAddEditCard'
import ModalOnEmpty from '@/components/ModalsForTable/ModalOnEmpty/ModalOnEmpty'
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
import { useQueryParams } from '@/hooks/useQueryParams'
import { path } from '@/router/path'
import { router } from '@/router/router'
import { useMeQuery } from '@/services/auth/auth.service'
import { useGetCardsQuery } from '@/services/cards/cards.service'
import { Deck } from '@/services/decks/deck.types'
import { useGetDeckByIdQuery } from '@/services/decks/decks.service'
import { clsx } from 'clsx'

import s from './cardsPage.module.scss'

export const CardsPage = () => {
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

  const [open, setOpen] = useState(false)

  // Когда переходим на эту страницу, то переходим по Deck ID,
  // то есть ID можем взять из URL, значит можно использовать хук useParams

  // А как мы попадем на эту страницу??? -- по Id Deck. Значит id Deck нужно передать в URL при переходе.
  const deckId = useParams().deckId
  const { data: meData } = useMeQuery()
  const {
    currentData: currentDeckData,
    data: deck,
    isLoading: isDeckLoading,
  } = useGetDeckByIdQuery({ id: deckId ?? '' })

  const { currentData, data, isFetching, isLoading } = useGetCardsQuery({
    args: { currentPage, itemsPerPage, orderBy: currentOrderBy, question: debouncedSearchValue },
    id: deckId ?? '',
  })
  const [openModal, setOpenModal] = useState(false)
  const [openEditDeckModal, setOpenEditDeckModal] = useState(false)
  const [openDeleteDeckModal, setOpenDeleteDeckModal] = useState(false)
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
      setOpenModal(true)
    } else {
      router.navigate(`${path.decks}`)
    }
  }

  // if (isLoading) {
  //   return <Loading />
  // }
  const notifyLearnHandler = () => {
    handleToastInfo(`Add card before learning!`)
  }

  const loadingStatus = isLoading || isFetching || isDeckLoading

  return (
    <>
      {loadingStatus && <LoadingBar />}
      <Page className={s.common} mt={'24px'}>
        <ModalOnEmpty open={openModal} setIsOpenModal={setOpenModal} />
        <ModalAddEditCard open={open} setOpen={setOpen} />
        <ModalAddEditDeck item={deck} open={openEditDeckModal} setOpen={setOpenEditDeckModal} />
        <ModalDeleteDeck
          item={deck ?? ({} as Deck)}
          open={openDeleteDeckModal}
          setIsDeleteModal={setOpenDeleteDeckModal}
        />
        <div className={s.heading}>
          <BackBtn as={Link} name={`Back to Deck List`} onClick={handleOpenModal} path={'#'} />
          <div className={s.headingSecondRow}>
            <div className={clsx(deck?.cover && s.isWithImage)}>
              <div className={s.info}>
                <Typography as={'h1'} variant={'h1'}>
                  {deck?.name}
                </Typography>
                {isMineCards && (
                  // В DropDownItem можно передать onClick? Если нет, то обернуть в Button
                  <DropdownMenuDemo className={s.dropdown} icon={groupIcon} type={'menu'}>
                    {isCardsCountZero ? (
                      <DropDownItem
                        handleOnClick={notifyLearnHandler}
                        icon={playIcon}
                        text={'Learn'}
                      />
                    ) : (
                      <DropDownItem
                        href={`${path.decks}/${deckId}${path.learn}`}
                        icon={playIcon}
                        text={'Learn'}
                      />
                    )}

                    <DropDownItem
                      handleOnClick={() => setOpenEditDeckModal(true)}
                      icon={menuIcon2}
                      text={'Edit'}
                    />
                    <DropDownItem
                      handleOnClick={() => setOpenDeleteDeckModal(true)}
                      icon={menuIcon}
                      text={'Delete'}
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
                  <Button className={s.addCard} onClick={() => setOpen(true)} type={'button'}>
                    <Typography variant={'subtitle2'}>Add New Card</Typography>
                  </Button>
                ) : (
                  <Button
                    as={Link}
                    className={s.learnCards}
                    onClick={() => setOpen(true)}
                    to={`${path.decks}/${deckId}${path.learn}`}
                    type={'button'}
                  >
                    <Typography variant={'subtitle2'}>Learn Cards</Typography>
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
                ? 'This deck is empty. Click add new card to fill this pack'
                : 'Unfortunately this deck is empty'}
            </Typography>
            {isMineCards && (
              <Button className={s.addCard} onClick={() => setOpen(true)} type={'button'}>
                <Typography variant={'subtitle2'}>Add New Card</Typography>
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
              {item => <SingleRowCard item={item} />}
            </TableComponentWithTypes>
            <div className={s.footer}>
              {/*! Это для скрытия пагинации было прикручено. Херота - убрал*/}
              {/*{isCardsCountFilled &&*/}
              {/*  !search &&*/}
              {/*  cardsData?.items &&*/}
              {/*  cardsData.items.length >= currentPage * itemsPerPage && (*/}
              <PaginationWithSelect
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                selectOptions={selectOptionPagination}
                setCurrentPage={handleCurrentPageChange}
                setItemsPerPage={handleItemsPerPageChange}
                totalItems={cardsData?.pagination.totalItems || 0}
              />
              {/*)}*/}
            </div>
          </>
        )}
      </Page>
    </>
  )
}
