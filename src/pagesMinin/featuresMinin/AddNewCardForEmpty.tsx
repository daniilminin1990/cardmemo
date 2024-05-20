import { Link } from 'react-router-dom'

import ArrowBackOutline from '@/assets/icons/svg/ArrowBackOutline'
import Input from '@/components/ui/Input/Input'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { UniversalTableDeckMinin } from '@/pagesMinin/DecksTable/DecksTableMinin'

import s from './addNewCardForEmpty.module.scss'

export const data = [
  { key: 'question', title: 'Question' },
  { key: 'answer', title: 'Answer' },
  { key: 'lastUpdated', title: 'Last Updated' },
  { key: 'grade', title: 'Grade' },
]

export const AddNewCardForEmpty = () => {
  return (
    <div>
      {/*<ModalOnAddDeckMinin open={open} setOpen={setOpen} />*/}
      {/*<ModalAddEditDeck open={open} setOpen={setOpen} />*/}
      <div className={s.heading}>
        <div className={s.headingFirstRow}>
          <Typography as={Link} style={{ textDecoration: 'none' }} to={'/'} variant={'body2'}>
            <ArrowBackOutline />
            Back to Deck List
          </Typography>
        </div>
        <div className={s.headingGrid}>
          <Typography as={'h1'} variant={'h1'}>
            Name Deck
          </Typography>
        </div>
        <Input
          // callback={setSearchQuery}
          className={s.input}
          // onChange={handleSearch}
          // querySearch={search}
          type={'search'}
          // value={search}
        />
      </div>
      <div className={s.emptyContent}>
        <Typography variant={'body1'}>
          This pack is empty. Click add new card to fill this pack
        </Typography>
        <Button type={'button'}>
          <Typography variant={'subtitle2'}>Add New Card</Typography>
        </Button>
      </div>
      <UniversalTableDeckMinin
      // data={data}
      // handleSort={handleSort}
      // searchParamsOrderBy={currentOrderBy}
      />
    </div>
  )
}
