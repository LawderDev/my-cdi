import { ChangeEvent, MouseEvent, useCallback } from 'react'

interface UseStudentsTableParams {
  selectedFrequentations: number[]
  onSelectedFrequentationsChange: (ids: number[]) => void
  onDeleteFrequentation: (ids: number[]) => void
}

interface UseStudentsTableResult {
  isSelected: (id: number) => boolean
  handleRowClick: (id: number) => void
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>, id: number) => void
  handleDeleteClick: (event: MouseEvent<HTMLButtonElement>, id: number) => void
}

export const useStudentsTable = ({
  selectedFrequentations,
  onSelectedFrequentationsChange,
  onDeleteFrequentation
}: UseStudentsTableParams): UseStudentsTableResult => {
  const isSelected = useCallback(
    (id: number): boolean => selectedFrequentations.includes(id),
    [selectedFrequentations]
  )

  const toggleSelection = useCallback(
    (id: number): void => {
      if (isSelected(id)) {
        onSelectedFrequentationsChange(
          selectedFrequentations.filter((selectedId) => selectedId !== id)
        )
        return
      }

      onSelectedFrequentationsChange([...selectedFrequentations, id])
    },
    [isSelected, onSelectedFrequentationsChange, selectedFrequentations]
  )

  const handleRowClick = useCallback(
    (id: number): void => {
      toggleSelection(id)
    },
    [toggleSelection]
  )

  const handleCheckboxChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, id: number): void => {
      event.stopPropagation()
      toggleSelection(id)
    },
    [toggleSelection]
  )

  const handleDeleteClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>, id: number): void => {
      event.stopPropagation()
      onDeleteFrequentation([id])
    },
    [onDeleteFrequentation]
  )

  return {
    isSelected,
    handleRowClick,
    handleCheckboxChange,
    handleDeleteClick
  }
}
