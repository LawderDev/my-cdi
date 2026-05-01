import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBatchDelete } from '../useBatchDelete'

interface UseStudentBatchActionsOptions {
  selectedIds: number[]
  selectedCount: number
  totalCount: number
  onSelectAll: () => void
  onClearSelection: () => void
  onAfterDelete: () => void
}

const NO_SELECTION = 0

export function useStudentBatchActions(options: UseStudentBatchActionsOptions) {
  const { selectedIds, selectedCount, totalCount, onSelectAll, onClearSelection, onAfterDelete } =
    options
  const { t: tCommon } = useTranslation('common')
  const { t: tStudent } = useTranslation('student')
  const [showConfirm, setShowConfirm] = useState(false)

  const { mutate: batchDelete, isPending } = useBatchDelete({
    onSuccess: () => {
      onAfterDelete()
      setShowConfirm(false)
    }
  })

  const isAllSelected = selectedCount === totalCount && totalCount > NO_SELECTION
  const hasSelection = selectedCount > NO_SELECTION

  function handleSelectToggle() {
    if (isAllSelected) {
      onClearSelection()
      return
    }
    onSelectAll()
  }

  function handleDeleteClick() {
    if (hasSelection) {
      setShowConfirm(true)
    }
  }

  function handleConfirmDelete() {
    batchDelete(selectedIds)
  }

  function closeConfirm() {
    setShowConfirm(false)
  }

  const selectToggleLabel = isAllSelected ? tCommon('app.deselectAll') : tCommon('app.selectAll')

  return {
    showConfirm,
    isPending,
    isAllSelected,
    hasSelection,
    selectToggleLabel,
    batchDeleteLabel: tCommon('app.batchDelete'),
    confirmTitle: tCommon('app.confirmDelete'),
    confirmMessage: tStudent('deleteConfirm', { count: selectedCount }),
    confirmButtonLabel: tCommon('app.delete'),
    handleSelectToggle,
    handleDeleteClick,
    handleConfirmDelete,
    closeConfirm
  } as const
}
