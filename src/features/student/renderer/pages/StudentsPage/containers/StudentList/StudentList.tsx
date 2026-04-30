import { useTranslation } from 'react-i18next'
import { useStudentListData } from './hooks/useStudentListData'
import { useStudentSelection } from './hooks/useStudentSelection'
import { useDeleteStudent } from '@student/api/useStudentMutations'
import { StudentTable } from './components/StudentTable'
import { StudentListToolbar } from './components/StudentListToolbar'
import { StudentBatchActions } from './containers/StudentBatchActions'
import type { StudentListProps } from './types/StudentListProps'

export function StudentList({ onEditStudent, onAddStudent }: StudentListProps) {
  const { t } = useTranslation('common')
  const { filteredStudents, searchTerm, setSearchTerm, sortConfig, setSortConfig, isLoading } =
    useStudentListData()

  const { selectedIds, selectedCount, toggle, selectAll, clearSelection } = useStudentSelection()
  const { mutate: deleteStudent } = useDeleteStudent()

  function handleSelectAll() {
    selectAll(filteredStudents.map((student) => student.id))
  }

  function handleDelete(id: number) {
    deleteStudent({ id })
  }

  if (isLoading) {
    return <div>{t('app.loading')}</div>
  }

  return (
    <div className="flex flex-col gap-3">
      <StudentListToolbar
        searchTerm={searchTerm}
        totalCount={filteredStudents.length}
        onSearchChange={setSearchTerm}
        onAddStudent={onAddStudent}
      />

      <StudentBatchActions
        selectedIds={selectedIds}
        selectedCount={selectedCount}
        totalCount={filteredStudents.length}
        onSelectAll={handleSelectAll}
        onClearSelection={clearSelection}
        onAfterDelete={clearSelection}
      />

      <StudentTable
        students={filteredStudents}
        selectedIds={selectedIds}
        onToggleSelection={toggle}
        onEdit={onEditStudent}
        onDelete={handleDelete}
        sortConfig={sortConfig}
        onSort={setSortConfig}
      />
    </div>
  )
}
