import { useState } from 'react'
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { useTranslation } from 'react-i18next'
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
const TOOLBAR_GAP = 1
const TOOLBAR_TOP_MARGIN = 1

const toolbarStyles: SxProps<Theme> = {
  display: 'flex',
  gap: TOOLBAR_GAP,
  alignItems: 'center',
  mt: TOOLBAR_TOP_MARGIN
}

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

  const closeConfirm = () => {
    setShowConfirm(false)
  }

  const { mutate: batchDelete, isPending } = useBatchDelete({
    onSuccess: () => {
      onAfterDelete()
      closeConfirm()
    }
  })

  const isAllSelected = selectedCount === totalCount && totalCount > NO_SELECTION

  const handleSelectToggle = () => {
    if (isAllSelected) {
      onClearSelection()
      return
    }
    onSelectAll()
  }

  const handleDeleteClick = () => {
    if (selectedCount > NO_SELECTION) {
      setShowConfirm(true)
    }
  }

  const handleConfirmDelete = () => {
    batchDelete(selectedIds)
  }

  return (
    <>
      <Box sx={toolbarStyles}>
        <Button
          variant="outlined"
          onClick={handleSelectToggle}
          disabled={totalCount === NO_SELECTION}
        >
          {isAllSelected ? tCommon('app.deselectAll') : tCommon('app.selectAll')}
        </Button>
        <Button
          variant="outlined"
          color="error"
          disabled={selectedCount === NO_SELECTION}
          onClick={handleDeleteClick}
        >
          {tCommon('app.batchDelete')}
        </Button>
        {selectedCount > NO_SELECTION && <span>{formatBatchMessage(selectedCount)}</span>}
      </Box>

      <Dialog open={showConfirm} onClose={closeConfirm}>
        <DialogTitle>{tCommon('app.confirmDelete')}</DialogTitle>
        <DialogContent>{tStudent('deleteConfirm', { count: selectedCount })}</DialogContent>
        <DialogActions>
          <Button onClick={closeConfirm} disabled={isPending}>
            {tCommon('app.cancel')}
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
            disabled={isPending}
          >
            {tCommon('app.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
