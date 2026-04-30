import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
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
const STRIP_FONT_SIZE_PX = 12
const COUNT_FONT_WEIGHT = 500

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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 1.5,
          py: 1,
          bgcolor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          fontSize: `${STRIP_FONT_SIZE_PX}px`,
          color: 'var(--text-dim)'
        }}
      >
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
          <Box component="span" sx={{ fontWeight: COUNT_FONT_WEIGHT }}>
            {formatBatchMessage(selectedCount)}
          </Box>
        ) : null}
      </Box>

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
