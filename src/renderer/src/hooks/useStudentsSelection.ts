import { ChangeEvent, useCallback } from 'react'

interface UseStudentsSelectionParams {
  items: { id: number }[]
  selectedIds: number[]
  onSelectionChange: (ids: number[]) => void
}

export const useStudentsSelection = ({
  items,
  selectedIds,
  onSelectionChange
}: UseStudentsSelectionParams): {
  isSelected: (id: number) => boolean
  handleRowClick: (id: number) => void
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>, id: number) => void
  handleSelectAll: () => void
  allSelected: boolean
  partiallySelected: boolean
} => {
  const isSelected = useCallback(
    (id: number) => {
      return selectedIds.includes(id)
    },
    [selectedIds]
  )

  const toggleSelection = useCallback(
    (id: number) => {
      const newSelection = isSelected(id)
        ? selectedIds.filter((selectedId) => selectedId !== id)
        : [...selectedIds, id]
      onSelectionChange(newSelection)
    },
    [selectedIds, isSelected, onSelectionChange]
  )

  const handleRowClick = useCallback(
    (id: number) => {
      toggleSelection(id)
    },
    [toggleSelection]
  )

  const handleCheckboxChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, id: number) => {
      event.stopPropagation()
      toggleSelection(id)
    },
    [toggleSelection]
  )

  const handleSelectAll = useCallback(() => {
    const allSelected = items.length > 0 && selectedIds.length === items.length
    onSelectionChange(allSelected ? [] : items.map((item) => item.id))
  }, [items, selectedIds, onSelectionChange])

  return {
    isSelected,
    handleRowClick,
    handleCheckboxChange,
    handleSelectAll,
    allSelected: items.length > 0 && selectedIds.length === items.length,
    partiallySelected: selectedIds.length > 0 && selectedIds.length < items.length
  }
}
