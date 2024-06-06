import { useContext, useState } from 'react'

import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import Star from '@/assets/icons/svg/Star'
import StarOutline from '@/assets/icons/svg/StarOutline'
import TrashOutline from '@/assets/icons/svg/TrashOutline'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { UserContext } from '@/components/ui/changeTheme/Context'
import { Table } from '@/components/ui/table'
import { useMeQuery } from '@/services/auth/auth.service'
import { CardResponse } from '@/services/cards/cards.types'
import clsx from 'clsx'

import s from './SingleRowCard.module.scss'

type Props = {
  item: CardResponse
  openDeleteModalHandler: (value: boolean) => void
  openEditModalHandler: (value: boolean) => void
  retrieveCardItem: (item: CardResponse) => void
}
export const SingleRowCard = ({
  item,
  openDeleteModalHandler,
  openEditModalHandler,
  retrieveCardItem,
}: Props) => {
  const { data: meData } = useMeQuery()
  const updatedAr = new Date(item.updated).toLocaleDateString('ru-RU')
  const [blur, setBlur] = useState(true)
  const context = useContext(UserContext)

  if (!context) {
    return
  }
  const onDeleteCardHandler = () => {
    retrieveCardItem(item)
    openDeleteModalHandler(true)
  }
  const onEditCardHandler = () => {
    retrieveCardItem(item)
    openEditModalHandler(true)
  }
  const onHandleBlur = () => {
    setBlur(!blur)
  }

  const onMouseDown = () => {
    setBlur(!blur) // При зажатии мыши устанавливаем эффект "блюра"
  }

  const onMouseUp = () => {
    setBlur(true) // При отпускании мыши снимаем эффект "блюра"
  }

  return (
    <Table.Row>
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
      <Table.Cell style={{ userSelect: 'none' }}>
        <div
          className={clsx(s.imgWrapper, context.blur && blur ? s.blur : s.unBlur)}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseUp}
          onMouseUp={onHandleBlur}
        >
          {item.answerImg && (
            <div className={s.wrapperCoverImg}>
              <img
                alt={'default card img'}
                className={context.blur && blur ? s.coverImg + ' ' + s.blur : s.coverImg}
                src={item.answerImg}
              />
            </div>
          )}
          <Typography>{item.answer}</Typography>
        </div>
      </Table.Cell>
      <Table.Cell>
        <Typography>{updatedAr}</Typography>
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
      <Table.Cell>
        {item.userId === meData?.id && (
          <div className={s.iconBtns}>
            <Button className={s.btn} onClick={onEditCardHandler}>
              <Edit2Outline className={s.Edit2Outline} />
            </Button>
            <Button className={s.btn} onClick={onDeleteCardHandler}>
              <TrashOutline className={s.TrashOutline} />
            </Button>
          </div>
        )}
      </Table.Cell>
    </Table.Row>
  )
}
