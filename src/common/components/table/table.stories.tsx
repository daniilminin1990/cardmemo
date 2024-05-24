import { MemoryRouter } from 'react-router-dom'

import ArrowIosUp from '@/assets/icons/svg/ArrowIosUp'
import Edit2Outline from '@/assets/icons/svg/Edit2Outline'
import PlayCircleOutline from '@/assets/icons/svg/PlayCircleOutline'
import Star from '@/assets/icons/svg/Star'
import StarOutline from '@/assets/icons/svg/StarOutline'
import TrashOutline from '@/assets/icons/svg/TrashOutline'
import defaltDeckImg from '@/assets/img/defaultDeckImg.jpg'
import { Button } from '@/common/components/button'
import Typography from '@/common/components/typography/typography'

import cardBtnsStyle from '../../../features/cardsList/ui/btns/cardBtns.module.scss'
import cardStyle from '../../../features/cardsList/ui/card/card.module.scss'
import btnsStyle from '../../../features/decksList/ui/btns/deckBtns.module.scss'
import deckStyle from '../../../features/decksList/ui/deck/deck.module.scss'
import s from './table.module.scss'

import { Table } from './table'

const meta = {
  component: Table,
  tags: ['autodocs'],
  title: 'Components/Table',
}

export default meta

export const DecksTable = () => {
  const data = [
    {
      author: { id: '1', name: 'BD' },
      cardsCount: 1,
      cover: null,
      created: '2024-05-15T15:06:06.425Z',
      id: '1',
      isPrivate: false,
      name: 'Hello World',
      updated: '2024-05-05T15:06:06.425Z',
      userId: '1',
    },

    {
      author: { id: '2', name: 'Other' },
      cardsCount: 0,
      cover: null,
      created: '2024-05-15T15:06:06.425Z',
      id: '2',
      isPrivate: false,
      name: 'Hello World',
      updated: '2024-05-15T15:06:06.425Z',
      userId: '1',
    },
  ]
  const headersName = [
    { key: 'name', title: 'Name' },
    { key: 'cardsCount', title: 'Cards' },
    { key: 'updated', title: 'Last Updated' },
    { key: 'created', title: 'Created by' },
  ]

  return (
    <MemoryRouter>
      <Table.Root className={s.root}>
        <Table.Head>
          <Table.Row>
            {headersName.map(name => (
              <Table.HeadCell key={name.key}>
                <Typography as={'span'} variant={'subtitle2'}>
                  {name.title}
                  <ArrowIosUp className={`${s.arrow} `} />
                </Typography>
              </Table.HeadCell>
            ))}
            <Table.HeadCell></Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data?.map(item => (
            <Table.Row key={item.name}>
              <Table.Cell>
                <Button as={'a'} className={deckStyle.nameBlock} href={'/'}>
                  <img
                    alt={'default card img'}
                    className={deckStyle.defaltDeckImg}
                    src={item.cover ?? defaltDeckImg}
                  />
                  <Typography as={'h3'} variant={'body2'}>
                    {item.name}
                  </Typography>
                </Button>
              </Table.Cell>
              <Table.Cell>{item.cardsCount}</Table.Cell>
              <Table.Cell>{new Date(item.updated).toLocaleDateString()}</Table.Cell>
              <Table.Cell className={deckStyle.authorCell}>{item.author.name}</Table.Cell>
              <Table.Cell>
                {item.userId === item.author.id ? (
                  <div className={btnsStyle.iconBtns}>
                    <Button className={btnsStyle.btn}>
                      <Edit2Outline className={btnsStyle.Edit2Outline} />
                    </Button>
                    <Button className={btnsStyle.btn}>
                      <PlayCircleOutline className={`${btnsStyle.playCircleOutline}`} />
                    </Button>
                    <Button className={btnsStyle.btn}>
                      <TrashOutline className={btnsStyle.TrashOutline} />
                    </Button>
                  </div>
                ) : (
                  <div className={btnsStyle.iconBtns}>
                    <Button className={btnsStyle.btn} disabled={item.cardsCount === 0}>
                      <PlayCircleOutline
                        className={`${btnsStyle.playCircleOutline} ${
                          item.cardsCount === 0 && s.disabled
                        }`}
                      />
                    </Button>
                  </div>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </MemoryRouter>
  )
}
export const CardsTable = () => {
  const data = [
    {
      answer: 'ввв',
      answerImg:
        'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/flashcards/Image/98795c6d-403f-4bfb-ac7d-a20d30da7c1b_user.png',
      answerVideo: null,
      created: '2024-03-18T12:17:12.850Z',
      deckId: 'cltsu3okg000sx22gmwec2kly',
      grade: 5,
      id: 'cltwwuqaa013mvq2gwnc93n7g',
      question: 'ghghkghk',
      questionImg: null,
      questionVideo: null,
      shots: 9,
      updated: '2024-05-11T17:14:21.696Z',
      userId: 'df6760fa-5ae1-46ef-916e-85f670d7b903',
    },

    {
      answer: 'ввв',
      answerImg:
        'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/flashcards/Image/98795c6d-403f-4bfb-ac7d-a20d30da7c1b_user.png',
      answerVideo: null,
      created: '2024-03-18T12:17:12.850Z',
      deckId: 'cltsu3okg000sx22gmwec2kly',
      grade: 5,
      id: 'cltwwuqaa013mvq2gwnc93n7g',
      question: 'ghghkghk',
      questionImg: null,
      questionVideo: null,
      shots: 9,
      updated: '2024-05-11T17:14:21.696Z',
      userId: 'df6760fa-5ae1-46ef-916e-85f670d7b903',
    },
  ]
  const headersName = [
    { key: 'question', title: 'Question' },
    { key: 'answer', title: 'Answer' },
    { key: 'updated', title: 'Last Updated' },
    { key: 'grade', title: 'Grade' },
  ]

  return (
    <MemoryRouter>
      <Table.Root className={s.root}>
        <Table.Head>
          <Table.Row>
            {headersName.map(name => (
              <Table.HeadCell key={name.key}>
                <Typography as={'span'} variant={'subtitle2'}>
                  {name.title}
                  <ArrowIosUp className={`${s.arrow} `} />
                </Typography>
              </Table.HeadCell>
            ))}
            <Table.HeadCell></Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data?.map(item => (
            <Table.Row className={cardStyle.container} key={item.id}>
              <Table.Cell>
                <div className={cardStyle.question}>
                  <img
                    alt={'default card img'}
                    className={cardStyle.defaltDeckImg}
                    src={item.questionImg ?? defaltDeckImg}
                  />
                  <Typography as={'h3'} variant={'body2'}>
                    {item.question}
                  </Typography>
                </div>
              </Table.Cell>

              <Table.Cell>
                <div className={cardStyle.answer}>
                  <img
                    alt={'default answer img'}
                    className={cardStyle.defaltDeckImg}
                    src={item.answerImg ?? defaltDeckImg}
                  />
                  <Typography as={'h3'} variant={'body2'}>
                    {item.answer}
                  </Typography>
                </div>
              </Table.Cell>

              <Table.Cell>
                <div className={cardStyle.updated}>
                  {new Date(item.updated).toLocaleDateString()}
                </div>
              </Table.Cell>

              <Table.Cell className={cardStyle.grade}>
                {[...Array(5)].map((_, index) =>
                  index < item.grade ? (
                    <Star className={cardStyle.star} key={index} />
                  ) : (
                    <StarOutline className={cardStyle.star} key={index} />
                  )
                )}
              </Table.Cell>
              <Table.Cell>
                <div className={cardBtnsStyle.iconBtns}>
                  <Button className={cardBtnsStyle.btn}>
                    <Edit2Outline className={cardBtnsStyle.Edit2Outline} />
                  </Button>
                  <Button className={cardBtnsStyle.btn}>
                    <TrashOutline className={cardBtnsStyle.TrashOutline} />
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </MemoryRouter>
  )
}
export const WithoutContent = () => {
  return (
    <Typography as={'div'} className={s.empty} variant={'body1'}>
      No content with these terms...
    </Typography>
  )
}

export const DefaultTable = () => {
  const headersName = [
    { key: 'name', title: 'Name' },
    { key: 'cardsCount', title: 'Cards' },
    { key: 'updated', title: 'Last Updated' },
    { key: 'created', title: 'Created by' },
  ]

  return (
    <MemoryRouter initialEntries={['/']}>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            {headersName.map(name => (
              <Table.HeadCell key={name.key}>
                <Typography as={'span'} variant={'subtitle2'}>
                  {name.title}
                </Typography>
              </Table.HeadCell>
            ))}
            <Table.HeadCell></Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell className={`empty`} colSpan={100}>
              No content with these terms...
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </MemoryRouter>
  )
}
