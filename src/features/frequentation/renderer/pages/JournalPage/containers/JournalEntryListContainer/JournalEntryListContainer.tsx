import { useState } from 'react'
import type { ChangeEvent, MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import dayjs from 'dayjs'
import { EmptyState } from '@ui/components/EmptyState'
import { Loader } from '@ui/components/Loader'
import { Toast } from '@ui/components/Toast'
import { ConfirmDialog } from '@ui/components/ConfirmDialog'
import { useToast } from '@ui/hooks/useToast'
import { useJournalEntries } from '@frequentation/api/useFrequentationQueries'
import { useActivityLabels } from '@frequentation/hooks/useActivityLabels'
import { toJournalEntryViewModel } from '@frequentation/helpers/journalEntryTransformers'
import { getActivityTone } from '@frequentation/helpers/activityFormatters'
import { buildInitials } from '@frequentation/helpers/buildInitials'
import { useDeleteFrequentation } from '@frequentation/api/useFrequentationMutations'
import { useJournalEntrySelection } from './hooks/useJournalEntrySelection'
import { useEntryPeriodFilter } from './hooks/useEntryPeriodFilter'
import { useSearchFilter } from './hooks/useSearchFilter'
import { filterEntriesByPeriod } from './helpers/filterEntriesByPeriod'
import { filterJournalEntriesBySearchTerm } from './helpers/filterJournalEntriesBySearchTerm'
import { getEntryPeriod } from './helpers/getEntryPeriod'
import { JournalEntryToolbarPresenter } from './presenters/JournalEntryToolbarPresenter'
import { JournalEntryRowPresenter } from './presenters/JournalEntryRowPresenter'
import { JournalBatchActionsContainer } from './containers/JournalBatchActionsContainer'
import { EntriesScroll, ListCard } from './JournalEntryListContainer.styles'
import type { JournalEntryRowPresenterProps } from './presenters/JournalEntryRowPresenter'
import type { EntryPeriodFilter } from './helpers/filterEntriesByPeriod'
import type { JournalEntryViewModel } from '@frequentation/types'

interface JournalEntryListContainerProps {
  selectedDate: string
  onEditEntry: (entry: JournalEntryViewModel) => void
}

const TIME_FORMAT = 'HH:mm'

export function JournalEntryListContainer({
  selectedDate,
  onEditEntry
}: JournalEntryListContainerProps) {
  const { t } = useTranslation('frequentation')
  const { selectedIds, toggle, selectAll, clearSelection } = useJournalEntrySelection()
  const { period, setPeriod } = useEntryPeriodFilter()
  const { searchTerm, setSearchTerm } = useSearchFilter()
  const { data, isLoading } = useJournalEntries({ startDate: selectedDate, endDate: selectedDate })
  const { toast, show, dismiss } = useToast()
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null)
  const { mutate: deleteOne } = useDeleteFrequentation({
    onSuccess: () => {
      show(t('deleteSuccess'))
    }
  })
  const { getLabel } = useActivityLabels()
  const theme = useTheme()

  const dtos = data ?? []
  const entries = dtos.map((dto) => toJournalEntryViewModel(dto, getLabel, theme.palette.activity))
  const filteredByPeriod = filterEntriesByPeriod(entries, period)
  const filtered = filterJournalEntriesBySearchTerm(filteredByPeriod, searchTerm)

  function handleSelectAll() {
    selectAll(entries.map((entry) => entry.id))
  }

  function handleDeleteClick(entry: JournalEntryViewModel) {
    setPendingDeleteId(entry.id)
  }

  function handleConfirmDelete() {
    if (pendingDeleteId !== null) {
      deleteOne({ id: pendingDeleteId })
      setPendingDeleteId(null)
    }
  }

  function closeConfirmDelete() {
    setPendingDeleteId(null)
  }

  function isPeriodFilter(value: string): value is EntryPeriodFilter {
    return value === 'all' || value === 'morning' || value === 'afternoon'
  }

  function handlePeriodChange(value: string) {
    if (isPeriodFilter(value)) {
      setPeriod(value)
    }
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
  }

  function handleRowClick(entry: JournalEntryViewModel, event: MouseEvent) {
    if (event.metaKey || event.ctrlKey) {
      event.preventDefault()
      toggle(entry.id)
      return
    }
    onEditEntry(entry)
  }

  function handleRowEditClick(entry: JournalEntryViewModel, event: MouseEvent) {
    event.stopPropagation()
    onEditEntry(entry)
  }

  function handleRowDeleteClick(entry: JournalEntryViewModel, event: MouseEvent) {
    event.stopPropagation()
    handleDeleteClick(entry)
  }

  function buildRowProps(entry: JournalEntryViewModel): JournalEntryRowPresenterProps {
    const period = getEntryPeriod(entry.startsAt)
    return {
      initials: buildInitials(entry.student.prenom, entry.student.nom),
      avatarColorSeed: entry.student.id,
      displayName: entry.student.displayName,
      classe: entry.student.classe,
      time: dayjs(entry.startsAt).format(TIME_FORMAT),
      periodLabel: period === 'morning' ? t('period.morning') : t('period.afternoon'),
      period,
      activityTone: getActivityTone(entry.activity),
      activityLabel: entry.activityLabel,
      selected: selectedIds.includes(entry.id),
      onRowClick: (event) => handleRowClick(entry, event),
      onEditClick: (event) => handleRowEditClick(entry, event),
      onDeleteClick: (event) => handleRowDeleteClick(entry, event)
    }
  }

  return (
    <ListCard padding="none">
      <JournalEntryToolbarPresenter
        entryCount={filtered.length}
        period={period}
        onPeriodChange={handlePeriodChange}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      <JournalBatchActionsContainer
        selectedIds={selectedIds}
        totalCount={entries.length}
        onSelectAll={handleSelectAll}
        onClearSelection={clearSelection}
        onAfterDelete={clearSelection}
        onAfterUpdate={clearSelection}
      />
      <EntriesScroll>
        {isLoading ? (
          <Loader message={t('loading')} />
        ) : filtered.length === 0 ? (
          <EmptyState
            iconName="event_available"
            message={t('noEntries')}
            description={t('emptyHint')}
          />
        ) : (
          filtered.map((entry) => (
            <JournalEntryRowPresenter key={entry.id} {...buildRowProps(entry)} />
          ))
        )}
      </EntriesScroll>
      <ConfirmDialog
        open={pendingDeleteId !== null}
        title={t('batchActions.confirmDeleteTitle')}
        message={t('row.confirmDelete')}
        destructive
        onConfirm={handleConfirmDelete}
        onClose={closeConfirmDelete}
      />
      <Toast toast={toast} onClose={dismiss} />
    </ListCard>
  )
}
