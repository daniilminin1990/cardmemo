import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import PlayCircleOutline from '@/assets/icons/svg/PlayCircleOutline'
import TrashOutline from '@/assets/icons/svg/TrashOutline'

import s from './decks.module.scss'

import defaltDeckImg from '../../../../assets/img/defaultDeckImg.png'
import { Table } from '../table'

type DecksProps = {
  cardsCount: number
  created: string
  id: string
  name: string
  updated: string
}

export const Decks = () => {
  const items: DecksProps[] = [
    {
      cardsCount: 1,
      created: 'BD',
      id: '1',
      name: 'Hello World',
      updated: '02.05.2024',
    },
    {
      cardsCount: 2,
      created: 'BD',
      id: '2',
      name: 'Hello World 1',
      updated: '02.05.2024',
    },
    {
      cardsCount: 3,
      created: 'BD',
      id: '3',
      name: 'Hello World 2',
      updated: '02.05.2024',
    },
  ]

  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>
            <div>
              <span>Name {/*add sort icon*/}</span>
            </div>
          </Table.HeadCell>
          <Table.HeadCell>
            <div>
              <span>Cards{/*add sort icon*/}</span>
            </div>
          </Table.HeadCell>
          <Table.HeadCell>
            <div>
              <span>Last Updated {/*add sort icon*/}</span>
            </div>
          </Table.HeadCell>
          <Table.HeadCell>
            <div>
              <span>Created By {/*add sort icon*/}</span>
            </div>
          </Table.HeadCell>
          <Table.HeadCell>
            <div>
              <span> {/*add sort icon*/}</span>
            </div>
          </Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {items.length !== 0 ? (
          items.map(item => (
            <Table.Row key={item.id}>
              <Table.Cell>
                <a className={s.nameBlock} href={'/'}>
                  <img alt={'default card img'} className={s.defaltDeckImg} src={defaltDeckImg} />
                  <h3>{item.name}</h3>
                </a>
              </Table.Cell>
              <Table.Cell>{item.cardsCount}</Table.Cell>
              <Table.Cell>{item.updated}</Table.Cell>
              <Table.Cell>{item.created}</Table.Cell>
              <Table.Cell>
                <div className={s.iconBtns}>
                  <button>
                    <PlayCircleOutline className={s.playCircleOutline} viewBox={'0 0 24 24'} />
                  </button>
                  <button>
                    <Edit2Outline className={s.Edit2Outline} viewBox={'0 0 24 24'} />
                  </button>
                  <button>
                    <TrashOutline className={s.TrashOutline} viewBox={'0 0 24 24'} />
                  </button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell colSpan={100}>Empty</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  )
}
