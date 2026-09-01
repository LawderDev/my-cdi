import type { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import { IconButton } from '@ui/components/IconButton'
import { MONO_FONT_FAMILY } from '@ui/theme'
import { StudentAvatar } from '@student/components/StudentAvatar'
import type { StudentViewModel } from '@student/types'
import { NUMERIC_FONT_SIZE_PX, NUMERIC_FONT_WEIGHT } from './StudentTableRow.styles'

export interface StudentTableRowProps {
  student: StudentViewModel
  selected: boolean
  onCheckboxChange: () => void
  onCheckboxClick: (event: MouseEvent<HTMLButtonElement>) => void
  onEditClick: (event: MouseEvent<HTMLButtonElement>) => void
  onDeleteClick: (event: MouseEvent<HTMLButtonElement>) => void
}

const VISITS_PLACEHOLDER = '—'

export function StudentTableRow({
  student,
  selected,
  onCheckboxChange,
  onCheckboxClick,
  onEditClick,
  onDeleteClick
}: StudentTableRowProps) {
  const { t } = useTranslation('common')

  return (
    <tr data-selected={selected}>
      <td>
        <Checkbox
          checked={selected}
          onChange={onCheckboxChange}
          onClick={onCheckboxClick}
          size="small"
          aria-label={t('app.select')}
          sx={{
            color: 'var(--border-light)',
            p: 0.5,
            '&.Mui-checked': { color: 'var(--accent)' }
          }}
        />
      </td>
      <td>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <StudentAvatar id={student.id} prenom={student.prenom} nom={student.nom} size="sm" />
          <Box component="span" className="td-name">
            {student.nom}
          </Box>
        </Box>
      </td>
      <td>{student.prenom}</td>
      <td>
        <Box component="span" className="td-class">
          {student.classe}
        </Box>
      </td>
      <Box
        component="td"
        sx={{
          fontFamily: MONO_FONT_FAMILY,
          fontSize: `${NUMERIC_FONT_SIZE_PX}px`,
          color: 'var(--text-dim)'
        }}
      >
        {student.ine}
      </Box>
      <Box
        component="td"
        sx={{
          fontFamily: MONO_FONT_FAMILY,
          fontSize: `${NUMERIC_FONT_SIZE_PX}px`,
          fontWeight: NUMERIC_FONT_WEIGHT,
          color: 'var(--text-dim)'
        }}
      >
        {VISITS_PLACEHOLDER}
      </Box>
      <td>
        <Box className="td-actions">
          <IconButton iconName="edit" aria-label={t('app.edit')} onClick={onEditClick} />
          <IconButton
            iconName="delete"
            tone="danger"
            aria-label={t('app.delete')}
            onClick={onDeleteClick}
          />
        </Box>
      </td>
    </tr>
  )
}
