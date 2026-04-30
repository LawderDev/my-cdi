import { TableCell, TableRow, Checkbox, IconButton } from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import type { MouseEvent } from 'react'
import type { StudentViewModel } from '@student/types'

interface StudentTableRowProps {
  student: StudentViewModel
  selected: boolean
  onToggleSelection: (id: number) => void
  onEdit: (student: StudentViewModel) => void
  onDelete: (id: number) => void
}

export function StudentTableRow({
  student,
  selected,
  onToggleSelection,
  onEdit,
  onDelete
}: StudentTableRowProps) {
  const handleRowClick = () => onToggleSelection(student.id)

  const handleCheckboxChange = () => onToggleSelection(student.id)

  const handleEditClick = (mouseEvent: MouseEvent<HTMLButtonElement>) => {
    mouseEvent.stopPropagation()
    onEdit(student)
  }

  const handleDeleteClick = (mouseEvent: MouseEvent<HTMLButtonElement>) => {
    mouseEvent.stopPropagation()
    onDelete(student.id)
  }

  return (
    <TableRow hover selected={selected} onClick={handleRowClick} sx={{ cursor: 'pointer' }}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={handleCheckboxChange} size="small" />
      </TableCell>
      <TableCell>{student.nom}</TableCell>
      <TableCell>{student.prenom}</TableCell>
      <TableCell>{student.classe}</TableCell>
      <TableCell>{student.ine}</TableCell>
      <TableCell align="right">
        <IconButton size="small" sx={{ mr: 1 }} onClick={handleEditClick}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" color="error" onClick={handleDeleteClick}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
