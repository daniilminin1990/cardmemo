import { Link } from 'react-router-dom'

import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import PlayCircleOutline from '@/assets/icons/svg/PlayCircleOutline'
import TrashOutline from '@/assets/icons/svg/TrashOutline'
import Typography from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import { path } from '@/router/path'
import { useMeQuery } from '@/services/auth/auth.service'
import { Deck } from '@/services/decks/deck.types'
import clsx from 'clsx'

import s from './SingleRowDeck.module.scss'

type Props = {
  item: Deck
  openDeleteModalHandler: (value: boolean) => void
  openEditModalHandler: (value: boolean) => void
  retrieveDeckItem: (item: Deck) => void
}
export const SingleRowDeck = ({
  item,
  openDeleteModalHandler,
  openEditModalHandler,
  retrieveDeckItem,
}: Props) => {
  const { data: meData } = useMeQuery()
  // const [isUpdateModal, setIsUpdateModal] = useState(false)
  // const [isDeleteModal, setIsDeleteModal] = useState(false)

  const updatedAr = new Date(item.updated).toLocaleDateString('ru-RU')
  // const [deleteDeck] = useDeleteDeckMutation()
  // const { deckId } = useParams()
  // const onDeleteDeckHandler = () => {
  //   deleteDeck({ id: item.id })
  //   setIsDeleteModal(true)
  //   if (deckId) {
  //     router.navigate(path.decks)
  //   }
  // }

  const onDeleteDeckHandler = () => {
    retrieveDeckItem(item)
    openDeleteModalHandler(true)
  }
  const onEditDeckHandler = () => {
    retrieveDeckItem(item)
    openEditModalHandler(true)
  }

  return (
    <Table.Row key={item.id}>
      <Table.Cell className={clsx(item?.cardsCount === 0 && s.disabledCell)}>
        <Typography as={Link} className={s.imgWrapper} to={`${path.decks}/${item.id}`}>
          {item.cover && (
            <div className={s.wrapperCoverImg}>
              <img alt={'default card img'} className={s.coverImg} src={item.cover} />
            </div>
          )}
          {item.name}
        </Typography>
      </Table.Cell>
      <Table.Cell>{item.cardsCount}</Table.Cell>
      <Table.Cell>{updatedAr}</Table.Cell>
      <Table.Cell>{item.author.name}</Table.Cell>
      <Table.Cell>
        {item.userId === meData?.id ? (
          <div className={s.iconBtns}>
            <Button className={s.btn} onClick={onEditDeckHandler}>
              <Edit2Outline className={s.Edit2Outline} />
            </Button>
            {item.cardsCount === 0 ? (
              <Button className={s.btn} disabled={item.cardsCount === 0}>
                <PlayCircleOutline className={`${s.playCircleOutline} ${s.disabled}`} />
              </Button>
            ) : (
              <Button as={'a'} className={s.btn} href={`${path.decks}/${item.id}${path.learn}`}>
                <PlayCircleOutline className={s.playCircleOutline} />
              </Button>
            )}

            <Button className={s.btn} onClick={onDeleteDeckHandler}>
              <TrashOutline className={s.TrashOutline} />
            </Button>
          </div>
        ) : (
          <div className={s.iconBtns}>
            {item.cardsCount === 0 ? (
              <Button className={s.btn} disabled={item.cardsCount === 0}>
                <PlayCircleOutline className={`${s.playCircleOutline} ${s.disabled}`} />
              </Button>
            ) : (
              <Button as={'a'} className={s.btn} href={`${path.decks}/${item.id}${path.learn}`}>
                <PlayCircleOutline className={s.playCircleOutline} />
              </Button>
            )}
          </div>
        )}
      </Table.Cell>
    </Table.Row>
  )
}
