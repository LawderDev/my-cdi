import MenuItem from '@mui/material/MenuItem'
import { Button } from '@ui/components/Button'
import { ConfirmDialog } from '@ui/components/ConfirmDialog'
import { useJournalBatchActions } from './hooks/useJournalBatchActions'
import {
  ActivityMenu,
  BatchActionsRoot,
  CountText,
  MenuAnchor
} from './JournalBatchActionsContainer.styles'
import type { ActivityType } from '@types'

interface JournalBatchActionsContainerProps {
  selectedIds: number[]
  totalCount: number
  onSelectAll: () => void
  onClearSelection: () => void
  onAfterDelete: () => void
  onAfterUpdate: () => void
}

export function JournalBatchActionsContainer(props: JournalBatchActionsContainerProps) {
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
      <BatchActionsRoot>
        <Button variant="secondary" onClick={toggleSelection} disabled={isTotalEmpty}>
          {selectToggleLabel}
        </Button>
        <MenuAnchor ref={setAnchorEl}>
          <Button variant="secondary" disabled={!hasSelection} onClick={toggleActivityMenu}>
            {changeActivityLabel}
          </Button>
        </MenuAnchor>
        <ActivityMenu anchorEl={anchorEl} open={activityMenuOpen} onClose={closeActivityMenu}>
          {activityOptions.map((option) => (
            <MenuItem key={option.value} onClick={() => handleActivityClick(option.value)}>
              {option.label}
            </MenuItem>
          ))}
        </ActivityMenu>
        <Button variant="danger" disabled={!hasSelection} onClick={openConfirmDelete}>
          {deleteSelectionLabel}
        </Button>
        {hasSelection ? <CountText>{selectedCountLabel}</CountText> : null}
      </BatchActionsRoot>

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
