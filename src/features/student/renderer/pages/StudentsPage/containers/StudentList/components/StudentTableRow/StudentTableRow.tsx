import type { ChangeEvent, MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { IconButton } from '@ui/components/IconButton'
import { StudentAvatar } from '@student/components/StudentAvatar'
import type { StudentViewModel } from '@student/types'

interface StudentTableRowProps {
  student: StudentViewModel
  selected: boolean
  onToggleSelection: (id: number) => void
  onEdit: (student: StudentViewModel) => void
  onDelete: (id: number) => void
}

const NAME_CELL_CLASSES = 'flex items-center gap-2.5'
const NAME_TEXT_CLASSES = 'td-name'
const INE_CELL_CLASSES = 'font-mono text-xs text-text-dim'
const VISITS_CELL_CLASSES = 'font-mono text-xs font-semibold text-text-dim'
const ACTIONS_WRAPPER_CLASSES = 'td-actions'
const CHECKBOX_STYLE = { accentColor: 'var(--accent)' } as const
const VISITS_PLACEHOLDER = '—'

export function StudentTableRow({
  student,
  selected,
  onToggleSelection,
  onEdit,
  onDelete
}: StudentTableRowProps) {
  const { t } = useTranslation('common')

  function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
    event.stopPropagation()
    onToggleSelection(student.id)
  }

  function handleCheckboxClick(event: MouseEvent<HTMLInputElement>) {
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
    <tr>
      <td>
        <input
          type="checkbox"
          checked={selected}
          onChange={handleCheckboxChange}
          onClick={handleCheckboxClick}
          style={CHECKBOX_STYLE}
        />
      </td>
      <td>
        <div className={NAME_CELL_CLASSES}>
          <StudentAvatar id={student.id} prenom={student.prenom} nom={student.nom} size="sm" />
          <span className={NAME_TEXT_CLASSES}>{student.nom}</span>
        </div>
      </td>
      <td>{student.prenom}</td>
      <td>
        <span className="td-class">{student.classe}</span>
      </td>
      <td className={INE_CELL_CLASSES}>{student.ine}</td>
      <td className={VISITS_CELL_CLASSES}>{VISITS_PLACEHOLDER}</td>
      <td>
        <div className={ACTIONS_WRAPPER_CLASSES}>
          <IconButton iconName="edit" aria-label={t('app.edit')} onClick={handleEditClick} />
          <IconButton
            iconName="delete"
            tone="danger"
            aria-label={t('app.delete')}
            onClick={handleDeleteClick}
          />
        </div>
      </td>
    </tr>
  )
}
