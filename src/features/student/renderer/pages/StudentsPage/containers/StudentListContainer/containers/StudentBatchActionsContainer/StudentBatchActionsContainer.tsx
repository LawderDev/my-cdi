import Box from '@mui/material/Box'
import { Button } from '@ui/components/Button'
import { ConfirmDialog } from '@ui/components/ConfirmDialog'
import { useStudentBatchActions } from './hooks/useStudentBatchActions'
import { formatBatchMessage } from './helpers/formatBatchMessage'
import {
  NO_SELECTION,
  STRIP_FONT_SIZE_PX,
  COUNT_FONT_WEIGHT
} from './StudentBatchActionsContainer.styles'

interface StudentBatchActionsContainerProps {
  selectedIds: number[]
  selectedCount: number
  totalCount: number
  onSelectAll: () => void
  onClearSelection: () => void
  onAfterDelete: () => void
}

export function StudentBatchActionsContainer({
  selectedIds,
  selectedCount,
  totalCount,
  onSelectAll,
  onClearSelection,
  onAfterDelete
}: StudentBatchActionsContainerProps) {
  const {
    showConfirm,
    isPending,
    hasSelection,
    selectToggleLabel,
    batchDeleteLabel,
    confirmTitle,
    confirmMessage,
    confirmButtonLabel,
    handleSelectToggle,
    handleDeleteClick,
    handleConfirmDelete,
    closeConfirm
  } = useStudentBatchActions({
    selectedIds,
    selectedCount,
    totalCount,
    onSelectAll,
    onClearSelection,
    onAfterDelete
  })

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
          {selectToggleLabel}
        </Button>
        <Button variant="danger" disabled={!hasSelection || isPending} onClick={handleDeleteClick}>
          {batchDeleteLabel}
        </Button>
        {hasSelection ? (
          <Box component="span" sx={{ fontWeight: COUNT_FONT_WEIGHT }}>
            {formatBatchMessage(selectedCount)}
          </Box>
        ) : null}
      </Box>

      <ConfirmDialog
        open={showConfirm}
        title={confirmTitle}
        message={confirmMessage}
        confirmLabel={confirmButtonLabel}
        destructive
        onConfirm={handleConfirmDelete}
        onClose={closeConfirm}
      />
    </>
  )
}
