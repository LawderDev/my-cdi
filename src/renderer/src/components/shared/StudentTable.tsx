import * as React from 'react'
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Box,
  IconButton,
  Checkbox
} from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { useStudentsSelection } from '../../hooks/useStudentsSelection'
import type { StudentViewModel } from '../../types/view.models'
import type { FrequentationViewModel } from '../../types/view.models'
import { studentHelpers } from '../../lib/utils/student.helpers'
import { translateActivityToFrench } from '@shared/types/activities.enum'

interface StudentTableProps {
  data: StudentViewModel[] | FrequentationViewModel[]
  selectedIds: number[]
  onSelectionChange: (ids: number[]) => void
  isFrequentationTable?: boolean
  onEdit?: (item: StudentViewModel | FrequentationViewModel) => void
  onDelete?: (id: number) => void
}

export const StudentTable: React.FC<StudentTableProps> = ({
  data,
  selectedIds,
  onSelectionChange,
  onEdit,
  onDelete,
  isFrequentationTable
}) => {
  const { isSelected, handleRowClick } = useStudentsSelection({
    items: data,
    selectedIds,
    onSelectionChange
  })

  const handleEdit = (
    event: React.MouseEvent,
    item: StudentViewModel | FrequentationViewModel
  ): void => {
    event.stopPropagation()
    if (onEdit) {
      onEdit(item)
    }
  }

  const handleDelete = (
    event: React.MouseEvent,
    item: StudentViewModel | FrequentationViewModel
  ): void => {
    event.stopPropagation()
    if (onDelete) {
      if (isFrequentationTable) {
        // For frequentation tables, pass frequentation ID
        onDelete(item.id)
      } else if ('student' in item) {
        // For student tables with frequentation data, pass student ID
        onDelete(item.student.id)
      } else {
        // For plain student tables, pass item ID
        onDelete(item.id)
      }
    }
  }

  const getStudentData = (item: StudentViewModel | FrequentationViewModel): StudentViewModel => {
    return 'student' in item ? studentHelpers.toViewModel(item.student) : item
  }

  return (
    <Box>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table stickyHeader aria-labelledby="tableTitle" size="medium">
          <TableHead
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.04)' // Dark header background
            }}
          >
            <TableRow>
              <TableCell padding="checkbox" />
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Classe</TableCell>
              {isFrequentationTable && <TableCell>Activité</TableCell>}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => {
              const student = getStudentData(item)
              return (
                <TableRow
                  key={item.id}
                  hover
                  selected={isSelected(item.id)}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleRowClick(item.id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected(item.id)}
                      onChange={(event, checked) => {
                        event.stopPropagation()
                        if (checked !== undefined) {
                          handleRowClick(item.id)
                        }
                      }}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{student.nom}</TableCell>
                  <TableCell>{student.prenom}</TableCell>
                  <TableCell>{student.classe}</TableCell>
                  {isFrequentationTable && (
                    <TableCell>
                      {translateActivityToFrench((item as FrequentationViewModel).activity)}
                    </TableCell>
                  )}
                  <TableCell align="right">
                    <IconButton size="small" onClick={(e) => handleEdit(e, item)} sx={{ mr: 1 }}>
                      <EditIcon
                        fontSize="small"
                        sx={{ color: 'white' }} // White edit icon
                      />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={(e) => handleDelete(e, item)}>
                      <DeleteIcon
                        fontSize="small"
                        sx={{ color: 'white' }} // White delete icon
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
