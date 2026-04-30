import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useJournalEntries } from '@frequentation/api/useFrequentationQueries'
import { useUpdateFrequentation } from '@frequentation/api/useFrequentationMutations'
import { useActivityLabels } from '@frequentation/hooks/useActivityLabels'
import { buildActivityOptions } from '@frequentation/helpers/buildActivityOptions'
import { todayIso } from '../../containers/JournalDateNavigator/helpers/journalDate'
import { getJournalPageTitle } from '../../helpers/getJournalPageTitle'
import type { JournalEntryViewModel } from '@frequentation/types'
import type { ActivityType } from '@types'

const EMPTY_COUNT = 0

export function useJournalPage() {
  const { t } = useTranslation('frequentation')
  const [selectedDate, setSelectedDate] = useState<string>(todayIso)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingEntry, setEditingEntryState] = useState<JournalEntryViewModel | null>(null)

  const { allActivities, getLabel } = useActivityLabels()
  const { data: entries } = useJournalEntries({
    startDate: selectedDate,
    endDate: selectedDate
  })
  const { mutate: updateMutate } = useUpdateFrequentation()

  const entryCount = entries?.length ?? EMPTY_COUNT
  const title = getJournalPageTitle(t('title'), entryCount)
  const activityOptions = buildActivityOptions(allActivities, getLabel)

  function openAddDialog() {
    setIsAddDialogOpen(true)
  }

  function closeAddDialog() {
    setIsAddDialogOpen(false)
  }

  function setEditingEntry(entry: JournalEntryViewModel) {
    setEditingEntryState(entry)
  }

  function closeEditDialog() {
    setEditingEntryState(null)
  }

  function submitEdit(activity: ActivityType) {
    if (!editingEntry) {
      return
    }
    updateMutate(
      { id: editingEntry.id, activity },
      {
        onSuccess: () => {
          setEditingEntryState(null)
        }
      }
    )
  }

  return {
    selectedDate,
    setSelectedDate,
    isAddDialogOpen,
    openAddDialog,
    closeAddDialog,
    editingEntry,
    setEditingEntry,
    closeEditDialog,
    title,
    activityOptions,
    submitEdit
  } as const
}
