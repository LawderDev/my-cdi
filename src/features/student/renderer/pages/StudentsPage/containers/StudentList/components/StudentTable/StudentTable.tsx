import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import { Icon } from '@ui/components/Icon'
import { StudentTableRow, type StudentTableRowProps } from '../StudentTableRow'
import type { StudentSortField } from '@student/types'
import {
  FOOTER_FONT_SIZE_PX,
  CHECKBOX_CELL_STYLE,
  ACTIONS_CELL_STYLE,
  SORT_ICON_STYLE
} from './StudentTable.styles'

export interface StudentSortHeader {
  field: StudentSortField
  onClick: () => void
}

export interface StudentTableProps {
  rows: StudentTableRowProps[]
  sortHeaders: StudentSortHeader[]
}

export function StudentTable({ rows, sortHeaders }: StudentTableProps) {
  const { t } = useTranslation('student')

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
            {sortHeaders.map((header) => (
              <th key={header.field} onClick={header.onClick}>
                {t(`fields.${header.field}`)}
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
          {rows.map((row) => (
            <StudentTableRow key={row.student.id} {...row} />
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
        <Box component="span">{t('count', { count: rows.length })}</Box>
      </Box>
    </Box>
  )
}
