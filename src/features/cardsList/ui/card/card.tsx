import { useState } from 'react'
import { toast } from 'react-toastify'

import Star from '@/assets/icons/svg/Star'
import StarOutline from '@/assets/icons/svg/StarOutline'
import defaultDeckImg from '@/assets/img/defaultDeckImg.jpg'
import { DeleteModal } from '@/common/components/deleteModal/deleteModal'
import { Table } from '@/common/components/table/table'
import Typography from '@/common/components/typography/typography'
import { FormatItemProps } from '@/common/types/common.types'
import { useMeQuery } from '@/features/auth/api/authApi'
import { useDeleteCardMutation, useUpdateCardMutation } from '@/features/cardsList/api/cardsApi'
import { CardWithGradeResponse } from '@/features/cardsList/model/cards.types'
import { AddOrUpdateModal } from '@/features/cardsList/ui/addUpdateCardModal/addUpdateCardModal'
import { CardBtns } from '@/features/cardsList/ui/btns/cardBtns'

import s from './card.module.scss'

import defaltDeckImg from '../../../../assets/img/defaultDeckImg.jpg'

type Props = {
  item: CardWithGradeResponse
}

export const Card = ({ item }: Props) => {
  const [deleteCard] = useDeleteCardMutation()
  const [updateCard] = useUpdateCardMutation()
  const { data } = useMeQuery()

  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const [isUpdateModal, setIsUpdateModal] = useState(false)
  const [answerImgPreview, setAnswerImgPreview] = useState(defaultDeckImg)
  const [questionImgPreview, setQuestionImgPreview] = useState(defaultDeckImg)
  const [selectedFormat, setSelectedFormat] = useState<FormatItemProps>('Text')

  const showUpdateHandler = () => {
    ;(item.answerImg || item.questionImg) && setSelectedFormat('Picture')

    setAnswerImgPreview(item.answerImg ? item.answerImg : defaultDeckImg)
    setQuestionImgPreview(item.questionImg ? item.questionImg : defaultDeckImg)

    setIsUpdateModal(true)
  }
  const deleteCardHandler = async () => {
    await deleteCard({ id: item.id })
  }
  const showDeleteHandler = () => {
    setIsDeleteModal(true)
  }

  return (
    <>
      <DeleteModal
        deleteFn={deleteCardHandler}
        open={isDeleteModal}
        setOpen={setIsDeleteModal}
        title={'Delete Card'}
      >
        <Typography variant={'subtitle1'}>
          Do you really want to remove this card? ${item.question}?
        </Typography>
      </DeleteModal>
      <AddOrUpdateModal
        answerImgPreview={answerImgPreview}
        confirmBtnName={'Save'}
        id={item.id}
        mutationCallBack={updateCard}
        open={isUpdateModal}
        questionImgPreview={questionImgPreview}
        selectedFormat={selectedFormat}
        setAnswerImgPreview={setAnswerImgPreview}
        setOpen={setIsUpdateModal}
        setQuestionImgPreview={setQuestionImgPreview}
        setSelectedFormat={setSelectedFormat}
        title={'Edit Card'}
      />
      <Table.Row className={s.container} key={item.id}>
        <Table.Cell className={s.headQuest}>
          <div className={s.question}>
            <img
              alt={'default card img'}
              className={s.defaltDeckImg}
              src={item.questionImg ?? defaltDeckImg}
            />
            <Typography as={'h3'} variant={'body2'}>
              {item.question}
            </Typography>
          </div>
        </Table.Cell>

        <Table.Cell className={s.headAns}>
          <div className={s.answer}>
            <img
              alt={'default answer img'}
              className={s.defaltDeckImg}
              src={item.answerImg ?? defaltDeckImg}
            />
            <Typography as={'h3'} variant={'body2'}>
              {item.answer}
            </Typography>
          </div>
        </Table.Cell>

        <Table.Cell>
          <div className={s.updated}>{new Date(item.updated).toLocaleDateString()}</div>
        </Table.Cell>

        <Table.Cell className={s.grade}>
          {[...Array(5)].map((_, index) =>
            index < item.grade ? (
              <Star className={s.star} key={index} />
            ) : (
              <StarOutline className={s.star} key={index} />
            )
          )}
        </Table.Cell>
        {data?.id === item.userId && (
          <Table.Cell>
            <CardBtns showDeleteModal={showDeleteHandler} showUpdateHandler={showUpdateHandler} />
          </Table.Cell>
        )}
      </Table.Row>
    </>
  )
}
