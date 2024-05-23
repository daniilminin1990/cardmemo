import { Fragment, useState } from 'react'

import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import TrashOutline from '@/assets/icons/svg/TrashOutline'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { ModalAddEditCard } from '@/pagesMinin/ModalsForTable/ModalEditCard/ModalAddEditCard'

import s from '@/pagesMinin/Tables/tableSingleRow.module.scss'

import { useDeleteCardByIdMutation } from '../../../../services/cards/cards.service'
import { Card } from '../../../../services/cards/cards.types'

type Props = {
  item: Card
}
export const SingleRowCard = ({ item }: Props) => {
  const [open, setOpen] = useState(false)
  const updatedAr = new Date(item.updated).toLocaleDateString('ru-RU')
  const [deleteCard] = useDeleteCardByIdMutation()

  return (
    <Fragment key={item.id}>
      <ModalAddEditCard item={item} open={open} setOpen={setOpen} />
      <Table.Row key={item.id}>
        <Table.Cell>
          <Typography className={s.imgWrapper}>
            {item.questionImg && (
              <img alt={'default card img'} className={s.coverImg} src={item.questionImg} />
            )}
            {item.question}
          </Typography>
        </Table.Cell>
        <Table.Cell>
          <Typography className={s.imgWrapper}>
            {item.answerImg && (
              <img alt={'default card img'} className={s.coverImg} src={item.answerImg} />
            )}
            {item.answer}
          </Typography>
        </Table.Cell>
        <Table.Cell>{updatedAr}</Table.Cell>
        {/* Тут показать звездочки с заполнением*/}
        <Table.Cell>{item.grade}</Table.Cell>
        <Table.Cell>
          {/*  Тут нужно будет добавить проверку на МОИ cards или не мои. Если мои то показать кнопки, если не мои то нихера */}
          {/*{card.userId === authorId ? (*/}
          <div className={s.iconBtns}>
            {/*<Button className={s.btn} onClick={() => setIsUpdateModal(true)}>*/}
            <Button className={s.btn} onClick={() => setOpen(true)}>
              <Edit2Outline className={s.Edit2Outline} />
            </Button>
            <Button className={s.btn} onClick={() => deleteCard({ id: item.id })}>
              <TrashOutline className={s.TrashOutline} />
            </Button>
          </div>
        </Table.Cell>
      </Table.Row>
    </Fragment>
  )
}
