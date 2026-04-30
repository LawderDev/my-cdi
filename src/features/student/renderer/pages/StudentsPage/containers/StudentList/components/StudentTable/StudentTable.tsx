import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { StudentTableRow } from '../StudentTableRow'
import { tableContainerStyles, headerCellStyles } from './StudentTable.styles'
import { buildNextSortConfig } from './helpers/buildNextSortConfig'
import { renderSortIndicator } from './helpers/renderSortIndicator'
import type { StudentViewModel, StudentSortConfig, StudentSortField } from '@student/types'

interface StudentTableProps {
  students: StudentViewModel[]
  selectedIds: number[]
  onToggleSelection: (id: number) => void
  onEdit: (student: StudentViewModel) => void
  onDelete: (id: number) => void
  sortConfig: StudentSortConfig
  onSort: (config: StudentSortConfig) => void
}

const SORT_COLUMNS: readonly StudentSortField[] = ['nom', 'prenom', 'classe', 'ine']

export function StudentTable({
  students,
  selectedIds,
  onToggleSelection,
  onEdit,
  onDelete,
  sortConfig,
  onSort
}: StudentTableProps) {
  const { t } = useTranslation('student')

  return (
    <TableContainer component={Paper} sx={tableContainerStyles}>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            {SORT_COLUMNS.map((field) => (
              <TableCell
                key={field}
                sx={headerCellStyles}
                onClick={() => onSort(buildNextSortConfig(sortConfig, field))}
              >
                {t(`fields.${field}`)}
                <span>{renderSortIndicator(sortConfig, field)}</span>
              </TableCell>
            ))}
            <TableCell align="right">{t('fields.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <StudentTableRow
              key={student.id}
              student={student}
              selected={selectedIds.includes(student.id)}
              onToggleSelection={onToggleSelection}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
