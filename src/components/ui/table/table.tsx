import { ComponentProps } from 'react'

import { clsx } from 'clsx'

import s from './table.module.scss'

export type RootProps = ComponentProps<'table'>

export const Root = ({ className, ...rest }: RootProps) => {
  const classNames = {
    table: clsx(className, s.table),
  }

  return <table className={classNames.table} {...rest} />
}

export type HeadProps = ComponentProps<'thead'>

export const Head = ({ className, ...props }: HeadProps) => {
  const classNames = {
    thead: clsx(className, s.thead),
  }

  return <thead className={classNames.thead} {...props} />
}

export type BodyProps = ComponentProps<'tbody'>

export const Body = ({ className, ...props }: BodyProps) => {
  const classNames = {
    tbody: clsx(className, s.tbody),
  }

  return <tbody className={classNames.tbody} {...props} />
}

export type RowProps = ComponentProps<'tr'>

export const Row = ({ ...props }: RowProps) => {
  return <tr {...props} />
}

export type HeadCellProps = ComponentProps<'th'>

export const HeadCell = ({ className, ...rest }: HeadCellProps) => {
  const classNames = {
    headCell: clsx(className, s.headCell),
  }

  return <th className={classNames.headCell} {...rest} />
}

export type CellProps = ComponentProps<'td'>

export const Cell = ({ className, ...rest }: CellProps) => {
  const classNames = {
    cell: clsx(className, s.tableCell),
  }

  return <td className={classNames.cell} {...rest} />
}

export const Table = {
  Body,
  Cell,
  Head,
  HeadCell,
  Root,
  Row,
}
