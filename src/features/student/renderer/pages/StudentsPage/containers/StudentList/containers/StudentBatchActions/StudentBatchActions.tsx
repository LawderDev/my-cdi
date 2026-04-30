import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@ui/components/Button'
import { ConfirmDialog } from '@ui/components/ConfirmDialog'
import { useBatchDelete } from './hooks/useBatchDelete'
import { formatBatchMessage } from './helpers/formatBatchMessage'

interface StudentBatchActionsProps {
  selectedIds: number[]
  selectedCount: number
  totalCount: number
  onSelectAll: () => void
  onClearSelection: () => void
  onAfterDelete: () => void
}

const NO_SELECTION = 0

const STRIP_CLASSES =
  'flex items-center gap-3 px-3 py-2 bg-surface border border-border rounded-sm text-xs text-text-dim'
const COUNT_CLASSES = 'font-medium'

export function StudentBatchActions({
  selectedIds,
  selectedCount,
  totalCount,
  onSelectAll,
  onClearSelection,
  onAfterDelete
}: StudentBatchActionsProps) {
  const { t: tCommon } = useTranslation('common')
  const { t: tStudent } = useTranslation('student')
  const [showConfirm, setShowConfirm] = useState(false)

  function closeConfirm() {
    setShowConfirm(false)
  }

  const { mutate: batchDelete, isPending } = useBatchDelete({
    onSuccess: () => {
      onAfterDelete()
      closeConfirm()
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

  return (
    <>
      <div className={STRIP_CLASSES}>
        <Button
          variant="secondary"
          onClick={handleSelectToggle}
          disabled={totalCount === NO_SELECTION || isPending}
        >
          {isAllSelected ? tCommon('app.deselectAll') : tCommon('app.selectAll')}
        </Button>
        <Button variant="danger" disabled={!hasSelection || isPending} onClick={handleDeleteClick}>
          {tCommon('app.batchDelete')}
        </Button>
        {hasSelection ? (
          <span className={COUNT_CLASSES}>{formatBatchMessage(selectedCount)}</span>
        ) : null}
      </div>

      <ConfirmDialog
        open={showConfirm}
        title={tCommon('app.confirmDelete')}
        message={tStudent('deleteConfirm', { count: selectedCount })}
        confirmLabel={tCommon('app.delete')}
        destructive
        onConfirm={handleConfirmDelete}
        onClose={closeConfirm}
      />
    </>
  )
}
