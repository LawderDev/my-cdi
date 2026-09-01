import type { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { IconButton } from '@ui/components/IconButton'
import { StudentAvatarPresenter } from '@student/presenters/StudentAvatarPresenter'
import type { StudentViewModel } from '@student/types'
import {
  ClassTag,
  IneCell,
  NameCellContent,
  NameText,
  RowActions,
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
          <NameText>{student.nom}</NameText>
        </NameCellContent>
      </td>
      <td>{student.prenom}</td>
      <td>
        <ClassTag>{student.classe}</ClassTag>
      </td>
      <IneCell>{student.ine}</IneCell>
      <VisitsCell>{VISITS_PLACEHOLDER}</VisitsCell>
      <td>
        <RowActions>
          <IconButton iconName="edit" aria-label={t('app.edit')} onClick={onEditClick} />
          <IconButton
            iconName="delete"
            tone="danger"
            aria-label={t('app.delete')}
            onClick={onDeleteClick}
          />
        </RowActions>
      </td>
    </tr>
  )
}
