import { Pagination } from '@/common/components/pagination/ui/pagination'
import SelectUI from '@/common/components/select/select'
import Typography from '@/common/components/typography/typography'

import s from './paginationWithSelect.module.scss'

export type selectOptionsType = {
  text: string
  value: string
}

type Props = {
  currentPage: number
  disabled?: boolean
  itemsPerPage: number
  // placeholder?: string
  selectOptions: selectOptionsType[]
  setCurrentPage: (value: number) => void
  setItemsPerPage: (value: number) => void
  totalItems: number
}
export const PaginationWithSelect = ({
  currentPage,
  disabled,
  itemsPerPage,
  // placeholder,
  selectOptions,
  setCurrentPage,
  setItemsPerPage,
  totalItems,
}: Props) => {
  // const [currentPage, setCurrentPage] = useState<number>(1)
  // const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  // const placeholderText = placeholder || selectOptions[0].text
  const totalPages: number = Math.ceil(totalItems / itemsPerPage) // Is this comes from, server???
  // const {} = useGetDecksQuery({
  //   currentPage,
  //   itemsPerPage,
  // })
  // const totalPages: number | undefined = data?.pagination.totalPages // Is this comes from, server???
  const onValueChange = (count: string) => {
    setItemsPerPage(+count)
  }

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'start',
      }}
    >
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
      <Typography className={s.firstText}>Show </Typography>
      <SelectUI
        className={'select'}
        disabled={disabled}
        onValueChange={onValueChange}
        selectOptions={selectOptions}
        value={itemsPerPage.toString()}
      />
      <Typography className={s.lastText}>on page</Typography>
    </div>
  )
}
