import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import Star from '@/assets/icons/svg/Star'
import StarOutline from '@/assets/icons/svg/StarOutline'
import TrashOutline from '@/assets/icons/svg/TrashOutline'
import defaultCard from '@/assets/img/defaultCard.jpg'
import { useSingleRowCard } from '@/components/TableComponent/lib/hooks/useSingleRowCard'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { CardResponse } from '@/services/cards/cards.types'
import { clsx } from 'clsx'

import s from '@/components/TableComponent/ui/singleRowCard/SingleRowCard.module.scss'

type Props = {
  item: CardResponse
  openDeleteModalHandler: (value: boolean) => void
  openEditModalHandler: (value: boolean) => void
  retrieveCardItem: (item: CardResponse) => void
}

export const SingleRowCard = (props: Props) => {
  const { item, openDeleteModalHandler, openEditModalHandler, retrieveCardItem } = props
  const {
    app,
    blur,
    blurGlobal,
    fragmentWithBlur,
    meData,
    onDeleteCardHandler,
    onEditCardHandler,
    onHandleBlur,
    onMouseDown,
    onMouseUp,
  } = useSingleRowCard({ item, openDeleteModalHandler, openEditModalHandler, retrieveCardItem })

  if (!app) {
    return null
  }

  return (
    <Table.Row>
      <Table.Cell>
        <div className={s.imgWrapper}>
          <div className={s.wrapperCoverImg}>
            <img
              alt={'default card img'}
              className={clsx(
                s.coverImg,
                !item?.questionImg && s.wrapperCoverImg + ' ' + s.withImg
              )}
              src={item.questionImg ? item.questionImg : defaultCard}
            />
          </div>
          <Typography>{item.question}</Typography>
        </div>
      </Table.Cell>
      <Table.Cell className={s.sell}>
        <div
          className={clsx(blurGlobal && blur ? s.blur : s.unBlur)}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseUp}
          onMouseUp={onHandleBlur}
          onTouchEnd={onHandleBlur}
          onTouchStart={onHandleBlur}
        >
          <div className={s.imgWrapper}>
            <div className={s.wrapperCoverImg}>
              <img
                alt={'default card img'}
                className={clsx(s.coverImg, fragmentWithBlur)}
                src={item.answerImg ? item.answerImg : defaultCard}
              />
            </div>
            <Typography>{item.answer}</Typography>
          </div>
        </div>
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
      {item.userId === meData?.id && (
        <Table.Cell>
          <div className={s.iconBtns}>
            <Button className={s.btn} onClick={onEditCardHandler}>
              <Edit2Outline className={s.Edit2Outline} />
            </Button>
            <Button className={s.btn} onClick={onDeleteCardHandler}>
              <TrashOutline className={s.TrashOutline} />
            </Button>
          </div>
        </Table.Cell>
      )}
    </Table.Row>
  )
}
