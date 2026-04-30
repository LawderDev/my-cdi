import { useJournalEntries } from '@frequentation/api/useFrequentationQueries'
import { useActivityLabels } from '@frequentation/hooks/useActivityLabels'
import { toJournalEntryViewModel } from '@frequentation/helpers/journalEntryTransformers'
import { useDeleteFrequentation } from '@frequentation/api/useFrequentationMutations'
import { useJournalEntrySelection } from './hooks/useJournalEntrySelection'
import { JournalEntryToolbar } from './components/JournalEntryToolbar'
import { JournalEntryTable } from './components/JournalEntryTable'
import { JournalBatchActions } from './containers/JournalBatchActions'
import type { JournalEntryViewModel } from '@frequentation/types'

interface JournalEntryListProps {
  selectedDate: string
  onAddClick: () => void
  onEditEntry: (entry: JournalEntryViewModel) => void
}

export function JournalEntryList({ selectedDate, onAddClick, onEditEntry }: JournalEntryListProps) {
  const { getLabel } = useActivityLabels()
  const { data } = useJournalEntries({ startDate: selectedDate, endDate: selectedDate })
  const { selectedIds, toggle, selectAll, clearSelection } = useJournalEntrySelection()
  const { mutate: deleteOne } = useDeleteFrequentation()

  const dtos = data ?? []
  const entries = dtos.map((dto) => toJournalEntryViewModel(dto, getLabel))

  function handleDeleteOne(entry: JournalEntryViewModel) {
    deleteOne({ id: entry.id })
  }

  function handleSelectAll() {
    selectAll(entries.map((entry) => entry.id))
  }

  return (
    <>
      <JournalEntryToolbar entryCount={entries.length} onAddClick={onAddClick} />
      <JournalBatchActions
        selectedIds={selectedIds}
        totalCount={entries.length}
        onSelectAll={handleSelectAll}
        onClearSelection={clearSelection}
        onAfterDelete={clearSelection}
        onAfterUpdate={clearSelection}
      />
      <JournalEntryTable
        entries={entries}
        selectedIds={selectedIds}
        onToggleSelection={toggle}
        onEdit={onEditEntry}
        onDelete={handleDeleteOne}
      />
    </>
  )
}
