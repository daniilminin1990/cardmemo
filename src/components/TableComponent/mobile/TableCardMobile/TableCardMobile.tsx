import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import Star from '@/assets/icons/svg/Star'
import StarOutline from '@/assets/icons/svg/StarOutline'
import TrashOutline from '@/assets/icons/svg/TrashOutline'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { useMeQuery } from '@/services/auth/auth.service'
import { CardResponse } from '@/services/cards/cards.types'

import s from './tableCardMobile.module.scss'

type Props = {
  item: CardResponse
  openDeleteModalHandler: (value: boolean) => void
  openEditModalHandler: (value: boolean) => void
  retrieveCardItem: (item: CardResponse) => void
}

export const TableCardMobile = ({
  item,
  openDeleteModalHandler,
  openEditModalHandler,
  retrieveCardItem,
}: Props) => {
  const { data: meData } = useMeQuery()

  const updatedAr = new Date(item.updated).toLocaleDateString('ru-RU')

  const onDeleteCardHandler = () => {
    retrieveCardItem(item)
    openDeleteModalHandler(true)
  }
  const onEditCardHandler = () => {
    retrieveCardItem(item)
    openEditModalHandler(true)
  }

  return (
    <div className={s.root}>
      <Table.Root>
        <Table.Body>
          <Table.Row>
            <Table.HeadCell scope={'row'}>Question</Table.HeadCell>
            <Table.Cell>
              <div className={s.imgWrapper}>
                {item.questionImg && (
                  <div className={s.wrapperCoverImg}>
                    <img alt={'default card img'} className={s.coverImg} src={item.questionImg} />
                  </div>
                )}
                <Typography>{item.question}</Typography>
              </div>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeadCell scope={'row'}>Answer</Table.HeadCell>
            <Table.Cell>
              <div className={s.imgWrapper}>
                {item.answerImg && (
                  <div className={s.wrapperCoverImg}>
                    <img alt={'default card img'} className={s.coverImg} src={item.answerImg} />
                  </div>
                )}
                <Typography>{item.answer}</Typography>
              </div>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeadCell scope={'row'}>Updated</Table.HeadCell>
            <Table.Cell>
              <Typography>{updatedAr}</Typography>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeadCell scope={'row'}>Grade</Table.HeadCell>
            <Table.Cell className={s.grade}>
              {[...Array(5)].map((_, index) =>
                index < item.grade ? (
                  <Star className={s.star} key={index} />
                ) : (
                  <StarOutline className={s.star} key={index} />
                )
              )}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>

      {item.userId === meData?.id && (
        <div className={s.iconBtns}>
          <Button className={s.btn} onClick={onEditCardHandler}>
            <Edit2Outline className={s.img} />
          </Button>
          <Button className={s.btn} onClick={onDeleteCardHandler}>
            <TrashOutline className={s.img} />
          </Button>
        </div>
      )}
    </div>
  )
}
