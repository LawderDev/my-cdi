import { useEffect, useRef } from 'react'
import { Button } from '@ui/components/Button'
import { ConfirmDialog } from '@ui/components/ConfirmDialog'
import { useJournalBatchActions } from './hooks/useJournalBatchActions'
import type { ActivityType } from '@types'

interface JournalBatchActionsProps {
  selectedIds: number[]
  totalCount: number
  onSelectAll: () => void
  onClearSelection: () => void
  onAfterDelete: () => void
  onAfterUpdate: () => void
}

const ROW_CLASSES = 'flex gap-2 items-center mt-2 px-2'
const COUNT_CLASSES = 'text-xs text-text-dim font-medium'
const MENU_WRAPPER_CLASSES = 'relative'
const MENU_DROPDOWN_CLASSES =
  'absolute top-full left-0 mt-1 min-w-[180px] bg-card border border-border rounded-sm shadow-[var(--shadow-lg)] z-30 py-1'
const MENU_ITEM_CLASSES =
  'block w-full text-left px-3 py-2 text-[13px] text-text hover:bg-surface transition-colors duration-150'

export function JournalBatchActions(props: JournalBatchActionsProps) {
  const {
    hasSelection,
    isTotalEmpty,
    activityOptions,
    confirmOpen,
    activityMenuOpen,
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

  const menuWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!activityMenuOpen) {
      return
    }
    function handlePointerDown(event: MouseEvent) {
      const target = event.target
      if (!(target instanceof Node)) {
        return
      }
      if (menuWrapperRef.current && !menuWrapperRef.current.contains(target)) {
        closeActivityMenu()
      }
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [activityMenuOpen, closeActivityMenu])

  function handleActivityClick(value: ActivityType) {
    selectActivity(value)
    closeActivityMenu()
  }

  return (
    <>
      <div className={ROW_CLASSES}>
        <Button variant="secondary" onClick={toggleSelection} disabled={isTotalEmpty}>
          {selectToggleLabel}
        </Button>
        <div className={MENU_WRAPPER_CLASSES} ref={menuWrapperRef}>
          <Button variant="secondary" disabled={!hasSelection} onClick={toggleActivityMenu}>
            {changeActivityLabel}
          </Button>
          {activityMenuOpen ? (
            <div className={MENU_DROPDOWN_CLASSES} role="menu">
              {activityOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="menuitem"
                  className={MENU_ITEM_CLASSES}
                  onClick={() => handleActivityClick(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <Button variant="danger" disabled={!hasSelection} onClick={openConfirmDelete}>
          {deleteSelectionLabel}
        </Button>
        {hasSelection ? <span className={COUNT_CLASSES}>{selectedCountLabel}</span> : null}
      </div>

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
