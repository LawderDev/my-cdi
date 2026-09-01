import type { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import { IconButton } from '@ui/components/IconButton'
import { StudentAvatarPresenter } from '@student/presenters/StudentAvatarPresenter'
import type { StudentViewModel } from '@student/types'
import {
  IneCell,
  NameCellContent,
  SelectCheckbox,
  VisitsCell
} from './StudentTableRowPresenter.styles'

export interface StudentTableRowPresenterProps {
  student: StudentViewModel
  initials: string
  selected: boolean
  onCheckboxChange: () => void
  onCheckboxClick: (event: MouseEvent<HTMLButtonElement>) => void
  onEditClick: (event: MouseEvent<HTMLButtonElement>) => void
  onDeleteClick: (event: MouseEvent<HTMLButtonElement>) => void
}

const VISITS_PLACEHOLDER = '—'

export function StudentTableRowPresenter({
  student,
  initials,
  selected,
  onCheckboxChange,
  onCheckboxClick,
  onEditClick,
  onDeleteClick
}: StudentTableRowPresenterProps) {
  const { t } = useTranslation('common')

  return (
    <tr data-selected={selected}>
      <td>
        <SelectCheckbox
          checked={selected}
          onChange={onCheckboxChange}
          onClick={onCheckboxClick}
          size="small"
          aria-label={t('app.select')}
        />
      </td>
      <td>
        <NameCellContent>
          <StudentAvatarPresenter id={student.id} initials={initials} size="sm" />
          <Box component="span" className="td-name">
            {student.nom}
          </Box>
        </NameCellContent>
      </td>
      <td>{student.prenom}</td>
      <td>
        <Box component="span" className="td-class">
          {student.classe}
        </Box>
      </td>
      <IneCell>{student.ine}</IneCell>
      <VisitsCell>{VISITS_PLACEHOLDER}</VisitsCell>
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
