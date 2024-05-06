import { MemoryRouter } from 'react-router-dom'

import { Decks } from '@/components/ui/table/decks/Decks'

import { Table } from './table'

const meta = {
  component: Table,
  tags: ['autodocs'],
  title: 'Components/Table',
}

export default meta

export const Default = () => {
  const headersName = ['Name', 'Cards', 'Last Updated', 'Created By']

  return (
    <MemoryRouter initialEntries={['/']}>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            {headersName.map(name => (
              <Table.HeadCell key={name}>
                <span>{name}</span>
              </Table.HeadCell>
            ))}
            <Table.HeadCell></Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan={100} style={{ textAlign: 'center' }}>
              Empty
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </MemoryRouter>
  )
}
export const WithContent = () => {
  return (
    <MemoryRouter>
      <Decks />
    </MemoryRouter>
  )
}
