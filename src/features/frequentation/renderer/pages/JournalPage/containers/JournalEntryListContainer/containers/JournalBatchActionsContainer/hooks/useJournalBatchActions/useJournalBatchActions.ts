import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useActivityLabels } from '@frequentation/hooks/useActivityLabels'
import { buildActivityOptions } from '@frequentation/helpers/buildActivityOptions'
import { useBatchDelete } from '../useBatchDelete'
import { useBatchUpdateActivity } from '../useBatchUpdateActivity'
import type { ActivityType } from '@types'

interface UseJournalBatchActionsOptions {
  selectedIds: number[]
  totalCount: number
  onSelectAll: () => void
  onClearSelection: () => void
  onAfterDelete: () => void
  onAfterUpdate: () => void
}

const ZERO_TOTAL = 0

export function useJournalBatchActions(options: UseJournalBatchActionsOptions) {
  const { selectedIds, totalCount, onSelectAll, onClearSelection, onAfterDelete, onAfterUpdate } =
    options
  const { t } = useTranslation('frequentation')
  const { getLabel, allActivities } = useActivityLabels()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [activityMenuOpen, setActivityMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const { mutate: mutateDelete } = useBatchDelete({
    onSuccess: () => {
      setConfirmOpen(false)
      onAfterDelete()
    }
  })

  const { mutate: mutateUpdate } = useBatchUpdateActivity({
    onSuccess: () => {
      setActivityMenuOpen(false)
      onAfterUpdate()
    }
  })

  const selectedCount = selectedIds.length
  const allSelected = selectedCount === totalCount && totalCount > ZERO_TOTAL
  const hasSelection = selectedCount > ZERO_TOTAL
  const activityOptions = buildActivityOptions(allActivities, getLabel)

  const selectToggleLabel = allSelected
    ? t('batchActions.deselectAll')
    : t('batchActions.selectAll')
  const changeActivityLabel = t('batchActions.changeActivity')
  const deleteSelectionLabel = t('batchActions.deleteSelection')
  const selectedCountLabel = t('batchActions.selectedCount', { count: selectedCount })
  const confirmDeleteTitle = t('batchActions.confirmDeleteTitle')
  const confirmDeleteMessage = t('batchActions.confirmDeleteMessage', { count: selectedCount })

  function toggleSelection() {
    if (allSelected) {
      onClearSelection()
      return
    }
    onSelectAll()
  }

  function openConfirmDelete() {
    if (!hasSelection) {
      return
    }
    setConfirmOpen(true)
  }

  function closeConfirmDelete() {
    setConfirmOpen(false)
  }

  function confirmDelete() {
    mutateDelete(selectedIds)
  }

  function toggleActivityMenu() {
    if (!hasSelection) {
      return
    }
    setActivityMenuOpen((prev) => !prev)
  }

  function closeActivityMenu() {
    setActivityMenuOpen(false)
  }

  function selectActivity(activity: ActivityType) {
    if (!hasSelection) {
      return
    }
    mutateUpdate({ ids: selectedIds, activity })
  }

  return {
    selectedCount,
    hasSelection,
    isTotalEmpty: totalCount === ZERO_TOTAL,
    activityOptions,
    confirmOpen,
    activityMenuOpen,
    anchorEl,
    setAnchorEl,
    selectToggleLabel,
    changeActivityLabel,
    deleteSelectionLabel,
    selectedCountLabel,
    confirmDeleteTitle,
    confirmDeleteMessage,
    toggleSelection,
    openConfirmDelete,
    closeConfirmDelete,
    confirmDelete,
    toggleActivityMenu,
    closeActivityMenu,
    selectActivity
  } as const
}
