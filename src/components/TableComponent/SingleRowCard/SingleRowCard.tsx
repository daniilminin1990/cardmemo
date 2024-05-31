import { Fragment, useState } from 'react'

import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import Star from '@/assets/icons/svg/Star'
import StarOutline from '@/assets/icons/svg/StarOutline'
import TrashOutline from '@/assets/icons/svg/TrashOutline'
import { DeleteModal } from '@/components/Modals/ModalDelete/DeleteModal'
import { ModalAddEditCard } from '@/components/Modals/ModalEditCard/ModalAddEditCard'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { useMeQuery } from '@/services/auth/auth.service'
import { useDeleteCardByIdMutation } from '@/services/cards/cards.service'
import { CardResponse } from '@/services/cards/cards.types'

import s from './SingleRowCard.module.scss'

type Props = {
  item: CardResponse
}
export const SingleRowCard = ({ item }: Props) => {
  const { data: meData } = useMeQuery()
  const [deleteCard] = useDeleteCardByIdMutation()

  const [open, setOpen] = useState(false)
  const updatedAr = new Date(item.updated).toLocaleDateString('ru-RU')
  const [isOpenModal, setIsOpenModal] = useState(false)

  const onOpenCardHandler = () => {
    setIsOpenModal(!isOpenModal)
  }
  const onDeleteDeckHandler = () => {
    deleteCard({ id: item.id })
  }

  return (
    <Fragment key={item.id}>
      <ModalAddEditCard item={item} open={open} setOpen={setOpen} />
      <DeleteModal
        deleteFn={onDeleteDeckHandler}
        open={isOpenModal}
        setOpen={setIsOpenModal}
        title={'Delete Card'}
      >
        <Typography variant={'h1'}>{item.question}</Typography>
        <Typography variant={'body1'}>
          Do you really want to delete card? Cards will be deleted !!!
        </Typography>
      </DeleteModal>
      <Table.Row key={item.id}>
        <Table.Cell>
          <Typography className={s.imgWrapper}>
            {item.questionImg && (
              <div className={s.wrapperCoverImg}>
                <img alt={'default card img'} className={s.coverImg} src={item.questionImg} />
              </div>
            )}
            {item.question}
          </Typography>
        </Table.Cell>
        <Table.Cell>
          <Typography className={s.imgWrapper}>
            {item.answerImg && (
              <div className={s.wrapperCoverImg}>
                <img alt={'default card img'} className={s.coverImg} src={item.answerImg} />
              </div>
            )}
            {item.answer}
          </Typography>
        </Table.Cell>
        <Table.Cell>{updatedAr}</Table.Cell>
        <Table.Cell className={s.grade}>
          {[...Array(5)].map((_, index) =>
            index < item.grade ? (
              <Star className={s.star} key={index} />
            ) : (
              <StarOutline className={s.star} key={index} />
            )
          )}
        </Table.Cell>
        <Table.Cell>
          {item.userId === meData?.id && (
            <div className={s.iconBtns}>
              <Button className={s.btn} onClick={() => setOpen(true)}>
                <Edit2Outline className={s.Edit2Outline} />
              </Button>
              <Button className={s.btn} onClick={onOpenCardHandler}>
                <TrashOutline className={s.TrashOutline} />
              </Button>
            </div>
          )}
        </Table.Cell>
      </Table.Row>
    </Fragment>
  )
}
