import type { StudentViewModel } from '@student/types'

export interface StudentsPageState {
  isAddDialogOpen: boolean
  editingStudent: StudentViewModel | null
  isCsvImportOpen: boolean
}
