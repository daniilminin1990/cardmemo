import { MemoryRouter } from 'react-router-dom'

import Typography from '@/components/ui/Typography/Typography'
import { Decks } from '@/components/ui/table/decks/Decks'

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
    <Typography as={'div'} className={s.empty} variant={'body1'}>
      No content with these terms...
    </Typography>

    /** displaying an empty table**/
    // const headersName = ['Name', 'Cards', 'Last Updated', 'Created By']

    // <MemoryRouter initialEntries={['/']}>
    //   <Table.Root>
    //     <Table.Head>
    //       <Table.Row>
    //         {headersName.map(name => (
    //           <Table.HeadCell key={name}>
    //             <span>{name}</span>
    //           </Table.HeadCell>
    //         ))}
    //         <Table.HeadCell></Table.HeadCell>
    //       </Table.Row>
    //     </Table.Head>
    //     <Table.Body>
    //       <Table.Row>
    //         <Table.Cell className={`empty`} colSpan={100}>
    //           No content with these terms...
    //         </Table.Cell>
    //       </Table.Row>
    //     </Table.Body>
    //   </Table.Root>
    // </MemoryRouter>
  )
}
export const WithContent = () => {
  return (
    <MemoryRouter>
      <Decks />
    </MemoryRouter>
  )
}
