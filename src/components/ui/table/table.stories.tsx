import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import Typography from '@/components/ui/Typography/Typography'
import { store } from '@/services/store'

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
            <Table.Cell>The place for rows...</Table.Cell>
          </Table.Row>
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
