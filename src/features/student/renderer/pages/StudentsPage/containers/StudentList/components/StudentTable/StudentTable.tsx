import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import { Icon } from '@ui/components/Icon'
import { StudentTableRow } from '../StudentTableRow'
import { buildNextSortConfig } from './helpers/buildNextSortConfig'
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

const SORT_ICON_FONT_SIZE_PX = 13
const FOOTER_FONT_SIZE_PX = 12
const CHECKBOX_CELL_WIDTH_PX = 40
const ACTIONS_CELL_WIDTH_PX = 80
const CHECKBOX_CELL_STYLE = { width: CHECKBOX_CELL_WIDTH_PX } as const
const ACTIONS_CELL_STYLE = { width: ACTIONS_CELL_WIDTH_PX } as const
const SORT_ICON_STYLE = { fontSize: `${SORT_ICON_FONT_SIZE_PX}px`, marginLeft: '2px' } as const

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

  function handleSort(field: StudentSortField) {
    onSort(buildNextSortConfig(sortConfig, field))
  }

  return (
    <Box
      className="data-table"
      sx={{
        width: '100%',
        bgcolor: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow)'
      }}
    >
      <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={CHECKBOX_CELL_STYLE} />
            {SORT_COLUMNS.map((field) => (
              <th key={field} onClick={() => handleSort(field)}>
                {t(`fields.${field}`)}
                <Icon name="unfold_more" style={SORT_ICON_STYLE} />
              </th>
            ))}
            <th>
              {t('fields.visits')}
              <Icon name="unfold_more" style={SORT_ICON_STYLE} />
            </th>
            <th style={ACTIONS_CELL_STYLE}>{t('fields.actions')}</th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1.5,
          borderTop: '1px solid var(--border)',
          fontSize: `${FOOTER_FONT_SIZE_PX}px`,
          color: 'var(--text-dim)'
        }}
      >
        <Box component="span">{t('count', { count: students.length })}</Box>
      </Box>
    </Box>
  )
}
