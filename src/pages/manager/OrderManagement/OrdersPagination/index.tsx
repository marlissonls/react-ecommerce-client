import { TablePagination } from '@mui/material'

interface OrdersPaginationProps {
  total: number
  page: number
  pageSize: number
  onPageChange: (page: number) => void
}

export default function OrdersPagination({
  total,
  page,
  pageSize,
  onPageChange,
}: OrdersPaginationProps) {
  return (
    <TablePagination
      component="div"
      count={total}
      page={page}
      onPageChange={(_, newPage) => onPageChange(newPage)}
      rowsPerPage={pageSize}
      rowsPerPageOptions={[pageSize]}
      labelRowsPerPage="Itens por página"
      labelDisplayedRows={({ from, to, count }) =>
        `${from}–${to} de ${count}`
      }
    />
  )
}
