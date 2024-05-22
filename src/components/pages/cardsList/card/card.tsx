import { useState } from 'react'

import Star from '@/assets/icons/svg/Star'
import StarOutline from '@/assets/icons/svg/StarOutline'
import defaultDeckImg from '@/assets/img/defaultDeckImg.jpg'
import { CardBtns } from '@/components/pages/cardsList/btns/cardBtns'
import { CardWithGrade } from '@/components/pages/cardsList/cards.types'
import { AddOrUpdateModal } from '@/components/pages/cardsList/modal/common/addOrUpdateModal'
import { DeleteModal } from '@/components/pages/common/deleteModal/deleteModal'
import Typography from '@/components/ui/Typography/Typography'
import { Table } from '@/components/ui/table'
import { useMeQuery } from '@/services/auth/auth.services'
import { useDeleteCardMutation, useUpdateCardMutation } from '@/services/cards/cards.services'

import s from './card.module.scss'

import defaltDeckImg from '../../../../assets/img/defaultDeckImg.jpg'

type Props = {
  item: CardWithGrade
}

export const Card = ({ item }: Props) => {
  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const [isUpdateModal, setIsUpdateModal] = useState(false)
  const [answerImgPreview, setAnswerImgPreview] = useState(defaultDeckImg)
  const [questionImgPreview, setQuestionImgPreview] = useState(defaultDeckImg)
  const [selectedFormat, setSelectedFormat] = useState<'Picture' | 'Text'>('Text')

  const [deleteCard] = useDeleteCardMutation()
  const [updateCard] = useUpdateCardMutation()
  const { data } = useMeQuery()

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
        <Table.Cell>
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

        <Table.Cell>
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
