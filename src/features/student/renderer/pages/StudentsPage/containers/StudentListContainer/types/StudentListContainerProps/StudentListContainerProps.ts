import type { StudentViewModel } from '@student/types'

export interface StudentListContainerProps {
  onEditStudent: (student: StudentViewModel) => void
  onAddStudent: () => void
}
