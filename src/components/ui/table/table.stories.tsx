import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import PlayCircleOutline from '@/assets/icons/svg/PlayCircleOutline'
import TrashOutline from '@/assets/icons/svg/TrashOutline'
import defaltDeckImg from '@/assets/img/defaultDeckImg.png'

import s from '@/components/ui/table/decks/decks.module.scss'

import { Table } from './table'

const meta = {
  component: Table,
  tags: ['autodocs'],
  title: 'Components/Table',
}

export default meta

export const Default = () => {
  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>
            <div>
              <span>Name</span>
            </div>
          </Table.HeadCell>
          <Table.HeadCell>
            <div>
              <span>Name</span>
            </div>
          </Table.HeadCell>
          <Table.HeadCell>
            <div>
              <span>Name</span>
            </div>
          </Table.HeadCell>
          <Table.HeadCell>
            <div>
              <span>Name</span>
            </div>
          </Table.HeadCell>
          <Table.HeadCell>
            <div>
              <span> </span>
            </div>
          </Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell className={s.empty} colSpan={100}>
            Empty
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  )
}
export const WithContent = () => {
  const items = [
    {
      cardsCount: 1,
      created: '02.05.2024',
      id: '1',
      name: 'Hello World',
      updated: '02.05.2024',
    },
  ]

  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>
            <div className={s.itemsBlock}>
              <span>Name {/*add sort icon*/}</span>
            </div>
          </Table.HeadCell>
          <Table.HeadCell>
            <div className={s.itemsBlock}>
              <span>Cards{/*add sort icon*/}</span>
            </div>
          </Table.HeadCell>
          <Table.HeadCell>
            <div className={s.itemsBlock}>
              <span>Last Updated {/*add sort icon*/}</span>
            </div>
          </Table.HeadCell>
          <Table.HeadCell>
            <div className={s.itemsBlock}>
              <span>Created By {/*add sort icon*/}</span>
            </div>
          </Table.HeadCell>
          <Table.HeadCell>
            <div className={s.itemsBlock}>
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
            <h3 className={s.empty}>Empty</h3>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  )
}
