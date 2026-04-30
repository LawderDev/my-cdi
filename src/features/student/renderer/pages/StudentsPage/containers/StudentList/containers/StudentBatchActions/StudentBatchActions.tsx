import { useState } from 'react'
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { useBatchDelete } from './hooks/useBatchDelete'
import { formatBatchMessage } from './helpers/formatBatchMessage'

interface StudentBatchActionsProps {
  selectedIds: number[]
  selectedCount: number
  totalCount: number
  onSelectAll: () => void
  onClearSelection: () => void
  onDeleteSelected: () => void
}

const CONFIRM_TITLE = 'Confirmer la suppression'
const SELECT_ALL_LABEL = 'Tout sélectionner'
const DESELECT_ALL_LABEL = 'Tout désélectionner'
const DELETE_SELECTION_LABEL = 'Supprimer la sélection'
const CANCEL_LABEL = 'Annuler'
const CONFIRM_DELETE_LABEL = 'Supprimer'
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
  onDeleteSelected
}: StudentBatchActionsProps) {
  const [showConfirm, setShowConfirm] = useState(false)

  const closeConfirm = () => {
    setShowConfirm(false)
  }

  const deleteMutation = useBatchDelete({
    onSuccess: () => {
      onDeleteSelected()
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
    deleteMutation.mutate(selectedIds)
  }

  const confirmMessage = `Voulez-vous vraiment supprimer ${selectedCount} élève(s) ?`

  return (
    <>
      <Box sx={toolbarStyles}>
        <Button
          variant="outlined"
          onClick={handleSelectToggle}
          disabled={totalCount === NO_SELECTION}
        >
          {isAllSelected ? DESELECT_ALL_LABEL : SELECT_ALL_LABEL}
        </Button>
        <Button
          variant="outlined"
          color="error"
          disabled={selectedCount === NO_SELECTION}
          onClick={handleDeleteClick}
        >
          {DELETE_SELECTION_LABEL}
        </Button>
        {selectedCount > NO_SELECTION && <span>{formatBatchMessage(selectedCount)}</span>}
      </Box>

      <Dialog open={showConfirm} onClose={closeConfirm}>
        <DialogTitle>{CONFIRM_TITLE}</DialogTitle>
        <DialogContent>{confirmMessage}</DialogContent>
        <DialogActions>
          <Button onClick={closeConfirm} disabled={deleteMutation.isPending}>
            {CANCEL_LABEL}
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
            disabled={deleteMutation.isPending}
          >
            {CONFIRM_DELETE_LABEL}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
