import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Button } from '@ui/components/Button'
import { ConfirmDialog } from '@ui/components/ConfirmDialog'
import { useJournalBatchActions } from './hooks/useJournalBatchActions'
import { COUNT_FONT_SIZE_PX, COUNT_FONT_WEIGHT, MENU_MIN_WIDTH_PX } from './JournalBatchActions.styles'
import type { ActivityType } from '@types'

interface JournalBatchActionsProps {
  selectedIds: number[]
  totalCount: number
  onSelectAll: () => void
  onClearSelection: () => void
  onAfterDelete: () => void
  onAfterUpdate: () => void
}

export function JournalBatchActions(props: JournalBatchActionsProps) {
  const {
    hasSelection,
    isTotalEmpty,
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
  } = useJournalBatchActions(props)

  function handleActivityClick(value: ActivityType) {
    selectActivity(value)
    closeActivityMenu()
  }

  return (
    <>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1, px: 1 }}>
        <Button variant="secondary" onClick={toggleSelection} disabled={isTotalEmpty}>
          {selectToggleLabel}
        </Button>
        <Box ref={setAnchorEl} sx={{ display: 'inline-block' }}>
          <Button variant="secondary" disabled={!hasSelection} onClick={toggleActivityMenu}>
            {changeActivityLabel}
          </Button>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={activityMenuOpen}
          onClose={closeActivityMenu}
          slotProps={{
            paper: {
              sx: {
                minWidth: `${MENU_MIN_WIDTH_PX}px`,
                bgcolor: 'var(--card)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-lg)'
              }
            }
          }}
        >
          {activityOptions.map((option) => (
            <MenuItem key={option.value} onClick={() => handleActivityClick(option.value)}>
              {option.label}
            </MenuItem>
          ))}
        </Menu>
        <Button variant="danger" disabled={!hasSelection} onClick={openConfirmDelete}>
          {deleteSelectionLabel}
        </Button>
        {hasSelection ? (
          <Box
            component="span"
            sx={{
              fontSize: `${COUNT_FONT_SIZE_PX}px`,
              color: 'var(--text-dim)',
              fontWeight: COUNT_FONT_WEIGHT
            }}
          >
            {selectedCountLabel}
          </Box>
        ) : null}
      </Box>

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
