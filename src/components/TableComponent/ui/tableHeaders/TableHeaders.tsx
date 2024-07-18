import { useTranslation } from 'react-i18next'

import { ArrowIosDownOutline } from '@/assets/icons/svg'
import { HeaderType, TableVariantType } from '@/components/TableComponent/ui/TableComponent'
import BlurSwitcher from '@/components/TableComponent/ui/blurSwitcher/BlurSwitcher'
import Typography from '@/components/ui/Typography/Typography'
import { Table } from '@/components/ui/table'
import clsx from 'clsx'

import s from '@/components/TableComponent/ui/TableComponent.module.scss'

type Props = {
  blur: boolean
  currentOrderBy: string
  onClickEyeHandler: (e: MouseEvent) => void
  setSortByQuery: (key: string) => void
  tableHeader: HeaderType[]
  tableVariant: TableVariantType
}

export const TableHeaders = (props: Props) => {
  const { blur, currentOrderBy, onClickEyeHandler, setSortByQuery, tableHeader, tableVariant } =
    props
  const { t } = useTranslation()

  return (
    <>
      {tableHeader.map(name => (
        <Table.HeadCell
          className={clsx(
            tableVariant === 'decks' && s.tableHeadCellDecks,
            tableVariant === 'cards' && s.tableHeadCellCards
          )}
          key={name.key}
          onClick={() => setSortByQuery(name.key)}
        >
          <div className={s.answer}>
            <Typography as={'button'} className={s.nameSortBtn} variant={'subtitle2'}>
              {t(`${name.locale}`)}
              {(currentOrderBy === `${name.key}-asc` || currentOrderBy === `${name.key}-desc`) && (
                <ArrowIosDownOutline
                  className={`${s.arrow} ${currentOrderBy.includes('asc') ? s.rotate : ''}`}
                />
              )}
            </Typography>
            {name.title === 'Answer' && (
              <BlurSwitcher blur={blur} onClickEyeHandler={onClickEyeHandler} />
            )}
          </div>
        </Table.HeadCell>
      ))}
    </>
  )
}
