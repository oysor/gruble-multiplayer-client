import React, { FunctionComponent } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { useState } from 'react'
import { StyledTable, TableContainer } from './styles'

type PlayerStats = {
  player: string
  score: number
  correct: number
  common: number
  unique: number
  wrong: number
  missing: number
}

const columnHelper = createColumnHelper<PlayerStats>()

const columns = [
  columnHelper.accessor('player', {
    header: 'Player',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('score', {
    header: 'Score',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('correct', {
    header: 'Correct',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('common', {
    header: 'Common',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('unique', {
    header: 'Unique',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('wrong', {
    header: 'Wrong',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('missing', {
    header: 'Missing',
    cell: (info) => info.getValue(),
  }),
]

interface TableProps {
  playerStats: PlayerStats[]
}

export const Table: FunctionComponent<TableProps> = ({ playerStats }) => {
  const [data, setData] = useState<PlayerStats[]>(playerStats)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const winner = playerStats.reduce(function (prev, current) {
    return prev && prev.score > current.score ? prev : current
  })

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr
                key={row.id}
                className={row.original.player === winner.player ? 'font-bold' : ''}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </StyledTable>
    </TableContainer>
  )
}
