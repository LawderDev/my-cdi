import { useTranslation } from 'react-i18next'
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

const TABLE_WRAPPER_CLASSES =
  'data-table w-full bg-card border border-border rounded overflow-hidden shadow-[var(--shadow)]'
const SORT_ICON_CLASSES = 'sort-icon text-sm align-middle ml-0.5'
const FOOTER_CLASSES =
  'table-footer flex items-center justify-between px-4 py-3 border-t border-border text-xs text-text-dim'
const CHECKBOX_CELL_WIDTH = 40
const ACTIONS_CELL_WIDTH = 80
const CHECKBOX_CELL_STYLE = { width: CHECKBOX_CELL_WIDTH } as const
const ACTIONS_CELL_STYLE = { width: ACTIONS_CELL_WIDTH } as const

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
    <div className={TABLE_WRAPPER_CLASSES}>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th style={CHECKBOX_CELL_STYLE} />
            {SORT_COLUMNS.map((field) => (
              <th key={field} onClick={() => handleSort(field)}>
                {t(`fields.${field}`)}
                <Icon name="unfold_more" className={SORT_ICON_CLASSES} />
              </th>
            ))}
            <th>
              {t('fields.visits')}
              <Icon name="unfold_more" className={SORT_ICON_CLASSES} />
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
      </table>
      <div className={FOOTER_CLASSES}>
        <span>{t('count', { count: students.length })}</span>
      </div>
    </div>
  )
}
