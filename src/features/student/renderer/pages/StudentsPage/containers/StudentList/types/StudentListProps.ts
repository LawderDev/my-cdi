import type { StudentViewModel } from '@student/types'

export interface StudentListProps {
  onEditStudent: (student: StudentViewModel) => void
  onAddStudent: () => void
}
