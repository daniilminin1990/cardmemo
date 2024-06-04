import React, { ChangeEvent, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import groupIcon from '@/assets/icons/WhiteSVG/Group 1399.svg'
import groupIconBlack from '@/assets/icons/WhiteSVG/Group 1399Black.svg'
import menuIcon2 from '@/assets/icons/WhiteSVG/edit-2-outline.svg'
import playIcon from '@/assets/icons/WhiteSVG/play-circle-outline.svg'
import menuIcon from '@/assets/icons/WhiteSVG/trash-outline.svg'
import { handleToastInfo } from '@/common/consts/toastVariants'
import { deckQuery, initCurrentPage } from '@/common/globalVariables'
import { BackBtn } from '@/components/ui/BackBtn/BackBtn'
import DropdownMenuDemo from '@/components/ui/DropDown/DropDown'
import DropDownItem from '@/components/ui/DropDown/DropDownItem'
import Input from '@/components/ui/Input/Input'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { UserContext } from '@/components/ui/changeTheme/Context'
import { useQueryParams } from '@/hooks/useQueryParams'
import { path } from '@/router/path'
import { router } from '@/router/router'
import { Deck } from '@/services/decks/deck.types'
import { clsx } from 'clsx'

import s from '@/Pages/CardsPage/HeadingSecondRow/headingOfPage.module.scss'

type HeadingSecondRowProps = {
  deck?: Deck
  deckId: string
  isCardsCountZero: boolean
  isMineCards: boolean
  openCreateCardModalHandler: (value: boolean) => void
  openDeleteDeckModalHandler: (value: boolean) => void
  openEditDeckModalHandler: (value: boolean) => void
  openEmptyDeckModalHandler: (value: boolean) => void
  openModalHandler?: (value: boolean) => void
}
export const HeadingOfPage = ({
  deck,
  deckId,
  isCardsCountZero,
  isMineCards,
  openCreateCardModalHandler,
  openDeleteDeckModalHandler,
  openEditDeckModalHandler,
  openEmptyDeckModalHandler,
  openModalHandler,
}: HeadingSecondRowProps) => {
  const context = useContext(UserContext)
  const { t } = useTranslation()
  const notifyLearnHandler = () => {
    handleToastInfo(`Add card before learning!`)
  }
  const { search, setCurrentPageQuery, setSearchQuery } = useQueryParams()
  const handleOpenModal = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isMineCards && isCardsCountZero) {
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

  const isCardsCountFilled = !isCardsCountZero

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
                  handleOnClick={() => openEditDeckModalHandler(true)}
                  icon={menuIcon2}
                  text={t('cardsPage.edit')}
                />
                <DropDownItem
                  handleOnClick={() => openDeleteDeckModalHandler(true)}
                  icon={menuIcon}
                  text={t('cardsPage.delete')}
                />
              </DropdownMenuDemo>
            )}
          </div>
          {deck?.cover && <img alt={'img'} src={deck?.cover} width={'120px'} />}
        </div>
        {isCardsCountFilled && (
          <div className={s.switchButton}>
            {isMineCards ? (
              <Button onClick={() => openCreateCardModalHandler(true)} type={'button'}>
                <Typography variant={'subtitle2'}>{t('cardsPage.addNewCard')}</Typography>
              </Button>
            ) : (
              <Button
                as={Link}
                className={s.learnCards}
                onClick={() => openModalHandler?.(true)}
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
  )
}
