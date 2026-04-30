import { useTranslation } from 'react-i18next'
import { Card } from '@ui/components/Card'
import { EmptyState } from '@ui/components/EmptyState'
import { useJournalEntries } from '@frequentation/api/useFrequentationQueries'
import { useActivityLabels } from '@frequentation/hooks/useActivityLabels'
import { toJournalEntryViewModel } from '@frequentation/helpers/journalEntryTransformers'
import { useDeleteFrequentation } from '@frequentation/api/useFrequentationMutations'
import { useJournalEntrySelection } from './hooks/useJournalEntrySelection'
import { useEntryPeriodFilter } from './hooks/useEntryPeriodFilter'
import { filterEntriesByPeriod } from './helpers/filterEntriesByPeriod'
import { JournalEntryToolbar } from './components/JournalEntryToolbar'
import { JournalEntryRow } from './components/JournalEntryRow'
import { JournalBatchActions } from './containers/JournalBatchActions'
import type { JournalEntryViewModel } from '@frequentation/types'

interface JournalEntryListProps {
  selectedDate: string
  onEditEntry: (entry: JournalEntryViewModel) => void
}

const CARD_CLASSES = 'attendance-card flex-1 flex flex-col min-h-0 overflow-hidden'
const LIST_CLASSES = 'attendance-list flex-1 overflow-y-auto p-2'

export function JournalEntryList({ selectedDate, onEditEntry }: JournalEntryListProps) {
  const { t } = useTranslation('frequentation')
  const { selectedIds, toggle, selectAll, clearSelection } = useJournalEntrySelection()
  const { period, setPeriod } = useEntryPeriodFilter()
  const { data } = useJournalEntries({ startDate: selectedDate, endDate: selectedDate })
  const { mutate: deleteOne } = useDeleteFrequentation()
  const { getLabel } = useActivityLabels()

  const dtos = data ?? []
  const entries = dtos.map((dto) => toJournalEntryViewModel(dto, getLabel))
  const filtered = filterEntriesByPeriod(entries, period)

  function handleSelectAll() {
    selectAll(entries.map((entry) => entry.id))
  }

  function handleDelete(entry: JournalEntryViewModel) {
    deleteOne({ id: entry.id })
  }

  return (
    <Card padding="none" className={CARD_CLASSES}>
      <JournalEntryToolbar
        entryCount={filtered.length}
        period={period}
        onPeriodChange={setPeriod}
      />
      <JournalBatchActions
        selectedIds={selectedIds}
        totalCount={entries.length}
        onSelectAll={handleSelectAll}
        onClearSelection={clearSelection}
        onAfterDelete={clearSelection}
        onAfterUpdate={clearSelection}
      />
      <div className={LIST_CLASSES}>
        {filtered.length === 0 ? (
          <EmptyState
            iconName="event_available"
            message={t('noEntries')}
            description={t('emptyHint')}
          />
        ) : (
          filtered.map((entry) => (
            <JournalEntryRow
              key={entry.id}
              entry={entry}
              selected={selectedIds.includes(entry.id)}
              onToggleSelect={() => toggle(entry.id)}
              onEdit={() => onEditEntry(entry)}
              onDelete={() => handleDelete(entry)}
            />
          ))
        )}
      </div>
    </Card>
  )
}
