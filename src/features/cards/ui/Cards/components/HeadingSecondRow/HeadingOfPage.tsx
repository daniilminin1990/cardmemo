import React, { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import groupIcon from '@/assets/icons/WhiteSVG/Group 1399.svg'
import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import PlayCircleOutline from '@/assets/icons/svg/PlayCircleOutline'
import PrivacyMask from '@/assets/icons/svg/PrivacyMask'
import TrashOutline from '@/assets/icons/svg/TrashOutline'
import defaultCard from '@/assets/img/defaultCard.jpg'
import { handleToastInfo } from '@/common/consts/toastVariants'
import { initCurrentPage } from '@/common/globalVariables'
import { BackBtn } from '@/components/ui/BackBtn/BackBtn'
import DropdownMenuDemo from '@/components/ui/DropDown/DropDown'
import DropDownItem from '@/components/ui/DropDown/DropDownItem'
import Input from '@/components/ui/Input/Input'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { useQueryParams } from '@/hooks/useQueryParams'
import { path } from '@/router/path'
import { router } from '@/router/router'
import { useGetCardsQuery } from '@/services/cards/cards.service'
import { useGetDeckByIdQuery } from '@/services/decks/decks.service'
import { clsx } from 'clsx'

import s from '@/Pages/CardsPage/HeadingSecondRow/headingOfPage.module.scss'

type HeadingSecondRowProps = {
  deckId: string
  isCardsCountZero: boolean
  isMineCards: boolean
  openCreateCardModalHandler: (value: boolean) => void
  openDeleteDeckModalHandler: (value: boolean) => void
  openEditDeckModalHandler: (value: boolean) => void
  openEmptyDeckModalHandler: (value: boolean) => void
}
export const HeadingOfPage = ({
  deckId,
  isCardsCountZero,
  isMineCards,
  openCreateCardModalHandler,
  openDeleteDeckModalHandler,
  openEditDeckModalHandler,
  openEmptyDeckModalHandler,
}: HeadingSecondRowProps) => {
  const deckQuery = localStorage.getItem('deckQuery') ? `/${localStorage.getItem('deckQuery')}` : ''
  const { t } = useTranslation()
  const { data: deck } = useGetDeckByIdQuery({ id: deckId })
  const { isLoading } = useGetCardsQuery({ args: {}, id: deckId ?? '' })
  const notifyLearnHandler = () => {
    handleToastInfo(`${t(`successApiResponse.commonInfo.nothingLearn`)}`)
  }

  const { debouncedSearchValue, setCurrentPageQuery, setSearchQuery } = useQueryParams()
  const handleOpenModal = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isMineCards && isCardsCountZero && deck?.cardsCount === 0) {
      e.preventDefault()
      openEmptyDeckModalHandler(true)
    } else {
      router.navigate(`${path.decks}${deckQuery}`)
    }
  }
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPageQuery(Number(initCurrentPage))
    setSearchQuery(e.currentTarget.value)
  }

  const condition = deck?.cardsCount !== 0 || !isCardsCountZero

  return (
    <div className={s.heading}>
      <BackBtn onClick={handleOpenModal} to={path.decks + deckQuery}>
        {t('cardsPage.backDeckList')}
      </BackBtn>
      <div className={s.headingSecondRow}>
        <div className={clsx(deck?.cover && s.isWithImage)}>
          <div className={s.info}>
            <Typography as={'h1'} variant={'h1'}>
              {deck?.name}
            </Typography>
            {isMineCards && (
              <DropdownMenuDemo className={s.dropdown} icon={groupIcon} type={'menu'}>
                {isCardsCountZero ? (
                  <DropDownItem
                    handleOnClick={notifyLearnHandler}
                    icon={<PlayCircleOutline />}
                    text={t('cardsPage.learn')}
                  />
                ) : (
                  <DropDownItem
                    href={`${path.decks}/${deckId}${path.learn}`}
                    icon={<PlayCircleOutline />}
                    text={t('cardsPage.learn')}
                  />
                )}
                <DropDownItem
                  handleOnClick={() => openEditDeckModalHandler(true)}
                  icon={<Edit2Outline />}
                  text={t('cardsPage.edit')}
                />
                <DropDownItem
                  handleOnClick={() => openDeleteDeckModalHandler(true)}
                  icon={<TrashOutline />}
                  text={t('cardsPage.delete')}
                />
              </DropdownMenuDemo>
            )}
            {deck?.isPrivate && <PrivacyMask className={s.privacyIcon} />}
          </div>
          <div className={s.wrapperCoverImg}>
            <img alt={'img'} className={s.coverImg} src={deck?.cover ? deck?.cover : defaultCard} />
          </div>
        </div>
        <div className={s.switchButton}>
          {isMineCards && !isLoading && !isCardsCountZero && (
            <Button onClick={() => openCreateCardModalHandler(true)} type={'button'}>
              <Typography variant={'subtitle2'}>{t('cardsPage.addNewCard')}</Typography>
            </Button>
          )}
          {!isCardsCountZero && !isMineCards && (
            <Button
              as={Link}
              className={s.learnCards}
              to={`${path.decks}/${deckId}${path.learn}`}
              type={'button'}
            >
              <Typography variant={'subtitle2'}>{t('cardsPage.learnCards')}</Typography>
            </Button>
          )}
        </div>
      </div>
      {condition && !isLoading && (
        <Input
          callback={setSearchQuery}
          className={s.input}
          currentValue={debouncedSearchValue}
          onChange={handleSearch}
          type={'search'}
        />
      )}
    </div>
  )
}
