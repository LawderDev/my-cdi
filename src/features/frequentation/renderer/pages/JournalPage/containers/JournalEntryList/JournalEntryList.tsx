import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import { Card } from '@ui/components/Card'
import { EmptyState } from '@ui/components/EmptyState'
import { useJournalEntries } from '@frequentation/api/useFrequentationQueries'
import { useActivityLabels } from '@frequentation/hooks/useActivityLabels'
import { toJournalEntryViewModel } from '@frequentation/helpers/journalEntryTransformers'
import { useDeleteFrequentation } from '@frequentation/api/useFrequentationMutations'
import { useJournalEntrySelection } from './hooks/useJournalEntrySelection'
import { useEntryPeriodFilter } from './hooks/useEntryPeriodFilter'
import { useSearchFilter } from './hooks/useSearchFilter'
import { filterEntriesByPeriod } from './helpers/filterEntriesByPeriod'
import { filterJournalEntriesBySearchTerm } from './helpers/filterJournalEntriesBySearchTerm'
import { JournalEntryToolbar } from './components/JournalEntryToolbar'
import { JournalEntryRow } from './components/JournalEntryRow'
import { JournalBatchActions } from './containers/JournalBatchActions'
import type { JournalEntryViewModel } from '@frequentation/types'

interface JournalEntryListProps {
  selectedDate: string
  onEditEntry: (entry: JournalEntryViewModel) => void
}

export function JournalEntryList({ selectedDate, onEditEntry }: JournalEntryListProps) {
  const { t } = useTranslation('frequentation')
  const { selectedIds, toggle, selectAll, clearSelection } = useJournalEntrySelection()
  const { period, setPeriod } = useEntryPeriodFilter()
  const { searchTerm, setSearchTerm } = useSearchFilter()
  const { data } = useJournalEntries({ startDate: selectedDate, endDate: selectedDate })
  const { mutate: deleteOne } = useDeleteFrequentation()
  const { getLabel } = useActivityLabels()

  const dtos = data ?? []
  const entries = dtos.map((dto) => toJournalEntryViewModel(dto, getLabel))
  const filteredByPeriod = filterEntriesByPeriod(entries, period)
  const filtered = filterJournalEntriesBySearchTerm(filteredByPeriod, searchTerm)

  function handleSelectAll() {
    selectAll(entries.map((entry) => entry.id))
  }

  function handleDelete(entry: JournalEntryViewModel) {
    deleteOne({ id: entry.id })
  }

  return (
    <Card
      padding="none"
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        overflow: 'hidden'
      }}
    >
      <JournalEntryToolbar
        entryCount={filtered.length}
        period={period}
        onPeriodChange={setPeriod}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <JournalBatchActions
        selectedIds={selectedIds}
        totalCount={entries.length}
        onSelectAll={handleSelectAll}
        onClearSelection={clearSelection}
        onAfterDelete={clearSelection}
        onAfterUpdate={clearSelection}
      />
      <Box sx={{ flex: 1, overflowY: 'auto', p: 1 }}>
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
      </Box>
    </Card>
  )
}
