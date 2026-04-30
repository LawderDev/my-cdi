import type { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import { IconButton } from '@ui/components/IconButton'
import { MONO_FONT_FAMILY } from '@ui/theme'
import { StudentAvatar } from '@student/components/StudentAvatar'
import type { StudentViewModel } from '@student/types'

interface StudentTableRowProps {
  student: StudentViewModel
  selected: boolean
  onToggleSelection: (id: number) => void
  onEdit: (student: StudentViewModel) => void
  onDelete: (id: number) => void
}

const NUMERIC_FONT_SIZE_PX = 12
const NUMERIC_FONT_WEIGHT = 600
const VISITS_PLACEHOLDER = '—'

export function StudentTableRow({
  student,
  selected,
  onToggleSelection,
  onEdit,
  onDelete
}: StudentTableRowProps) {
  const { t } = useTranslation('common')

  function handleCheckboxChange() {
    onToggleSelection(student.id)
  }

  function handleCheckboxClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
  }

  function handleEditClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    onEdit(student)
  }

  function handleDeleteClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    onDelete(student.id)
  }

  return (
    <tr data-selected={selected}>
      <td>
        <Checkbox
          checked={selected}
          onChange={handleCheckboxChange}
          onClick={handleCheckboxClick}
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
          <IconButton iconName="edit" aria-label={t('app.edit')} onClick={handleEditClick} />
          <IconButton
            iconName="delete"
            tone="danger"
            aria-label={t('app.delete')}
            onClick={handleDeleteClick}
          />
        </Box>
      </td>
    </tr>
  )
}
