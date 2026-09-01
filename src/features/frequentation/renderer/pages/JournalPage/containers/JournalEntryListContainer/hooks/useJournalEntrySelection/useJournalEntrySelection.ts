import { useState } from 'react'

export function useJournalEntrySelection() {
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  function toggle(id: number) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]))
  }

  function selectAll(ids: number[]) {
    setSelectedIds(ids)
  }

  function clearSelection() {
    setSelectedIds([])
  }

  function isSelected(id: number) {
    return selectedIds.includes(id)
  }

  const selectedCount = selectedIds.length

  return {
    selectedIds,
    selectedCount,
    toggle,
    selectAll,
    clearSelection,
    isSelected
  } as const
}
