import { Box, Button, Menu, MenuItem } from '@mui/material'
import { ConfirmDialog } from '@ui/components/ConfirmDialog'
import { useJournalBatchActions } from './hooks/useJournalBatchActions'

interface JournalBatchActionsProps {
  selectedIds: number[]
  totalCount: number
  onSelectAll: () => void
  onClearSelection: () => void
  onAfterDelete: () => void
  onAfterUpdate: () => void
}

const ROW_GAP = 1
const ROW_TOP_MARGIN = 1

export function JournalBatchActions(props: JournalBatchActionsProps) {
  const {
    hasSelection,
    isTotalEmpty,
    activityOptions,
    confirmOpen,
    activityMenuAnchor,
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
    openActivityMenu,
    closeActivityMenu,
    selectActivity
  } = useJournalBatchActions(props)

  return (
    <>
      <Box sx={{ display: 'flex', gap: ROW_GAP, alignItems: 'center', mt: ROW_TOP_MARGIN }}>
        <Button variant="outlined" onClick={toggleSelection} disabled={isTotalEmpty}>
          {selectToggleLabel}
        </Button>
        <Button
          variant="outlined"
          disabled={!hasSelection}
          onClick={(event) => openActivityMenu(event.currentTarget)}
        >
          {changeActivityLabel}
        </Button>
        <Button
          variant="outlined"
          color="error"
          disabled={!hasSelection}
          onClick={openConfirmDelete}
        >
          {deleteSelectionLabel}
        </Button>
        {hasSelection && <span>{selectedCountLabel}</span>}
      </Box>

      <Menu
        anchorEl={activityMenuAnchor}
        open={activityMenuAnchor !== null}
        onClose={closeActivityMenu}
      >
        {activityOptions.map((option) => (
          <MenuItem key={option.value} onClick={() => selectActivity(option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>

      <ConfirmDialog
        open={confirmOpen}
        title={confirmDeleteTitle}
        message={confirmDeleteMessage}
        destructive
        onConfirm={confirmDelete}
        onClose={closeConfirmDelete}
      />
    </>
  )
}
