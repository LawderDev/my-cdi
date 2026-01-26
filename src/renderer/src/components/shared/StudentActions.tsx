import React from 'react'
import { IconButton, Stack } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import type { Student } from '../../types/student'

interface StudentActionsProps {
  student: Student
  onEdit?: (student: Student) => void
  onDelete?: (id: number) => void
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
}

export const StudentActions: React.FC<StudentActionsProps> = ({
  student,
  onEdit,
  onDelete,
  disabled = false,
  size = 'small'
}) => {
  const handleEdit = (): void => {
    if (onEdit) {
      onEdit(student)
    }
  }

  const handleDelete = (): void => {
    if (onDelete) {
      onDelete(student.id)
    }
  }

  return (
    <Stack direction="row" spacing={1} justifyContent="flex-end">
      {onEdit && (
        <IconButton size={size} onClick={handleEdit} disabled={disabled} aria-label="modifier">
          <EditIcon fontSize={size} />
        </IconButton>
      )}
      {onDelete && (
        <IconButton
          size={size}
          color="error"
          onClick={handleDelete}
          disabled={disabled}
          aria-label="supprimer"
        >
          <DeleteIcon fontSize={size} />
        </IconButton>
      )}
    </Stack>
  )
}
