import React from 'react'
import { TableCell, TableRow, Checkbox } from '@mui/material'
import { StudentActions } from './StudentActions'
import type { Student } from '../../types/student'

interface StudentRowProps {
  student: Student
  selectable?: boolean
  selected?: boolean
  onSelect?: () => void
  showActions?: boolean
  onEdit?: (student: Student) => void
  onDelete?: (id: number) => void
  disabled?: boolean
}

export const StudentRow: React.FC<StudentRowProps> = ({
  student,
  selectable = false,
  selected = false,
  onSelect,
  showActions = true,
  onEdit,
  onDelete,
  disabled = false
}) => {
  const handleRowClick = (): void => {
    if (onSelect && !disabled) {
      onSelect()
    }
  }

  return (
    <TableRow
      hover
      selected={selected}
      onClick={handleRowClick}
      sx={{ cursor: selectable && !disabled ? 'pointer' : 'default' }}
    >
      {selectable && (
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onChange={onSelect} disabled={disabled} />
        </TableCell>
      )}
      <TableCell>{student.nom}</TableCell>
      <TableCell>{student.prenom}</TableCell>
      <TableCell>{student.classe}</TableCell>
      <TableCell align="right">
        {showActions && (
          <StudentActions
            student={student}
            onEdit={onEdit}
            onDelete={onDelete}
            disabled={disabled}
          />
        )}
      </TableCell>
    </TableRow>
  )
}
