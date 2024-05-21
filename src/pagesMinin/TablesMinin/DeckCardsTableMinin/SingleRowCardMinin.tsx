import { Fragment } from 'react'

import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import TrashOutline from '@/assets/icons/svg/TrashOutline'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'

import s from '@/pagesMinin/TablesMinin/singleRowDeckMinin.module.scss'

import { Card } from '../../../../services/decks/deck.types'

// Region ПЕРЕХЕРАЧИТЬ ЭТУ КОМПОНЕНТУ ПРАВИЛЬНО!
type Props = {
  card: Card
}
export const SingleRowCardMinin = ({ card }: Props) => {
  const updatedAr = new Date(card.updated).toLocaleDateString('ru-RU')

  // console.log(card.shots) // Это видимо количество попыток или количество правильных ответов для рейтинга

  return (
    <Fragment key={card.id}>
      {/*<ModalAddEditDeck item={card} open={isUpdateModal} setOpen={setIsUpdateModal} />*/}
      <Table.Row key={card.id}>
        <Table.Cell>
          <Typography className={s.imgWrapper}>
            {card.questionImg && (
              <img alt={'default card img'} className={s.coverImg} src={card.questionImg} />
            )}
            {card.question}
          </Typography>
        </Table.Cell>
        <Table.Cell>
          <Typography className={s.imgWrapper}>
            {card.answerImg && (
              <img alt={'default card img'} className={s.coverImg} src={card.answerImg} />
            )}
            {card.answer}
          </Typography>
        </Table.Cell>
        <Table.Cell>{updatedAr}</Table.Cell>
        {/* Тут показать звездочки с заполнением*/}
        <Table.Cell>{card.grade}</Table.Cell>
        <Table.Cell>
          {/*  Тут нужно будет добавить проверку на МОИ cards или не мои. Если мои то показать кнопки, если не мои то нихера */}
          {/*{card.userId === authorId ? (*/}
          <div className={s.iconBtns}>
            {/*<Button className={s.btn} onClick={() => setIsUpdateModal(true)}>*/}
            <Button className={s.btn}>
              <Edit2Outline className={s.Edit2Outline} />
            </Button>
            <Button className={s.btn}>
              <TrashOutline className={s.TrashOutline} />
            </Button>
          </div>
        </Table.Cell>
      </Table.Row>
    </Fragment>
  )
}
