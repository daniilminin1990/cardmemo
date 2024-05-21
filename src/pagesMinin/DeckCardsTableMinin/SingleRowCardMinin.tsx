import { Fragment } from 'react'

import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import PlayCircleOutline from '@/assets/icons/svg/PlayCircleOutline'
import TrashOutline from '@/assets/icons/svg/TrashOutline'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'

import s from '@/pagesMinin/DecksTable/singleRowDeckMinin.module.scss'

import { Card } from '../../../services/decks/deck.types'

// Region ПЕРЕХЕРАЧИТЬ ЭТУ КОМПОНЕНТУ ПРАВИЛЬНО!
type Props = {
  card: Card
}
export const SingleRowCardMinin = ({ card }: Props) => {
  // const [isUpdateModal, setIsUpdateModal] = useState(false)
  // const [isDeleteModal, setIsDeleteModal] = useState(false)
  const updatedAr = new Date(card.updated).toLocaleDateString('ru-RU')

  // Id пользователя нужно брать с сервера, видимо. И если соответствует card.userId к authorId, то появляется кнопка на редирект к LearnCard
  // const authorId
  console.log(card.shots)

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
        <Table.Cell>{card.grade}</Table.Cell>
        <Table.Cell>
          {/*  Тут нужно будет добавить проверку на МОИ cards или не мои */}
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
          {/*) : (*/}
          <div className={s.iconBtns}>
            <Button className={s.btn} disabled={card.shots === 0}>
              <PlayCircleOutline
                className={`${s.playCircleOutline} ${card.shots === 0 && s.disabled}`}
              />
            </Button>
          </div>
          {/*)}*/}
        </Table.Cell>
      </Table.Row>
    </Fragment>
  )
}
