import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import Typography from '@/components/ui/Typography/Typography'
import { Card } from '@/components/ui/card'
import { Decks } from '@/components/ui/table/decks/Decks'
import { Deck } from '@/components/ui/table/decks/deck/Deck'
import { store } from '@/services/Store'

import s from './table.module.scss'

import { Table } from './table'
const withReduxProvider = (story: () => React.ReactNode) => (
  <Provider store={store}>{story()}</Provider>
)
const meta = {
  component: Table,
  decorators: [withReduxProvider],
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
      cardsCount: 3,
      cover: null,
      created: '2024-05-15T15:06:06.425Z',
      id: '2',
      isPrivate: false,
      name: 'Hello World',
      updated: '2024-05-12T15:06:06.425Z',
      userId: '1',
    },
    {
      author: { id: '3', name: 'Other' },
      cardsCount: 0,
      cover: null,
      created: '2024-05-15T15:06:06.425Z',
      id: '3',
      isPrivate: false,
      name: 'Hello World',
      updated: '2024-05-15T15:06:06.425Z',
      userId: '1',
    },
    {
      author: { id: '1', name: 'BD' },
      cardsCount: 0,
      cover: null,
      created: '2024-05-15T15:06:06.425Z',
      id: '1',
      isPrivate: false,
      name: 'Hello World',
      updated: '2024-05-15T15:06:06.425Z',
      userId: '1',
    },
  ]

  return (
    <MemoryRouter>
      <Decks
        Component={Deck}
        data={data}
        headersName={[
          { key: 'name', title: 'Name' },
          { key: 'cardsCount', title: 'Cards' },
          { key: 'updated', title: 'Last Updated' },
          { key: 'created', title: 'Created by' },
        ]}
        sortedColumn={'updated'}
      />
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

  return (
    <MemoryRouter>
      <Decks
        Component={Card}
        data={data}
        headersName={[
          { key: 'question', title: 'Question' },
          { key: 'answer', title: 'Answer' },
          { key: 'updated', title: 'Last Updated' },
          { key: 'grade', title: 'Grade' },
        ]}
        sortedColumn={'updated'}
      />
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
