import { useState, useCallback } from 'react'
import type { FrequentationViewModel } from '../types/view.models'

interface UseJournalBatchOperationsParams {
  frequentations: FrequentationViewModel[]
  onDeleteFrequentation: (ids: number[]) => Promise<boolean>
  selectedDate?: Date | null
}

export const useJournalBatchOperations = ({
  frequentations,
  onDeleteFrequentation
}: UseJournalBatchOperationsParams): {
  selectedFrequentations: number[]
  handleSelectionChange: (ids: number[]) => void
  clearSelection: () => void
  handleSelectAll: () => void
  handleDeleteSelected: () => Promise<void>
  allSelected: boolean
} => {
  const [selectedFrequentations, setSelectedFrequentations] = useState<number[]>([])

  const handleSelectionChange = useCallback((ids: number[]) => {
    setSelectedFrequentations(ids)
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedFrequentations([])
  }, [])

  const handleSelectAll = useCallback(() => {
    const allSelected = selectedFrequentations.length === frequentations.length
    setSelectedFrequentations(allSelected ? [] : frequentations.map((f) => f.id))
  }, [frequentations, selectedFrequentations.length])

  const handleDeleteSelected = useCallback(async () => {
    if (selectedFrequentations.length > 0) {
      const result = await onDeleteFrequentation(selectedFrequentations)
      if (result) clearSelection()
    }
  }, [selectedFrequentations, onDeleteFrequentation, clearSelection])

  return {
    selectedFrequentations,
    handleSelectionChange,
    clearSelection,
    handleSelectAll,
    handleDeleteSelected,
    allSelected:
      frequentations.length > 0 && selectedFrequentations.length === frequentations.length
  }
}
