import { useState } from 'react'
import dayjs from 'dayjs'
import { useUpdateFrequentation } from '@frequentation/api/useFrequentationMutations'
import { useActivityLabels } from '@frequentation/hooks/useActivityLabels'
import { buildActivityOptions } from '@frequentation/helpers/buildActivityOptions'
import type { JournalEntryViewModel } from '@frequentation/types'
import type { ActivityType } from '@types'

const ISO_DATE_FORMAT = 'YYYY-MM-DD'

function todayIso(): string {
  return dayjs().format(ISO_DATE_FORMAT)
}

export function useJournalPage() {
  const [selectedDate, setSelectedDate] = useState<string>(todayIso)
  const [editingEntry, setEditingEntryState] = useState<JournalEntryViewModel | null>(null)
  const [editingActivity, setEditingActivity] = useState<ActivityType | null>(null)

  const { allActivities, getLabel } = useActivityLabels()
  const { mutate: updateMutate } = useUpdateFrequentation()
  const activityOptions = buildActivityOptions(allActivities, getLabel)

  function startEditing(entry: JournalEntryViewModel) {
    setEditingEntryState(entry)
    setEditingActivity(entry.activity)
  }

  function closeEditDialog() {
    setEditingEntryState(null)
    setEditingActivity(null)
  }

  function submitEdit() {
    if (!editingEntry || !editingActivity) {
      return
    }
    updateMutate({ id: editingEntry.id, activity: editingActivity }, { onSuccess: closeEditDialog })
  }

  return {
    selectedDate,
    setSelectedDate,
    editingEntry,
    editingActivity,
    setEditingActivity,
    startEditing,
    closeEditDialog,
    activityOptions,
    submitEdit
  } as const
}
