import { ComponentProps, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './table.module.scss'

export type RootProps = ComponentProps<'table'>

export const Root = forwardRef<HTMLTableElement, RootProps>(({ className, ...rest }, ref) => {
  const classNames = {
    table: clsx(className, s.table),
  }

  return <table className={classNames.table} ref={ref} {...rest} />
})

export type HeadProps = ComponentProps<'thead'>

export const Head = forwardRef<HTMLTableSectionElement, HeadProps>(
  ({ className, ...props }: HeadProps, ref) => {
    const classNames = {
      thead: clsx(className, s.thead),
    }

    return <thead className={classNames.thead} {...props} ref={ref} />
  }
)
export type BodyProps = ComponentProps<'tbody'>

export const Body = forwardRef<HTMLTableSectionElement, BodyProps>(
  ({ className, ...props }: BodyProps, ref) => {
    const classNames = {
      tbody: clsx(className, s.tbody),
    }

    return <tbody className={classNames.tbody} {...props} ref={ref} />
  }
)
export type RowProps = ComponentProps<'tr'>

export const Row = forwardRef<HTMLTableRowElement, RowProps>(({ className,...props }: RowProps, ref) => {
  const classNames = {
    row: clsx(className, s.row),
  }
  return <tr className={classNames.row} {...props} ref={ref} />
})
export type HeadCellProps = ComponentProps<'th'>

export const HeadCell = forwardRef<HTMLTableCellElement, HeadCellProps>(
  ({ className, ...rest }: HeadCellProps, ref) => {
    const classNames = {
      headCell: clsx(className, s.headCell),
    }

    return <th className={classNames.headCell} {...rest} ref={ref} />
  }
)

export type CellProps = ComponentProps<'td'>

export const Cell = forwardRef<HTMLTableCellElement, CellProps>(
  ({ className, ...rest }: CellProps, ref) => {
    const classNames = {
      cell: clsx(className, s.cell),
    }

    return <td className={classNames.cell} {...rest} ref={ref} />
  }
)
export const Table = {
  Body,
  Cell,
  Head,
  HeadCell,
  Root,
  Row,
}
