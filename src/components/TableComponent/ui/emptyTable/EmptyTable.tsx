import { ReactNode } from 'react'

import { HeaderType } from '@/components/TableComponent/ui/TableComponent'
import { Table } from '@/components/ui/table'

type Props = {
  children: ReactNode
  header: HeaderType[]
}
const EmptyTable = (props: Props) => {
  const { children, header } = props

  return (
    <Table.Body>
      <Table.Row>
        <Table.Cell colSpan={header.length + 1}>{children}</Table.Cell>
      </Table.Row>
    </Table.Body>
  )
}

export default EmptyTable
