import { ComponentPropsWithRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './table.module.scss'

export type RootProps = ComponentPropsWithRef<'table'>

export const Root = forwardRef<HTMLTableElement, RootProps>(({ className = '', ...rest }, ref) => {
  const classNames = {
    table: clsx(s[className], s.table),
  }

  return <table className={classNames.table} ref={ref} {...rest} />
})

export type HeadProps = ComponentPropsWithRef<'thead'>

export const Head = forwardRef<HTMLTableSectionElement, HeadProps>(
  ({ className = '', ...props }: HeadProps, ref) => {
    const classNames = {
      thead: clsx(s[className], s.thead),
    }

    return <thead className={classNames.thead} {...props} ref={ref} />
  }
)
export type BodyProps = ComponentPropsWithRef<'tbody'>

export const Body = forwardRef<HTMLTableSectionElement, BodyProps>(
  ({ className = '', ...props }: BodyProps, ref) => {
    const classNames = {
      tbody: clsx(s[className], s.tbody),
    }

    return <tbody className={classNames.tbody} {...props} ref={ref} />
  }
)
export type RowProps = ComponentPropsWithRef<'tr'>

export const Row = forwardRef<HTMLTableRowElement, RowProps>(
  ({ className = '', ...props }: RowProps, ref) => {
    const classNames = {
      row: clsx(s[className], s.row),
    }

    return <tr className={classNames.row} {...props} ref={ref} />
  }
)
export type HeadCellProps = ComponentPropsWithRef<'th'>

export const HeadCell = forwardRef<HTMLTableCellElement, HeadCellProps>(
  ({ className = '', ...rest }: HeadCellProps, ref) => {
    const classNames = {
      headCell: clsx(s[className], s.headCell),
    }

    return <th className={classNames.headCell} {...rest} ref={ref} />
  }
)

export type CellProps = ComponentPropsWithRef<'td'>

export const Cell = forwardRef<HTMLTableCellElement, CellProps>(
  ({ className = '', ...rest }: CellProps, ref) => {
    const classNames = {
      cell: clsx(s[className], s.cell),
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
