import type { JournalEntryViewModel } from '@frequentation/types'

export interface JournalPageState {
  selectedDate: string
  isAddDialogOpen: boolean
  editingEntry: JournalEntryViewModel | null
}
