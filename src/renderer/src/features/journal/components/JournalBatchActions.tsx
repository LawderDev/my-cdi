import React, { useState } from 'react'
import { Box, Button } from '@mui/material'
import { ConfirmationDialog } from '../../../components/dialogs'
import { actionsContainerStyles } from '../../../lib/styles/JournalPage.styles'

interface JournalBatchActionsProps {
  selectedCount: number
  totalCount: number
  onSelectAll: () => void
  onClearSelection: () => void
  onDeleteSelected: () => void
}

export const JournalBatchActions: React.FC<JournalBatchActionsProps> = ({
  selectedCount,
  totalCount,
  onSelectAll,
  onClearSelection,
  onDeleteSelected
}) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  const handleSelectToggle = (): void => {
    if (selectedCount === totalCount && totalCount > 0) {
      onClearSelection()
    } else {
      onSelectAll()
    }
  }

  const handleDeleteClick = (): void => {
    if (selectedCount > 0) {
      setShowDeleteConfirmation(true)
    }
  }

  const handleConfirmDelete = (): void => {
    onDeleteSelected()
    setShowDeleteConfirmation(false)
  }

  return (
    <>
      <Box sx={actionsContainerStyles}>
        <Button variant="outlined" onClick={handleSelectToggle} disabled={totalCount === 0}>
          {selectedCount === totalCount && totalCount > 0
            ? 'Désélectionner tout'
            : 'Sélectionner tout'}
        </Button>
        <Button
          variant="outlined"
          color="error"
          disabled={selectedCount === 0}
          onClick={handleDeleteClick}
        >
          Supprimer la sélection
        </Button>
      </Box>

      <ConfirmationDialog
        open={showDeleteConfirmation}
        title="Confirmer la suppression"
        message={`Voulez-vous vraiment supprimer ${selectedCount} fréquentation(s) ?`}
        confirmText="Supprimer"
        severity="error"
        onConfirm={handleConfirmDelete}
        onClose={() => setShowDeleteConfirmation(false)}
      />
    </>
  )
}
