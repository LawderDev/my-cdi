import { ChangeEvent, MouseEvent } from 'react'

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

  const isSelected = (id: number): boolean => selectedFrequentations.includes(id)

  const toggleSelection = (id: number): void => {
    if (isSelected(id)) {
      onSelectedFrequentationsChange(
        selectedFrequentations.filter((selectedId) => selectedId !== id)
      )
      return
    }

    onSelectedFrequentationsChange([...selectedFrequentations, id])
  }

  const handleRowClick = (id: number): void => {
    toggleSelection(id)
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, id: number): void => {
    event.stopPropagation()
    toggleSelection(id)
  }

  const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>, id: number): void => {
    event.stopPropagation()
    onDeleteFrequentation([id])
  }

  return {
    isSelected,
    handleRowClick,
    handleCheckboxChange,
    handleDeleteClick
  }
}
